const User = require("../models/User");

const registerUser = (req, res, next) => {
  res.send("register");
};

module.exports = {
  registerUser,
};
