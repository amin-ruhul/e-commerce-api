const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Product Name is Require"],
    trim: true,
    maxLength: [100, "Product Name Must be lower or equal to 100 Character"],
  },
  price: {
    type: Number,
    require: [true, "Product Price is Require"],
    default: 0.0,
  },
  description: {
    type: String,
    require: [true, "Product Description is Require"],
  },

  images: [
    {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
    },
  ],

  category: {
    type: String,
    require: [true, "Please Select Category"],
  },
  rating: {
    type: Number,
    default: 0,
  },

  stock: {
    type: Number,
    require: [true, "Please Enter Product Stock"],
  },

  numOfReview: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        require: true,
      },
      comment: {
        type: String,
        require: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports("Product", productSchema);
