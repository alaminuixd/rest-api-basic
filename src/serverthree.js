import express from "express";
import dotenv from "dotenv";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const playersDataPath = path.resolve("src", "demo", "data.json");

app.use(express.json());

app.post("/", async (req, res) => {
  const player = await {
    ...req.body,
    id: uuidv4(),
  };
  try {
    const data = await fs.readFile(playersDataPath, "utf-8");
    const players = JSON.parse(data);
    players.push(player);
    fs.writeFile(playersDataPath, JSON.stringify(players, null, 2));
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
});

app.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(playersDataPath, "utf-8");
    const players = JSON.parse(data);
    res.status(200).json(players);
  } catch (error) {
    console.log("Internal server error");
    res.status(400);
  }
});

app.listen(PORT, () => {
  console.log(`Listening to the PORT ${PORT}`);
});
