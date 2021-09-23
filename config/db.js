const mongoose = require("mongoose");

const DB_connection = async () => {
  await mongoose.connect(process.env.DB_URL);

  console.log("Connected to DB");
};

module.exports = DB_connection;
