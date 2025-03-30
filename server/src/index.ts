import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { InstrumentsData } from "./models/InstrumentsData";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/flightInstrumentsMonitor")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// POST /data → Insert a new flight instruments record
app.post("/data", async (req, res) => {
  try {
    const { altitude, hsi, adi } = req.body;

    const entry = new InstrumentsData({ altitude, hsi, adi });
    await entry.save();

    res.status(201).json({ message: "Data saved successfully!" });
  } catch (error: any) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
});

// Optional: GET /data → Retrieve all flight data
app.get("/data", async (req, res) => {
  try {
    const allData = await InstrumentsData.find().sort({ createdAt: -1 });
    res.json(allData);
  } catch (error: any) {
    res.status(500).json({ message: "Error retrieving data", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
