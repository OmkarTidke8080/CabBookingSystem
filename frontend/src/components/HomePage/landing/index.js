import styles from "./index.module.css";
import Navbar from "../../Pages/navbar/Navbar";
import Banner from "../../Pages/banner";
import Users from "../../Pages/users";
import Cabs from "../../Pages/cabs";
import BookingSection from "../../Pages/booking";
import { useEffect, useState } from "react";
import axios from "axios";
import NumPlace from "../../assets/store/numPlace.json";
import {
  faTriangleExclamation,
  faCircleCheck,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import ErrorCard from "../../atom/errorCard";

const Landing = (props) => {
  // global states passed from parent to child so on
  const [email, setEmail] = useState("");
  const [sourceLocation, setSourceLocation] = useState("");
  const [destLocation, setDestLocation] = useState("");
  const [totalTime, setTotalTime] = useState(null);
  const [cabDisplayLoading, setCabDisplayLoading] = useState(true);
  const [cabData, setCabData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allUserLoading, setAllUserLoading] = useState(true);
  const [allCabs, setAllCabs] = useState([]);
  const [allCabsLoading, setAllCabsLoading] = useState(true);

  //error change states for the dropdown
  const [errorDisplay, setErrorDisplay] = useState("none");
  const [errorIcon, setErrorIcon] = useState();
  const [errorText, setErrorText] = useState("Error");
  const [errorColor, setErrorColor] = useState("red");

  //fetch all user function (fetches all the users which are present in the USER schema)
  function fetchAllUsers() {
    setAllUserLoading(true);
    axios.get("http://localhost:5000/user/user/get-data", {}).then((res) => {
      setAllUsers(res.data.data.reverse());
      setAllUserLoading(false);
    });
  }

  //fetch cabs function(fetches all the cabs that are available means type of cabs such as cab GO,cab Xl etc)
  //with this user gets the freedom of choice and better experience
  function fetchCabs() {
    setCabDisplayLoading(true);
    axios.get("http://localhost:5000/cabs/getAllCabs", {}).then((res) => {
      // console.log
      if (res.data !== null) {
        setCabData(res.data);
      }
      setCabDisplayLoading(false);
    });
  }

  //fetch all cabs detail function(fetches all the cabs that have been booked by each user with their timestamp, price etc)
  function fetchAllCabDetail() {
    setAllCabsLoading(true);
    axios.get("http://localhost:5000/allcab/get-all-cab", {}).then((res) => {
      console.log("Response Data:", res.data);
      if (Array.isArray(res.data)) {
        setAllCabs(res.data.reverse());
      } else {
        console.error("Expected an array, but got:", res.data);
        setAllCabs([]); // Set to an empty array or handle appropriately
      }
      setAllCabsLoading(false);
    });
  }

  //useEffect calling each function on load with an empty [] so the useEffect is called only once
  useEffect(() => {
    fetchCabs();
    fetchAllUsers();
    fetchAllCabDetail();
  }, []);

  //parent change state function - changes value of the global state
  function changeSource(value) {
    setSourceLocation(value);
  }
  function changeEmail(value) {
    setEmail(value);
  }
  function changeDest(value) {
    setDestLocation(value);
  }

  //error check function for the setTimeout call - changes value back to none once done
  function myStopFunction() {
    setErrorDisplay("none");
  }

  function showError(message, type) {
    setErrorText(message);
    if (type === "success") {
      setErrorIcon(faCircleCheck);
      setErrorDisplay("flex");
      setErrorColor("green");
    } else if (type === "info") {
      setErrorIcon(faCircleInfo);
      setErrorDisplay("flex");
      setErrorColor("#FD9229");
    } else {
      setErrorIcon(faTriangleExclamation);
      setErrorDisplay("flex");
      setErrorColor("red");
    }
    setTimeout(myStopFunction, 4000);
  }

  // check Fair clicked fetches the shortest time path form the python file
  function checkFairClicked() {
    //email validation using regex is done -- causing 3 linting error reason unknown
    var emailCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailCheck.test(email) === false) {
      //error displayer function
      showError("Email is incorrect", "error");
      return;
    }
    if (sourceLocation === destLocation) {
      showError("Both Locations are same", "error");
      return;
    }
    if (sourceLocation === "" || destLocation === "" || email === "") {
      showError("Field is empty", "error");
      return;
    }

    // calling the python file
    setCabDisplayLoading(true);
    axios
      .post("http://localhost:5000/path/fetch-shortest-path", {
        start: NumPlace[sourceLocation],
        dest: NumPlace[destLocation],
      })
      .then((res) => {
        // console.log(res.data)
        setTotalTime(res.data);
        setCabDisplayLoading(false);
      });
  }

  //cab booking clicked function(as soon as the cab is booked the user gets the email of confermation using node mailer)
  // function cabBookClicked(ele, price, time) {
  //   if (
  //     time === null ||
  //     email === "" ||
  //     sourceLocation === "" ||
  //     destLocation === ""
  //   ) {
  //     showError(" Check Fair First!!", "error");
  //     return;
  //   }
  //   axios
  //     .post("http://localhost:5000/user/update-user-booking", {
  //       source: sourceLocation,
  //       dest: destLocation,
  //       obj: ele,
  //       total_time: time,
  //       total_price: price,
  //       email: email,
  //     })
  //     .then((res) => {
  //       if (res.data.data === false) {
  //         showError(res.data.message, "error");
  //         return;
  //       }
  //       showError("Cab Booked Successfully!!", "error");
  //       console.log(res.data);
  //       fetchAllUsers();
  //       fetchAllCabDetail();
  //     });
  // }
  function cabBookClicked(ele, price, time) {
    if (
      time === null ||
      email === "" ||
      sourceLocation === "" ||
      destLocation === ""
    ) {
      showError("Check Fare First!!", "error");
      return;
    }

    axios
      .post("http://localhost:5000/user/update-user-booking", {
        source: sourceLocation,
        dest: destLocation,
        obj: ele,
        total_time: time,
        total_price: price,
        email: email,
      })
      .then((res) => {
        if (res.data.data === false) {
          showError(res.data.message, "error");
          return;
        }

        let successMessage = "Cab Booked Successfully!!";
        if (res.data.discountApplied > 0) {
          successMessage += ` You received a discount of Rs${res.data.discountApplied}/-!`;
        }

        showError(successMessage, "success");
        console.log(res.data);
        fetchAllUsers();
        fetchAllCabDetail();
      });
  }


  return (
    <>
      <div className={styles.landing__outer}>
        <ErrorCard
          errorDisplay={errorDisplay}
          errorIcon={errorIcon}
          errorText={errorText}
          errorColor={errorColor}
        />
        <Navbar />
        <div className={styles.langing__gap}></div>

        <Banner />
        <BookingSection
          errorDisplay={errorDisplay}
          errorIcon={errorIcon}
          errorText={errorText}
          errorColor={errorColor}
          changeDest={changeDest}
          sourceLocation={sourceLocation}
          totalTime={totalTime}
          changeEmail={changeEmail}
          changeSource={changeSource}
          destLocation={destLocation}
          checkFairClicked={checkFairClicked}
          cabData={cabData}
          cabDisplayLoading={cabDisplayLoading}
          cabBookClicked={cabBookClicked}
        />

        {/* <Users flag={1} allUsers={allUsers} allUserLoading={allUserLoading} /> */}

        <Cabs flag={0} allCabs={allCabs} allCabsLoading={allCabsLoading} />
      </div>
    </>
  );
};

export default Landing;
