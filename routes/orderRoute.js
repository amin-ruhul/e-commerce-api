const express = require("express");
const {
  newOrder,
  singleOrder,
  myOrder,
} = require("../controllers/orderController");
const route = express.Router();

const { protect, authorizeRole } = require("../middlewares/auth");

// create new order
route.post("/new", protect, newOrder);

// logged in user orders
route.get("/myorder", protect, myOrder);

// single order
route.get("/:id", protect, singleOrder);

module.exports = route;
