const express = require("express");
// import controllers
const {
  getProducts,
  InsertProduct,
  getSingleProduct,
  updateProduct,
} = require("../controllers/productController");

// create route object
const route = express.Router();

//  get all product from database
route.get("/products", getProducts);

// get single product from database
route.get("/product/:id", getSingleProduct);

// insert product into database
route.post("/product", InsertProduct);

// update product
route.put("/product/:id", updateProduct);

module.exports = route;
