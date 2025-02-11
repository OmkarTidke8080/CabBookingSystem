import express from "express";
import Logger from "../connect/logg.js";
import USER from "../models/user.js";
import ALLBOOKING from "../models/allBooking.js";
import nodemailer from "nodemailer";
import db_elements from "../connect/getENV.js";

const userBooking = express.Router();

// Using node mailer transporter object to create a connection with the mailing service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "omkartidke2016@gmail.com",
    pass: "wkbg zuzx xfwa dmil",
  },
});

const dateObject = new Date();

// Update user booking route adds the user to the USER schema who have booked the cab
// userBooking.post("/update-user-booking", async (req, res) => {
//   const {
//     email,
//     obj: cab_obj,
//     total_time,
//     total_price,
//     source,
//     dest,
//   } = req.body;
//   const hours = dateObject.getHours();
//   const minutes = dateObject.getMinutes();
//   const seconds = dateObject.getSeconds();
//   const date = `0 ${dateObject.getDate()}`.slice(-2);
//   const month = `0 ${dateObject.getMonth() + 1}`.slice(-2);
//   const year = dateObject.getFullYear();
//   const timestamp = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
//   cab_obj["booking_time"] = timestamp;
//   cab_obj["user_journey_time"] = total_time;
//   cab_obj["user_total_price"] = total_price;
//   cab_obj["user_source"] = source;
//   cab_obj["user_destinations"] = dest;

//   try {
//     const ele1 = await USER.findOne({ user_email: email }).exec();
//     if (ele1 === null) {
//       // User is new
//       await USER.insertMany([{ user_email: email }]);
//       await USER.findOneAndUpdate(
//         { user_email: email },
//         { $push: { user_cabs: cab_obj } }
//       );
//       await ALLBOOKING.insertMany([
//         {
//           cab_name: cab_obj["cab_name"],
//           cab_price: cab_obj["user_total_price"],
//           cab_image: cab_obj["cab_image"],
//           cab_type: cab_obj["cab_type"],
//           cab_seats: cab_obj["cab_seats"],
//           user_email: email,
//         },
//       ]);

//       const mailOptions = {
//         from: db_elements.db_email,
//         to: email,
//         subject: "Booking Confirmed!!",
//         text: `Booking Confirmed ${cab_obj["cab_name"]},\n Total price of Trip = Rs${cab_obj["user_total_price"]}/-only,\n User Email: ${email},\n date&time : ${cab_obj["booking_time"]}`,
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           Logger.error(error);
//         } else {
//           Logger.success("Email Sent : " + info.response);
//         }
//       });

//       Logger.success("User CREATED, data added SUCCESSFULLY");
//       res.status(200).send({ message: "InsertUpdateSuccess", data: email });
//     } else {
//       const li = ele1.user_cabs[ele1.user_cabs.length - 1];
//       const li1 = li.booking_time.split(" ");
//       const li2 = timestamp.split(" ");
//       const t1 = li1[li1.length - 1];
//       const t2 = li2[li2.length - 1];
//       const tt1 = t1.split(":");
//       const tt2 = t2.split(":");
//       const time1 = parseInt(tt1[1]);
//       const time2 = parseInt(tt2[1]);
//       const hour1 = parseInt(tt1[0]);
//       const hour2 = parseInt(tt2[0]);
//       const ansTime = time2 - time1;

//       if (hour2 === hour1 && ansTime < total_time) {
//         res.status(200).send({ message: "Already In a Cab!!", data: false });
//         return;
//       }

//       await USER.findOneAndUpdate(
//         { user_email: email },
//         { $push: { user_cabs: cab_obj } }
//       );
//       await ALLBOOKING.insertMany([
//         {
//           cab_name: cab_obj["cab_name"],
//           cab_price: cab_obj["user_total_price"],
//           cab_image: cab_obj["cab_image"],
//           cab_type: cab_obj["cab_type"],
//           cab_seats: cab_obj["cab_seats"],
//           user_email: email,
//         },
//       ]);

