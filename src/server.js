import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.post("/", (req, res) => {
  const player = {
    ...req.body,
    id: uuid(),
  };
  res.status(201).json(player);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Listening to the port ${PORT}`);
});
