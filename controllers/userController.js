const User = require("../models/User");
const ErrorHandler = require("../utils/ErrorHandler");
const tokenResponse = require("../utils/tokenResponse");

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

    // create token and send response
    tokenResponse(newUser, 200, res);
  } catch (error) {
    next(error);
  }
};

//********* update user*********** */

const updateUser = async (req, res, next) => {
  try {
    const UpdatedUser = {
      name: req.body.name,
      email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user._id, UpdatedUser, {
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
  registerUser,
  updateUser,
};
