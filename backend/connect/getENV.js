import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Exporting environment variables as an object
const db_elements = {
  db_url: process.env.MONGODB_URL,
  db_port: process.env.PORT,
  db_email: process.env.GMAIL,
  dp_email_pass: process.env.PASS,
};

export default db_elements;
