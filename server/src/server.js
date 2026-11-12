
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to ReBri API!",
    status: "Server is running",
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "ReBri backend is healthy",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`ReBri server running at http://localhost:${PORT}`);
});
