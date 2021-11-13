const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const orderRoute = require("./routes/orderRoute");
const DB_connection = require("./config/db");
const globalErrorHandler = require("./middlewares/errors");

// handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log(err.message);
  process.exit(1);
});

// load config file
dotenv.config({ path: "./config/config.env" });
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload);

// database connection
DB_connection();

// config cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_Kay: process.env.API_KAY,
  api_secret: process.env.API_SECRET,
});

// routes
app.use("/api", productRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/order", orderRoute);

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
