const express = require("express");
const dotenv = require("dotenv");
const initialMiddlewares = require("./middlewares/initialMiddlewares");
const routes = require("./routes");

//Config dotenv
dotenv.config();

//Create App
const app = express();

// Apply middlewares
initialMiddlewares.forEach((middleware) => app.use(middleware));

//Default Route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Connected"
  });
});

//Routes for health check
app.get("/health", (req, res) => {
  res.status(200).json({
    message: "100%"
  });
});

app.use("/email-service", routes.email);


module.exports = app;
