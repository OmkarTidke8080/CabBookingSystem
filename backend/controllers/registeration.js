import SignUpModel from "../models/SignUpModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input data
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await SignUpModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user data
    const user = await SignUpModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create a JWT token (You can set your own secret)
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    // Set the token in a cookie (optional)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // Send the response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving user data", error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await SignUpModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "your_secret_key",
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      email: user.email,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error: error.message });
  }
};


export const signOut = (req, res) => {
  try {
    // In case you are using cookies to store the JWT, clear the cookie
    res.clearCookie("authToken"); // Replace 'authToken' with the actual name of the cookie if needed

    // Send response indicating successful sign-out
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during sign out", error: error.message });
  }
};