const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const tokenResponse = require("../utils/tokenResponse");

// get logged in user
const loggedInUser = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// login user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Invalid Credential", 400));
    }
    // load user from database
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("User is not existed", 401));

    // check password is ok or not
    const isMatch = await user.PasswordMatch(password);
    if (!isMatch) return next(new ErrorHandler("Password is not match", 401));

    // generate token
    tokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  loggedInUser,
};
