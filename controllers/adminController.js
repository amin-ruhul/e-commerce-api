const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");

// get all users
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

// get single user
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

// delete user
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(new ErrorHandler("User not found", 404));

    await user.remove();

    // remove avatar

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// update user
const updateUser = async (req, res, next) => {
  try {
    const UpdatedUser = {
      name: req.body.name,
      role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, UpdatedUser, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "User Update Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserDetails,
  deleteUser,
  updateUser,
};
