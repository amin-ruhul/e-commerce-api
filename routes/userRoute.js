const express = require("express");
const { registerUser } = require("../controllers/userController");
const {
  login,
  loggedInUser,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middlewares/auth");

const route = express.Router();

// register new user
route.post("/register", registerUser);

// login user
route.post("/login", login);

// sent recovery mail route
route.post("/forgot/password", forgotPassword);

// reset password route
route.put("/reset/password/:token", resetPassword);

// load logged in user
route.get("/", protect, loggedInUser);

// logout route
route.get("/logout", logout);

module.exports = route;
