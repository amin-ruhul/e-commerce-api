const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const sendEmail = require("../utils/sendEmail");

// protected middleware
const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next(new ErrorHandler("Not Authorize", 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    next(error);
  }
};

// create authorize middleware

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler("Access denied", 403));
    }
    next();
  };
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
    )}/uses/password/reset/${resetToken}`;

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

module.exports = { protect, authorizeRole, forgotPassword };
