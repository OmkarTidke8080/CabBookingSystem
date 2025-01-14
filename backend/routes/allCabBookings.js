import express from "express";
import Logger from "../connect/logg.js";
import ALLBOOKING from "../models/allBooking.js";

const AllCabBooking = express.Router();

// get-all-cab route fetches all the cab bookings till the latest time for the admin
AllCabBooking.get("/get-all-cab", async (req, res) => {
  try {
    // Fetching all the fields in the schema for display
    const bookings = await ALLBOOKING.find().exec();
    // Logger.Logger.success("All bookings fetched successfully");
    res.status(200).send(bookings);
  } catch (error) {
    Logger.error(error.message);
    res.status(404).json({ message: error.message });
  }
});

export default AllCabBooking;
