import express from "express";
import Logger  from "../connect/logg.js";
import { spawn } from "child_process"; // Using child_process to call a separate file during execution

const pathGetter = express.Router();

// fetch-shortest-path calls the ShortestPath.py file, which includes the Dijkstra algorithm for the shortest path
// The ShortestPath.py takes 2 arguments: source and destination, calculates the shortest path, and returns the desired result
pathGetter.post("/fetch-shortest-path", async (req, res) => {
  const { start, dest } = req.body;
  let data1;

  // Check is created to fetch the shortest path for the specific source and destination
  const check = spawn("python", ["ShortestPath.py", start, dest]);

  check.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  check.stdout.on("data", (data) => {
    console.log((data1 = data));
  });

  // Input is then read and sent to the front-end for display
  check.on("close", (code) => {
    res.send(data1);
  });
});

export default pathGetter;
