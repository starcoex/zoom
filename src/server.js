import http from "http";
import SocketIO from "socket.io";
import express from "express";
import { copyFileSync } from "fs";

const app = express();
const PORT = 4100;
app.set("view engine", "pug");
app.use("/public", express.static(process.cwd() + "/src/public"));
app.set("views", process.cwd() + "/src/views");

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const server = http.createServer(app);
const io = SocketIO(server);
function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = io;
  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}
function countRoom(roomName) {
  return io.sockets.adapter.rooms.get(roomName)?.size;
}
io.on("connection", (socket) => {
  socket["nickname"] = "Anonymous";
  socket.onAny((event) => {
    // console.log(io.sockets.adapter);
    console.log(event);
  });
  socket.on("enter_room", (roomName, nickName, callback) => {
    socket["nickname"] = nickName;
    // console.log(socket.rooms);
    socket.join(roomName);
    // console.log(socket.rooms);
    socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
    callback();
  });
  io.sockets.emit("room_change", publicRooms());
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) =>
      socket.to(room).emit("bye", socket.nicknamem, countRoom(room) - 1)
    );

    // for (const room of socket.rooms) {
    //   if (room !== socket.id) {
    //     socket.to(room).emit("bye", socket.nickanme);
    //   } else {
    //     socket.to(room).emit("bye2");
    //   }
    // }
  });
  socket.on("disconnect", () => {
    io.sockets.emit("room_change", publicRooms());
  });
  socket.on("new_message", (msg, room, callback) => {
    socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
    callback();
  });
  socket.on("nick_name", (nickname) => {
    socket["nickname"] = nickname;
    console.log(socket["nickname"]);
  });
});

server.listen(PORT, (req, res) =>
  console.log(`Zoom WebSocket Sever Start http://localhost:${PORT} `)
);
