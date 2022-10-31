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

// app.listen(PORT, () => {
//   console.log(`Start Zoom http://localhost:${PORT}`);
// });

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
server.listen(PORT, (req, res) =>
  console.log(`Zoom WebSocket Sever Start http://localhost:${PORT} `)
);
