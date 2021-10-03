const express = require("express");
const { registerUser, updateUser } = require("../controllers/userController");
const {
  login,
  loggedInUser,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/authController");
const { protect } = require("../middlewares/auth");

const route = express.Router();

// register new user
route.post("/register", registerUser);

// update user
route.put("/update", protect, updateUser);

// login user
route.post("/login", login);

// sent recovery mail route
route.post("/forgot/password", forgotPassword);

// reset password route
route.put("/reset/password/:token", resetPassword);

// change password
route.put("/change/password/", protect, changePassword);

// load logged in user
route.get("/", protect, loggedInUser);

// logout route
route.get("/logout", logout);

module.exports = route;
