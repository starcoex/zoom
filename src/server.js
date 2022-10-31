import express from "express";

const app = express();
const PORT = 4100;

app.listen(PORT, () => {
  console.log(`Start Zoom http://localhost:${PORT}`);
});
