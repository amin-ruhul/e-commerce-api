const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const tokenResponse = require("../utils/tokenResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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

// forget password middleware

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(new ErrorHandler("User Not found", 404));

    // get reset token

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // create url
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/user/reset/password/${resetToken}`;

    const message = `Your Reset Password Link:  ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Ecom Password recovery",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email send to : ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.restPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    next(error);
  }
};

// reset password
const resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // check token
    const user = await User.findOne({
      resetPasswordToken,
      restPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return next(new ErrorHandler("Invalid token", 400));

    // check password
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      return next(new ErrorHandler("Password does not match", 401));

    // set password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.restPasswordExpire = undefined;

    // save and response
    await user.save();

    tokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// logout user

const logout = (req, res, next) => {
  try {
    req.headers.authorization = null;
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  loggedInUser,
  logout,
  forgotPassword,
  resetPassword,
};
