import addUser from "../controllers/AddUser.js";
import {
  SignUp,
  signIn,
  signOut,
  
} from "../controllers/registeration.js";
import { getBookedCabs } from "../controllers/CabsBooked.js";
import express from "express";

const router = express.Router(); 

router.post("/addUser", addUser);
router.post("/signUp", SignUp);
router.post("/signin", signIn);
router.post("/signout", signOut);
router.get("/bookedCabs/:email", getBookedCabs);

export default router;
