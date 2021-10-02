const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");

const registerUser = async (req, res, next) => {
  try {
    // check requirement
    const { name, email, password } = req.body;
    if (!password) return next(new ErrorHandler("Password require", 500));
    if (password.length < 6)
      return next(
        new ErrorHandler("Password must be or grater then 6 character", 500)
      );

    // create user
    const newUser = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "public/id123",
        url: "https://randomuser.me/api/portraits/women/29.jpg",
      },
    });

    // create token
    const token = newUser.getJwtToken();

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
