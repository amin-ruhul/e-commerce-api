const User = require("../models/User");
const bcrypt = require("bcrypt");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    // check requirement
    const { name, email, password } = req.body;
    if (!password) return next(new ErrorHandler("Password require", 500));
    if (password.length < 6)
      return next(
        new ErrorHandler("Password must be or grater then 6 character", 500)
      );

    //  generate has password
    const has_password = await bcrypt.hash(password, 10);
    // create user
    const newUser = await User.create({
      name,
      email,
      password: has_password,
      avatar: {
        public_id: "public/id123",
        url: "https://randomuser.me/api/portraits/women/29.jpg",
      },
    });

    // generate jet
    const payload = {
      user: {
        id: newUser._id,
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
  registerUser,
};
