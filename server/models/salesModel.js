const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = require("../models/productModel");
const Branch = require("../models/branchModel");

const salesSchema = new Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      required: false,
    },
    multipleProduct: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: Product,
          required: false,
        },
        quantity: { type: Number, required: false },
        price: { type: Number, required: false },
      },
    ],
    customerName: {
      type: String,
      required: true,
    },
    customerNumber: {
      type: Number,
      required: true,
    },
    customerId: {
      type: String,
    },
    quantity: {
      type: Number,
      required: false,
      min: 1,
    },
    price: {
      type: Number,
      required: false,
      min: 0,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Branch,
      required: true,
    },
    discount: {
      type: Number,
      min: 0,
    },
    finalPrice: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("salesModel", salesSchema);
