import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db_elements from "./connect/getENV.js";
import landingTest from "./routes/landingTest.js";
import pathGetter from "./routes/pathGetter.js";
import logger_all from "./connect/logg.js";
import cabGetter from "./routes/cabGetter.js";
import userBooking from "./routes/userBooking.js";
import allCabBooking from "./routes/allCabBookings.js";
import addCab from "./routes/addCabs.js";
import getCabs from "./routes/fetchCabs.js";
import userRoutes from "./routes/userRoutes.js"

// Enable strictQuery mode for Mongoose
mongoose.set("strictQuery", true);

const app = express();

// CORS configuration to allow localhost:3000
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from localhost:3000
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  // allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Async function to connect to MongoDB
const connectDatabase = async () => {
  try {
    await mongoose.connect(db_elements.db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Register routes
    app.use("/test", landingTest);
    app.use("/path", pathGetter);
    app.use("/cab", cabGetter);
    app.use("/user", userBooking);
    app.use("/allcab", allCabBooking);
    app.use("/addCab", addCab);
    app.use("/cabs", getCabs);
    app.use("/register",userRoutes)

    // logger_all.Logger.info("Middleware added, starting connection!!");

    // Start the server
    app.listen(db_elements.db_port, () => {
      console.log(`Server running on port: ${db_elements.db_port}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

// Connect to MongoDB and start server
connectDatabase();
