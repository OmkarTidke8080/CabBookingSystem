import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/register/signIn",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Sign in successful:", response.data);
        alert("Sign in successful!");

        // Store the token and user email in localStorage
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userEmail", formData.email); // Use formData.email

        // Redirect to home page after successful login
        navigate("/");
      } else {
        alert(
          response.data.message ||
            "Sign-in failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("An error occurred while signing in. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2 p-8 w-96 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 p-2 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-2 p-2 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            onClick={() => navigate("/signUp")}
            className="mt-2 text-blue-500 font-medium underline hover:text-blue-700 transition duration-300"
          >
            Sign Up Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
