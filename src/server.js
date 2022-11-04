import http from "http";
import SocketIO from "socket.io";
import express from "express";

const app = express();
const PORT = 4100;
app.set("view engine", "pug");
app.use("/public", express.static(process.cwd() + "/src/public"));
app.set("views", process.cwd() + "/src/views");

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const server = http.createServer(app);
const io = SocketIO(server);
io.on("connection", (socket) => {
  socket.on("enter_room", (msg, callback) => {
    console.log(msg);
    callback("Got Server To Client");
  });
});

// const sockets = [];
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });
// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickName"] = "Anon";
//   console.log(sockets);
//   console.log("Connected to Brower");
//   socket.on("close", () => console.log("Disconnected to Client"));
//   socket.on("message", (message) => {
//     const parsed = JSON.parse(message);
//     switch (parsed.type) {
//       case "New_Message":
//         sockets.forEach((aSocket) => {
//           aSocket.send(`${socket.nickName}: ${parsed.payload.toString()}`);
//         });
//       case "nickName":
//         socket["nickName"] = parsed.payload.toString();
//         break;
//     }
//   });
// });

server.listen(PORT, (req, res) =>
  console.log(`Zoom WebSocket Sever Start http://localhost:${PORT} `)
);
