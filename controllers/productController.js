const Product = require("../models/Product");
const ErrorHandler = require("../utils/ErrorHandler");
const APIFeatures = require("../utils/APIFeatures");

// get all product from database
const getProducts = async (req, res, next) => {
  try {
    const resultPerPage = 3;
    const apiFeatures = new APIFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

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
    req.body.user = req.user.id;
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

// add review for the product

const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    // check user is already given reviewed or not
    const isReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.comment = comment;
          review.rating = rating;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReview = product.reviews.length;
    }

    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// get all review for the product
const getProductReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    next(error);
  }
};

// delete review
const deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(
      (review) => review._id.toString() !== req.query.rId.toString()
    );

    const ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      reviews.length;

    const numOfReview = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReview,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: true,
      }
    );

    res.status(200).json({
      success: true,
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
  createProductReview,
  getProductReviews,
  deleteReview,
};
