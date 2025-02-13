const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// MongoDB URI
const mongoURI = process.env.MONGO_URI;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process if the connection fails
  }
};

module.exports = connectDB;
