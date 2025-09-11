import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
// using "/promise" we can work with "async"
import fs from "fs/promises";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const playersDB = path.resolve("src", "data.json");

app.use(express.json());
// DELETE to remove an entry
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fs.readFile(playersDB, "utf-8");
    const players = JSON.parse(data);
    const updatedPlayers = players.filter((player) => player.id !== id);

    if (players.length === updatedPlayers.length) {
      return res.status(404).json({ message: "Player not found" });
    }

    await fs.writeFile(playersDB, JSON.stringify(updatedPlayers, null, 2));
    res.status(200).json({ message: "Player deleted successfully" });
    // res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the player" });
  }
});

// PUT to update whole doc
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, country, rank } = req.body;
  // Simple validation
  if (!name || !country || rank === undefined) {
    return res
      .status(400)
      .json({ error: "name, country, and rank are required." });
  }
  try {
    const data = await fs.readFile(playersDB, "utf-8");
    const players = JSON.parse(data);
    const index = players.findIndex((p) => p.id === id);

    if (index !== -1) {
      // Replace the entire player object
      players[index] = { id, name, country, rank };
      await fs.writeFile(playersDB, JSON.stringify(players, null, 2));
      res.status(200).json(players[index]);
    } else {
      res.status(404).json({ message: "Player not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update the player" });
  }
});
// PATCH to update the doc partially.
app.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, country, rank } = req.body;
  try {
    const data = await fs.readFile(playersDB, "utf-8");
    const players = JSON.parse(data);
    const player = players.find((p) => p.id === id);
    if (player) {
      player.name = name || player.name;
      player.country = country || player.country;
      player.rank = rank || player.rank;
      await fs.writeFile(playersDB, JSON.stringify(players, null, 2));
      res.status(200).json(player);
    } else {
      res.status(404).json({ message: "Player not found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update the player" });
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fs.readFile(playersDB, "utf-8");
    const players = JSON.parse(data);
    const player = players.find((p) => p.id === id);
    if (player) {
      res.status(200).json(player);
    } else {
      res.status(404).json({ message: "Player not found!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the player." });
  }
});

app.post("/", async (req, res) => {
  const player = {
    ...req.body,
    id: uuid(),
  };

  try {
    const data = await fs.readFile(playersDB, "utf-8");
    const players = JSON.parse(data);

    players.push(player); // ✅ Add new player

    await fs.writeFile(
      playersDB,
      JSON.stringify(players, null, 2) // Pretty print
    );

    res.status(201).json(player); // ✅ Respond with new player
  } catch (err) {
    res.status(500).json({ error: "Failed to save player" });
  }
});
app.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(playersDB, "utf-8");
    const players = JSON.parse(data);
    res.status(200).json(players);
  } catch (error) {
    res.status(400).json({ error: "Request failed!" });
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Listening to the port ${PORT}`);
});
