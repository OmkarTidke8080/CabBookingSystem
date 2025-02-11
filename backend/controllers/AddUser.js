import userData from "../models/userData.js";

const addUser = async (req, res) => {
  try {
    const newUser = req.body;

    // Validate input data
    if (!newUser.name || !newUser.email || !newUser.password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save the user data
    const user = await userData.create(newUser);

    // Send a success response
    res.status(201).json({
      message: "User added successfully",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving user data", error: error.message });
  }
};

export default addUser;
