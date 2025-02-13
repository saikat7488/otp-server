// const dotenv = require("dotenv");

// // Dotenv Config
// dotenv.config();

// const mailConfig = {
//   imap: {
//     user: process.env.EMAIL_USER,
//     password: process.env.EMAIL_PASS,
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     tls: {
//       rejectUnauthorized: false, // Ignore self-signed certificate error
//     },
//     tlsOptions: {
//       rejectUnauthorized: false,
//       minVersion: "TLSv1.2", // Enforce TLS 1.2+
//     }, // Ignore SSL certificate errors
//     authTimeout: 10000,
//   },
// };

// module.exports = mailConfig;


// const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");

// // Load environment variables
// dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 993, // Use 465 for SSL, 587 for TLS
//   secure: false, // Set `true` for port 465, `false` for port 587
//   auth: {
//     user: process.env.EMAIL_USER, // Gmail email
//     pass: process.env.EMAIL_PASS, // Gmail App Password
//   },
//   tls: {
//     rejectUnauthorized: false, // Allow self-signed certificates
//   },
// });

// module.exports = transporter;


const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Use 465 for SSL, or 587 for TLS
  secure: false, // `true` for 465, `false` for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Ensure you are using a Gmail App Password!
  },
  tls: {
    rejectUnauthorized: false, // Allow untrusted certificates
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to take messages!");
  }
});

module.exports = transporter;

