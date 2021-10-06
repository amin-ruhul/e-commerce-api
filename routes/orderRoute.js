const express = require("express");
const { newOrder } = require("../controllers/orderController");
const route = express.Router();

const { protect, authorizeRole } = require("../middlewares/auth");

// create new order
route.post("/new", protect, newOrder);

module.exports = route;
