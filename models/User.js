const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: [30, "Name can not exceed 30 character"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    virtual: [validator.isEmail, "Please Enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be or grater then 6 character"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "User",
  },
  resetPasswordToken: String,
  restPasswordExpire: Date,
});

module.exports = mongoose.model("User", userSchema);
