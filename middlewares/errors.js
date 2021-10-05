const ErrorHandler = require("../utils/ErrorHandler");

const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err);

  // id is not match error
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorHandler(message, 404);
  }

  // duplicate key error
  if (err.code === 11000) {
    const message = ` User already existed`;
    error = new ErrorHandler(message, 400);
  }

  // validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorHandler(message, 400);
  }

  // invalid jwt error
  if (err.name === "JsonWebTokenError") {
    const message = "Token is Invalid";
    error = new ErrorHandler(message, 400);
  }

  // jwt expired error
  if (err.name === "TokenExpiredError") {
    const message = "Token is Expired";
    error = new ErrorHandler(message, 400);
  }

  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal Server Error";
  res.status(error.statusCode).json({
    success: false,
    error: error.message,
  });
};

module.exports = globalErrorHandler;
