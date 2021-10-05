const express = require("express");
const route = express.Router();
const {
  getAllUsers,
  getUserDetails,
} = require("../controllers/adminController");

const { protect, authorizeRole } = require("../middlewares/auth");

route.get("/users", protect, authorizeRole("admin"), getAllUsers);

route.get("/user/:id", protect, authorizeRole("admin"), getUserDetails);

module.exports = route;
