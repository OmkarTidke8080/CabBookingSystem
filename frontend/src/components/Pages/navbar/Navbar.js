import styles from "./index.module.css";
import logo from "../../assets/images/logo2.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = (props) => {
  const navigate = useNavigate();

  // Check if the user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there's an authentication token in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []); // Empty dependency array to check once when the component mounts

  const handleLogout = () => {
    // Remove the token and update state to log the user out
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/signIn"); // Redirect to the Sign In page
  };

  return (
    <div className={styles.navbar__outer}>
      <div className={styles.navbar__inner}>
        <div className={styles.navbar__inner__left}>
          <div className={styles.navbar__logo}>
            <img
              src={logo}
              style={{ width: "100%", height: "100%" }}
              alt="logo"
            />
          </div>
        </div>
        <div className={styles.navbar__inner__right}>
          {!isAuthenticated ? (
            <button
              onClick={() => navigate("/signIn")}
              className={styles.navbar__center__each}
            >
              Sign In{" "}
              <FontAwesomeIcon icon={faUser} size="lg" className="nav__icon" />
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className={styles.navbar__center__each}
            >
              Log Out{" "}
              <FontAwesomeIcon icon={faUser} size="lg" className="nav__icon" />
            </button>
          )}
          {/* <button className={styles.navbar__center__each}>
            Cabs Booked{" "}
            <FontAwesomeIcon icon={faTaxi} size="lg" className="nav__icon" />
          </button> */}
        </div>
        <div className={styles.navbar__inner__right__mobile}>
          <div className={styles.navbar__center__each}>
            <FontAwesomeIcon icon={faUser} size="lg" className="nav__icon" />
          </div>
          <div className={styles.navbar__center__each}>
            <FontAwesomeIcon icon={faTaxi} size="lg" className="nav__icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
