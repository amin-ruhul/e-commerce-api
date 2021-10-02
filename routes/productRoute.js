const express = require("express");
// import controllers
const {
  getProducts,
  InsertProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, authorizeRole } = require("../middlewares/auth");

// create route object
const route = express.Router();

//  get all product from database
route.get("/products", protect, authorizeRole("admin"), getProducts);

// get single product from database
route.get("/product/:id", getSingleProduct);

// insert product into database
route.post("/product", protect, InsertProduct);

// update product
route.put("/product/:id", updateProduct);

// delete product
route.delete("/product/:id", deleteProduct);

module.exports = route;
