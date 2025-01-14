import styles from "./index.module.css";
import back4 from "../../assets/images/back4.jpg";
import AllUserCard from "../../atom/allUserCard.js/index.js";
import { Ring } from "@uiball/loaders";
import { useState, useEffect } from "react";

const Cabs = (props) => {
  const [allCabs, setAllCabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const response = await fetch("http://localhost:5000/cabs/getAllCabs"); // Adjust URL if needed
        if (response.ok) {
          const data = await response.json();
          setAllCabs(data);
        } else {
          console.error("Failed to fetch cabs");
        }
      } catch (error) {
        console.error("Error fetching cabs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCabs();
  }, []);

  return (
    <>
      <div className={styles.cabs__outer} id="Cabs">
        <div className={styles.cabs__inner}>
          <div className={styles.cabs__inner__right}>
            <div className={styles.cabs__inner__left__heading}>All Cabs</div>
            <div
              style={{ border: "none" }}
              className={styles.cabs__inner__left__display__each}
            >
              <div className={styles.cabs__inner__left__display__each__sno}>
                SNo.
              </div>
              <div className={styles.cabs__inner__left__display__each__sno}>
                Cab Name
              </div>
              <div className={styles.cabs__inner__left__display__each__sno}>
                Seating Capacity
              </div>
            </div>
            <div className={styles.cabs__inner__left__display}>
              {loading ? (
                <Ring size={40} lineWeight={5} speed={2} color="black" />
              ) : (
                allCabs.map((cab, index) => (
                  <AllUserCard
                    key={cab._id}
                    flag={false}
                    ele={{ ...cab, sno: index + 1 }}
                  />
                ))
              )}
            </div>
          </div>
          <div className={styles.cabs__inner__left}>
            <img
              src={back4}
              style={{ width: "100%", height: "100%" }}
              alt="backgroundImg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cabs;
