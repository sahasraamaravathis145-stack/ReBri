import express from "express";

import {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  updateListingAvailability,
} from "../controllers/listingController.js";

const router = express.Router();

// Create a new listing
router.post("/", createListing);

// Get all listings
router.get("/", getAllListings);

// Get a listing by ID
router.get("/:id", getListingById);

// Update a listing
router.patch("/:id", updateListing);

// Update listing availability
router.patch("/:id/availability", updateListingAvailability);

export default router;