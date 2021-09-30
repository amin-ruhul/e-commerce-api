const Product = require("../models/Product");
const ErrorHandler = require("../utils/ErrorHandler");
const APIFeatures = require("../utils/APIFeatures");

// get all product from database
const getProducts = async (req, res, next) => {
  try {
    const apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter();
    const products = await apiFeatures.query;
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// get single product from database

const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    // product not found response
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    // success response
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// insert single product into Database
const InsertProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// update product

const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    // check product is existed
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    // update product
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    // success response
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// delete product

const deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    // check product is existed
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    // delete product
    await product.remove();
    res.status(200).json({
      success: true,
      data: "Product Deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  InsertProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
