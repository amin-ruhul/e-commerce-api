const express = require("express");
// import controllers
const {
  getProducts,
  InsertProduct,
} = require("../controllers/productController");

// create route object
const route = express.Router();

//  get all product from database
route.get("/products", getProducts);

// insert product into database
route.post("/product", InsertProduct);

module.exports = route;
