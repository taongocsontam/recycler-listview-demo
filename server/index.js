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

const chatRooms = []; // Danh sách các phòng chat.
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
    console.log('resultRoom[0]:  ', resultRoom);
    socket.to(resultRoom[0].name).emit("roomMessage", newMessenga);
    resultRoom[0].messengers.push(newMessenga);

    socket.emit("roomLists", chatRooms);
    socket.emit("foundRoom", resultRoom[0].messengers);

    //Socket disconnected
    socket.on("disconnect", () => {
      socket.disconnect();
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
 * Run port server.
 */
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
