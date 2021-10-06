const Order = require("../models/Order");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/ErrorHandler");

const newOrder = async (req, res, next) => {
  try {
    const order = await Order.create({
      ...req.body,
      paidAt: Date.now,
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newOrder,
};
