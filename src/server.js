import http from "http";
import express from "express";
import WebSocket from "ws";

const app = express();
const PORT = 4100;
app.set("view engine", "pug");
app.use("/public", express.static(process.cwd() + "/src/public"));
app.set("views", process.cwd() + "/src/views");

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const sockets = [];
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickName"] = "Anon";
  console.log(sockets);
  console.log("Connected to Brower");
  socket.on("close", () => console.log("Disconnected to Client"));
  socket.on("message", (message) => {
    const parsed = JSON.parse(message);
    switch (parsed.type) {
      case "New_Message":
        sockets.forEach((aSocket) => {
          aSocket.send(`${socket.nickName}: ${parsed.payload.toString()}`);
        });
      case "nickName":
        socket["nickName"] = parsed.payload.toString();
        break;
    }

    // if (parsed.type === "New_Message") {
    //   sockets.forEach((aSocket) => {
    //     aSocket.send(`${socket.nickName}: ${parsed.payload.toString()}`);
    //   });
    // } else if (parsed.type === "nickName") {
    //   socket["nickName"] = parsed.payload.toString();
    // }
  });
  // socket.on("message", (message) => socket.send(message.toString()));
});

server.listen(PORT, (req, res) =>
  console.log(`Zoom WebSocket Sever Start http://localhost:${PORT} `)
);
