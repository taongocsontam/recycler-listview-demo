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
  console.log("token :  ", JSON.stringify(token));
  res.json({ token });
});

/**
 * When call localhost with port 3000 show index.html.
 */
app.get("/", function (request, response) {
  request.sendFile(__dirname + "index.html");
});

/**
 * Connect socket io with client.
 */
io.on("connection", function (socket) {
  socket.on("chat_messenger", function (msg) {
    console.log("msg:  ", JSON.stringify(msg));
    io.emit("chat_messenger", msg);
  });
});
/**
 * Run port server.
 */
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
