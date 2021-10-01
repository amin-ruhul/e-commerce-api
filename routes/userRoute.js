const express = require("express");
const { registerUser } = require("../controllers/userController");
const { login } = require("../controllers/authController");

const route = express.Router();

// register new user
route.post("/register", registerUser);

// login user
route.post("/login", login);
module.exports = route;
