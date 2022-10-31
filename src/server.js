import express from "express";

const app = express();
const PORT = 4100;
app.set("view engine", "pug");
app.use("/public", express.static(process.cwd() + "/src/public"));
app.set("views", process.cwd() + "/src/views");

app.get("/", (req, res) => res.render("home"));

app.listen(PORT, () => {
  console.log(`Start Zoom http://localhost:${PORT}`);
});
