import express from "express";
import CABS from "../models/Cabs.js";

const getCabs = express.Router();

// Controller to get all cabs
getCabs.get("/getAllCabs", async (req, res) => {
  try {
    const allCabs = await CABS.find(); // Fetch all cabs from the database
    res.status(200).json(allCabs);
  } catch (error) {
    console.error("Error fetching cabs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default getCabs;
