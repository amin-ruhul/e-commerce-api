const express = require("express");
const { registerUser } = require("../controllers/userController");
const { login, loggedInUser } = require("../controllers/authController");
const protect = require("../middlewares/auth");

const route = express.Router();

// register new user
route.post("/register", registerUser);

// login user
route.post("/login", login);

// load logged in user
route.get("/", protect, loggedInUser);
module.exports = route;
