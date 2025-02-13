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

//Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message : "Connected"
  });
});

app.use("/email-service", routes.email);


module.exports = app;
