const express = require("express");
const { registerUser } = require("../controllers/userController");
const { login, loggedInUser } = require("../controllers/authController");

const route = express.Router();

// register new user
route.post("/register", registerUser);

// login user
route.post("/login", login);

// load logged in user
route.get("/", loggedInUser);
module.exports = route;
