const express = require("express");
// import controllers
const { getProducts } = require("../controllers/productController");

// create route object
const route = express.Router();

// handel route
route.get("/products", getProducts);

module.exports = route;
