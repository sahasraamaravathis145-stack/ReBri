
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import healthRoutes from "./routes/healthRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api", healthRoutes);
app.use("/api/listings", listingRoutes);
// Server port
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`ReBri server running on http://localhost:${PORT}`);
});
