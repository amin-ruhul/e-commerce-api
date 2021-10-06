const Order = require("../models/Order");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/ErrorHandler");

// crate new order
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

// get single order
const singleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) return next(new ErrorHandler("Order Not found", 404));

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// get logged in user order
const myOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// get all orders * admin route*

const allOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    let total = 0;
    orders.forEach((order) => {
      total += order.totalPrice;
    });

    res.status(200).json({
      success: true,
      orders,
      totalPrice: total,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newOrder,
  singleOrder,
  myOrder,
  allOrders,
};
