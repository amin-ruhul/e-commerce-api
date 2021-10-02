const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product Name is Require"],
    trim: true,
    maxLength: [100, "Product Name Must be lower or equal to 100 Character"],
  },
  price: {
    type: Number,
    required: [true, "Product Price is Require"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Product Description is Require"],
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please Select Category"],
  },
  rating: {
    type: Number,
    default: 0,
  },

  stock: {
    type: Number,
    required: [true, "Please Enter Product Stock"],
  },

  numOfReview: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
