const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) return next(new ErrorHandler("No user in your system", 404));
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
};
