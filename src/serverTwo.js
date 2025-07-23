import express from "express";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.post("/", async (req, res) => {
  const player = {
    ...req.body,
    id: uuidv4(),
  };
});

app.listen(PORT, () => console.log(`Listening to the port ${PORT}`));
