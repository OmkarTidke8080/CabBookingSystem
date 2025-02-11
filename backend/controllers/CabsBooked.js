import user from "../models/user.js";

export const getBookedCabs = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    

    // Find the user by email
    const userData = await user.findOne({ user_email: email });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ bookedCabs: userData.user_cabs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching booked cabs", error: error.message });
  }
};
