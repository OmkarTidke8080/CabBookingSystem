import express from "express";
import TEST from "../models/Test.js";
import  Logger  from "../connect/logg.js";
import { spawn } from "child_process";

const landingTest = express.Router();

// Testing route for the backend check
landingTest.get("/landingTest", async (req, res) => {
  res.send("API running successfully!!");
});

export default landingTest;
