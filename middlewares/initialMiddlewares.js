const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");

const logger = require("../logger/logger");

// Custom logger middleware using Winston
const loggerMiddleware = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`); // Logs HTTP requests
  next();
};

const initialMiddlewares = [
  loggerMiddleware, // Logging middleware
  morgan("dev"), // Logs HTTP requests
  bodyParser.json(), // Parses incoming JSON request bodies
  bodyParser.urlencoded({ extended: true }), // Parses URL-encoded data
  cookieParser(), // Parses cookies from HTTP requests
  compression(), // Compresses response bodies for better performance
  cors(), // Enables Cross-Origin Resource Sharing
  helmet(), // Secures HTTP headers
];

module.exports = initialMiddlewares
