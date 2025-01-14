import express from "express";
import  Logger  from "../connect/logg.js";
import CABS from "../models/Cabs.js";

const cabGetter = express.Router();

// fetch-cab route fetches all the cab details from the schema
// Total of 5 cabs are there for the users to choose from
cabGetter.get("/fetch-cab", async (req, res) => {
  try {
    // Fetches all the cabs and displays them with price/min according to the journey in the front-end
    const cabs = await CABS.find().exec();
    res.status(200).send(cabs);
  } catch (error) {
    Logger.error(error.message);
    res.status(404).json({ message: error.message });
  }
});

export default cabGetter;
