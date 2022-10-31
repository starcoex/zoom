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

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on("connection", (socket) => {
  console.log("Connected to Brower");
  socket.on("close", () => console.log("Disconnected to Client"));
  socket.on("message", (message) =>
    console.log("Brower to ", message.toString())
  );
  socket.send("Hello Server to Client");
});

server.listen(PORT, (req, res) =>
  console.log(`Zoom WebSocket Sever Start http://localhost:${PORT} `)
);
