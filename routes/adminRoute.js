const express = require("express");
const route = express.Router();
const { getAllUsers } = require("../controllers/adminController");

const { protect, authorizeRole } = require("../middlewares/auth");

route.get("/users", protect, authorizeRole("admin"), getAllUsers);

module.exports = route;