//       const mailOptions = {
//         from: db_elements.db_email,
//         to: email,
//         subject: "Cab Booking Confirmed!!",
//         text: `Booking Confirmed ${cab_obj["cab_name"]},\n Total price of Trip = Rs${cab_obj["user_total_price"]}/-only,\n User Email: ${email},\n date&time : ${cab_obj["booking_time"]}`,
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           Logger.error(error);
//         } else {
//           w;
//           Logger.success("Email Sent : " + info.response);
//         }
//       });

//       Logger.success("Data UPDATED SUCCESSFULLY");
//       res.status(200).send({ message: "UpdateSuccess", data: email });
//     }
//   } catch (error) {
//     Logger.error(error.message);
//     res.status(404).json({ message: error.message });
//   }
// });
userBooking.post("/update-user-booking", async (req, res) => {
  const {
    email,
    obj: cab_obj,
    total_time,
    total_price,
    source,
    dest,
  } = req.body;
  const dateObject = new Date();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();
  const date = `0${dateObject.getDate()}`.slice(-2);
  const month = `0${dateObject.getMonth() + 1}`.slice(-2);
  const year = dateObject.getFullYear();
  const timestamp = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

  cab_obj["booking_time"] = timestamp;
  cab_obj["user_journey_time"] = total_time;
  cab_obj["user_total_price"] = total_price;
  cab_obj["user_source"] = source;
  cab_obj["user_destinations"] = dest;

  try {
    let user = await USER.findOne({ user_email: email }).exec();
    if (!user) {
      await USER.insertMany([{ user_email: email, user_cabs: [] }]);
      user = await USER.findOne({ user_email: email }).exec();
    }

    const bookingCount = user.user_cabs.length + 1;
    let discountApplied = 0;
    if (bookingCount % 3 === 0) {
      discountApplied = total_price * 0.3;
      cab_obj["user_total_price"] = total_price * 0.7;
    }

    await USER.findOneAndUpdate(
      { user_email: email },
      { $push: { user_cabs: cab_obj } }
    );
    await ALLBOOKING.insertMany([
      {
        cab_name: cab_obj["cab_name"],
        cab_price: cab_obj["user_total_price"],
        cab_image: cab_obj["cab_image"],
        cab_type: cab_obj["cab_type"],
        cab_seats: cab_obj["cab_seats"],
        user_email: email,
      },
    ]);

    const discountMessage =
      discountApplied > 0
        ? `You received a discount of Rs${discountApplied}/- on this booking!`
        : "";

    const mailOptions = {
      from: db_elements.db_email,
      to: email,
      subject: "Cab Booking Confirmed!!",
      text: `Booking Confirmed ${cab_obj["cab_name"]},\n Total price of Trip = Rs${cab_obj["user_total_price"]}/-only,\n ${discountMessage}\n User Email: ${email},\n Date & Time: ${cab_obj["booking_time"]}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        Logger.error(error);
      } else {
        Logger.success("Email Sent: " + info.response);
      }
    });

    Logger.success("Booking Successful");
    res
      .status(200)
      .send({ message: "UpdateSuccess", data: email, discountApplied });
  } catch (error) {
    Logger.error(error.message);
    res.status(404).json({ message: error.message });
  }
});



// Fetching all the users for the admin display
userBooking.get("/user/get-data", async (req, res) => {
  try {
    const ele = await USER.find().exec();
    if (ele !== null) {
      res.status(200).send({ message: "fetchSuccess", data: ele });
      Logger.success("All users FetchSuccess");
    } else {
      Logger.error("All users FetchFailed");
      res.status(200).send({ message: "fetchFailed", data: {} });
    }
  } catch (error) {
    Logger.error(error.message);
    res.status(404).json({ message: error.message });
  }
});

export default userBooking;
