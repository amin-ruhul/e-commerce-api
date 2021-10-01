const express = require("express");
const { registerUser } = require("../controllers/userController");

const route = express.Router();

// register new user
route.post("/register", registerUser);

module.exports = route;
