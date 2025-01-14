import CABS from "../models/Cabs.js";
import express from "express";
const addCab = express.Router();
// Controller to add a cab
addCab.post("/addCab", async (req, res) => {
  try {
    const { cab_name, cab_price, cab_type, cab_seats } = req.body;

    // Validate input data
    if (!cab_name || !cab_price || !cab_type || !cab_seats) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new cab object
    const newCab = new CABS({
      cab_name,
      cab_price,
      cab_type,
      cab_seats,
    });

    // Save the cab to the database
    const savedCab = await newCab.save();

    // Respond with success
    res.status(201).json({ message: "Cab added successfully", data: savedCab });
  } catch (error) {
    console.error("Error adding cab:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default addCab;
