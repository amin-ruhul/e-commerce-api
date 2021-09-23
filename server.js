const express = require("express");
const dotenv = require("dotenv");
const productRoute = require("./routes/productRoute");
const DB_connection = require("./config/db");
const globalErrorHandler = require("./middlewares/errors");

// load config file
dotenv.config({ path: "./config/config.env" });
const app = express();
app.use(express.json());

// database connection
DB_connection();

// routes
app.use("/api", productRoute);

// const config server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`server running at port:${PORT} in ${process.env.NODE_ENV} mode`)
);

// handle unhandle promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // exit the server
  server.close(() => process.exit(1));
});

// global error handler
app.use(globalErrorHandler);
