const express = require("express");
const dotenv = require("dotenv");

// load config file
dotenv.config({ path: "./config/config.env" });

const app = express();

// const config server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`server running at port:${PORT} in ${process.env.NODE_ENV} mode`)
);
