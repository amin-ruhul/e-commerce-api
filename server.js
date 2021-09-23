const express = require("express");
const dotenv = require("dotenv");
const productRoute = require("./routes/productRoute");

// load config file
dotenv.config({ path: "./config/config.env" });
const app = express();
app.use(express.json());

// routes
app.use("/api", productRoute);

// const config server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`server running at port:${PORT} in ${process.env.NODE_ENV} mode`)
);
