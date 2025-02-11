import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

     // Basic validation
     if (!formData.name || !formData.email || !formData.password) {
       alert("Please fill in all required fields.");
       return;
     }

     if (!formData.agreeToTerms) {
       alert("You must agree to the terms and conditions.");
       return;
     }

     try {
       const response = await axios.post(
         "http://localhost:5000/register/signUp",
         {
           name: formData.name,
           email: formData.email,
           password: formData.password,
         },
         {
           headers: {
             "Content-Type": "application/json",
           },
         }
       );

       if (response.status === 201) {
         console.log("Sign up successful:", response.data);
         alert("Sign up successful! Please log in.");

         // Redirect to sign-in page after successful registration
         navigate("/signin");
       } else {
         alert(response.data.message || "Sign up failed. Please try again.");
       }
     } catch (error) {
       console.error("Error during sign up:", error);
       alert("An error occurred while signing up. Please try again.");
     }
   };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-2 p-8 w-96 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
           Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-2 p-2 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
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
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the terms and conditions
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerSignup;
