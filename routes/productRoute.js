const express = require("express");
// import controllers
const {
  getProducts,
  InsertProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");

const { protect, authorizeRole } = require("../middlewares/auth");

// create route object
const route = express.Router();

//  get all product from database
route.get("/products", getProducts);

// get single product from database
route.get("/product/:id", getSingleProduct);

// insert product into database
route.post("/product", protect, authorizeRole("admin"), InsertProduct);

// update product
route.put("/product/:id", protect, authorizeRole("admin"), updateProduct);

// delete product
route.delete("/product/:id", protect, authorizeRole("admin"), deleteProduct);

// add review
route.put("/review/product", protect, createProductReview);

// get reviews
route.get("/reviews/product/:id", getProductReviews);

// delete review
route.delete("/review/product", protect, deleteReview);

module.exports = route;
