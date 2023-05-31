const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const request = require("request");

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = require("http").Server(app);
const io = require("socket.io")(server);

const chatRooms = [
  {
    id: "7dyf3s55",
    messengers: [],
    room_name: "Chat 2",
  },
  {
    id: "7dyf3s60",
    messengers: [],
    room_name: "Chat 1",
  },
]; // Danh sách các phòng chat.
const generateID = () => Math.random().toString(36).substring(2, 10);

/**
 * Return token for app client call video-sdk.
 */
app.get("/get-token", (req, res) => {
  const API_KEY = "67152312-15db-4275-98e0-cfaa7c1bded4";
  const SECRET_KEY =
    "af2d9fbd5878f7da78ff7cea9e49d1917f5dd35931fc9b13838cfbb5b1b2e37f";
  const options = { expiresIn: "120m", algorithm: "HS256" };
  const payload = {
    apikey: API_KEY,
    permissions: ["allow_join", "allow_mod", "ask_join"],
    version: 2,
    roles: ["CRAWLER"],
  };
  const token = jwt.sign(payload, SECRET_KEY, options);
  res.json({ token });
});

/**
 * Web when call localhost with port 3000 show index.html.
 */
app.get("/", function (request, response) {
  request.sendFile(__dirname + "index.html");
});

/**
 * Connect socket io with client.
 */
io.on("connection", function (socket) {
  console.log(`${socket.id} user just connected!`);

  // Create room chat.
  socket.on("createRoom", (nameRoom) => {
    socket.join(nameRoom);
    chatRooms.unshift({
      id: generateID(),
      messengers: [],
      room_name: nameRoom,
    });
    socket.emit("roomLists", chatRooms);
  });

  // Client find room chat.
  socket.on("findRoom", (roomId) => {
    let result = chatRooms.filter((item, index) => roomId === item.id);
    socket.emit("foundRoom", result[0].messengers);
  });

  // Client delete room chat.
  socket.on("delete_room_chat", (roomId) => {
    removeObjectWithId(chatRooms, roomId);
    socket.emit("roomLists", chatRooms);
  });

  // Chat new messenger.
  socket.on("newMesssenger", (data) => {
    const { roomId, messenga, user, timestamp } = data;
    // Find room messenger
    let resultRoom = chatRooms.filter((item, index) => item.id == roomId);
    const newMessenga = {
      id: generateID(),
      text: messenga,
      user,
      time: `${timestamp.hour}:${timestamp.mins}`,
    };
    // Send messenger private.
    resultRoom[0].messengers.unshift(newMessenga);
    io.sockets.emit("foundRoom", resultRoom[0].messengers);
    // io.of(roomId).emit("foundRoom", resultRoom[0].messengers);

    //Socket disconnected
    socket.on("disconnect", () => {
      socket.disconnect();
    });
  });

  socket.on("typing", (data) => {
    io.sockets.emit("userState", {
      user: data.user,
      typing: data.typing,
      roomId: data.roomId,
    });
  });
});

/**
 * Api client get all room chat.
 */
app.get("/room_chat", (req, res) => {
  res.json(chatRooms);
});

/**
 * Api client delete room chat. cooming soon
 */
app.post("/delete_room_chat", (req, res) => {
  removeObjectWithId(chatRooms, req.body.id);
  console.log("chatRooms:  ", chatRooms);
  res.json(chatRooms);
});

function removeObjectWithId(arr, id) {
  const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
  if (objWithIdIndex > -1) {
    arr.splice(objWithIdIndex, 1);
  }
  return arr;
}

/**
 * Run port server.
 */
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
