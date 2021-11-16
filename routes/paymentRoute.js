const express = require("express");
const {
  makePayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const route = express.Router();

const { protect } = require("../middlewares/auth");

// create new payment
route.post("/process", protect, makePayment);

route.get("/stripe/key", protect, sendStripeApiKey);

module.exports = route;
