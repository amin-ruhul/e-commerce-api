const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ErrorHandler = require("../utils/ErrorHandler");

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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ErrorHandler("Password is not match", 401));

    // generate token
    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.status(200).json({
      success: true,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
