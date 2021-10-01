const User = require("../models/User");
const bcrypt = require("bcrypt");
const ErrorHandler = require("../utils/ErrorHandler");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!password) return next(new ErrorHandler("Password require", 500));
    if (password.length < 6)
      return next(
        new ErrorHandler("Password must be or grater then 6 character", 500)
      );

    const has_password = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: has_password,
      avatar: {
        public_id: "public/id123",
        url: "https://randomuser.me/api/portraits/women/29.jpg",
      },
    });
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
};
