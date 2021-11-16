const express = require("express");
const { makePayment } = require("../controllers/paymentController");
const route = express.Router();

const { protect } = require("../middlewares/auth");

// create new payment
route.post("/process", protect, makePayment);

module.exports = route;
