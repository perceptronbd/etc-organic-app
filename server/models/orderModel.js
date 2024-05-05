const mongoose = require("mongoose");
const mobileUser = require("./mobileUserModel");
const cartModel = require("./cartModel");
const checkoutModel = require("./checkoutModel");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: mobileUser,
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: cartModel,
    required: true,
  },
  checkoutDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: checkoutModel,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
    // Complete Cancelled
  },
  orderDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Order", orderSchema);
