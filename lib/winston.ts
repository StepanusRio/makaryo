// // utils/logger.js
// import path from "path";
// import winston from "winston";

// const logFilePath = path.join(process.cwd(), "logs", "error.log");

// // Create a logger instance
// const logger = winston.createLogger({
//   level: "error",
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.File({ filename: logFilePath }),
//     new winston.transports.Console(),
//   ],
// });

// export default logger;
