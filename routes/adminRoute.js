const express = require("express");
const route = express.Router();
const {
  getAllUsers,
  getUserDetails,
  deleteUser,
} = require("../controllers/adminController");

const { protect, authorizeRole } = require("../middlewares/auth");

// get all user
route.get("/users", protect, authorizeRole("admin"), getAllUsers);

// get specific user
route.get("/user/:id", protect, authorizeRole("admin"), getUserDetails);

// delete user
route.delete("/user/:id", protect, authorizeRole("admin"), deleteUser);

module.exports = route;
