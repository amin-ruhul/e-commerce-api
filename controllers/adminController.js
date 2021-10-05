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

const getUserDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) return next(new ErrorHandler("User is is require", 400));

    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("User not found", 404));

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserDetails,
};
