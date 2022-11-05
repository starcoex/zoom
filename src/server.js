import http from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
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
const io = new Server(server, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});
instrument(io, {
  auth: false,
});

server.listen(PORT, (req, res) =>
  console.log(`Zoom WebSocket Sever Start http://localhost:${PORT} `)
);
