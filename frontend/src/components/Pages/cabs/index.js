import axios from "axios";
import { useState, useEffect } from "react";
import back4 from "../../assets/images/back4.jpg";
import AllUserCard from "../../atom/allUserCard.js/index.js";
import { Ring } from "@uiball/loaders";

const Cabs = () => {
  const [bookedCabs, setBookedCabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedCabs = async () => {
       const userEmail = localStorage.getItem("userEmail");

       if (!userEmail) {
         console.error("User not signed in");
         setLoading(false);
         return;
       }
      try {
        const response = await axios.get(
          `http://localhost:5000/register/bookedCabs/${userEmail}`
        );

        if (response.status === 200) {
          console.log("Booked Cabs Data:", response.data);
          setBookedCabs(response.data.bookedCabs);
        } else {
          console.error("Failed to fetch booked cabs");
        }
      } catch (error) {
        console.error("Error fetching booked cabs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedCabs();
  }, []);

  return (
    <div className="flex flex-col items-center py-8" id="Cabs">
      <h2 className="text-2xl font-bold mb-6">Booked Cabs</h2>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-6 text-left">SNo.</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Cab Name</th>
              <th className="py-3 px-6 text-left">Source</th>
              <th className="py-3 px-6 text-left">Destination</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  <Ring size={40} lineWeight={5} speed={2} color="black" />
                </td>
              </tr>
            ) : bookedCabs.length > 0 ? (
              bookedCabs.map((cab, index) => (
                <tr key={cab._id} className="border-b border-gray-200">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">
                    {new Date(cab.booking_time).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6">{cab.cab_name}</td>
                  <td className="py-3 px-6">{cab.user_source}</td>
                  <td className="py-3 px-6">{cab.user_destinations}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5">
                  No booked cabs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <img
          src={back4}
          className="w-full max-w-md rounded-lg shadow-md"
          alt="backgroundImg"
        />
      </div>
    </div>
  );
};

export default Cabs;
