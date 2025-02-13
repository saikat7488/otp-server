const { createLogger, format, transports } = require("winston");

// Define custom formats
const { combine, timestamp, printf, colorize } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create the logger instance
const logger = createLogger({
  level: "info", // Default log level
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    colorize(), // Adds color to logs in the console
    logFormat
  ),
  transports: [
    new transports.Console(), // Logs to the console
    new transports.File({ filename: "logs/error.log", level: "error" }), // Error logs
    new transports.File({ filename: "logs/combined.log" }), // All logs
  ],
});

// Export logger
module.exports = logger;
