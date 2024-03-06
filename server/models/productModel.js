const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  salesPrice: {
    type: Number,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  units: {
    type: Number,
    required: true,
    trim: true,
  },
  csb: {
    type: Number,
    default: 0,
  },

  points: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    
    },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
