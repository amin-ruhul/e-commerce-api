const Product = require("../models/Product");
const getProducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "All product",
  });
};

const InsertProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  InsertProduct,
};
