const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Cart = require("../../models/cartModel");
const Product = require("../../models/productModel");

exports.addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  const cart = await Cart.findOne({ user: userId, order: false });
  if (!cart) {
    // If the user doesn't have a cart or the cart is already ordered, create a new one
    const newCart = new Cart({
      user: userId,
      products: [{ product: product, quantity }],
      totalPrice: product.salesPrice * quantity,
    });
    await newCart.save();
    return res.status(201).json(newCart);
  }

  const existingProductIndex = cart.products.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingProductIndex === -1) {
    // If the product is not in the cart, add it
    cart.products.push({ product: product, quantity });
  } else {
    // If the product is already in the cart, update the quantity
    cart.products[existingProductIndex].quantity += quantity;
  }

  cart.totalPrice += product.salesPrice * quantity;

  await cart.save();

  res.json(cart);
});

exports.removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId, order: false });
  if (!cart) {
    throw new Error("Cart not found");
  }

  const productIdObj = new mongoose.Types.ObjectId(productId);

  // Remove the product from the cart
  cart.products = cart.products.filter(
    (item) => !item.product.equals(productIdObj)
  );

  const savedCart = await cart.save();
  const populatedCart = await Cart.findById(savedCart._id).populate(
    "products.product"
  );

  cart.totalPrice = calculateTotalPrice(populatedCart.products);
  await cart.save();

  res.json({ message: "Product removed from cart successfully", cart });
});

exports.updateCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const newProducts = req.body.products;

  let totalPrice = 0;
  let updatedProducts = [];
  for (const item of newProducts) {
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new Error(`Product with ID ${item.productId} not found`);
    }
    totalPrice += product.salesPrice * item.quantity;
    updatedProducts.push({ product: item.productId, quantity: item.quantity });
  }

  // Find the user's cart where order is false
  let cart = await Cart.findOne({ user: userId, order: false });

  cart.products = updatedProducts;
  cart.totalPrice = totalPrice;

  await cart.save();

  res.json(cart);
});

exports.increaseQuantity = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId, order: false });
  if (!cart) {
    throw new Error("Cart not found");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not exists");
  }

  const productIndex = cart.products.findIndex(
    (item) => item.product.toString() === productId
  );

  if (productIndex === -1) {
    throw new Error("Product not found in cart");
  }
  cart.products[productIndex].quantity++;
  cart.totalPrice += product.salesPrice;

  await cart.save();

  res.json({ message: "Quantity increased successfully", cart });
});

exports.decreaseQuantity = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId, order: false });

  if (!cart) {
    throw new Error("Cart not found");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not exists");
  }

  const productIndex = cart.products.findIndex(
    (item) => item.product.toString() === productId
  );

  if (productIndex === -1) {
    throw new Error("Product not found in cart");
  }

  cart.products[productIndex].quantity--;

  // If the quantity becomes zero or negative, remove the product from the cart
  if (cart.products[productIndex].quantity <= 0) {
    cart.products.splice(productIndex, 1);
  }

  cart.totalPrice -= product.salesPrice;

  await cart.save();

  res.json({ message: "Quantity decreased successfully", cart });
});

function calculateTotalPrice(products) {
  let totalPrice = 0;

  for (const item of products) {
    const productPrice = item.product.salesPrice;

    if (typeof productPrice !== "number" || isNaN(productPrice)) {
      // console.error(`Invalid salesPrice for product ID: ${item.product._id}`);
      continue;
    }

    if (item.quantity <= 0) {
      // console.error(`Invalid quantity for product ID: ${item.product._id}`);
      continue;
    }

    const itemTotalPrice = productPrice * item.quantity;
    // console.log(
    //   `Product ID: ${item.product._id}, Quantity: ${item.quantity}, Item Total Price: ${itemTotalPrice}`
    // );

    totalPrice += itemTotalPrice;
  }

  // console.log(`Total Price: ${totalPrice}`);
  return totalPrice;
}

exports.getTotalPrice = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find the user's cart
  const cart = await Cart.findOne({ user: userId, order: false });

  if (!cart) {
    throw new Error("Cart not found");
  }

  res.json({ totalPrice: cart.totalPrice });
});

exports.getCartDetails = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find the user's cart and populate the 'products' field with product details
  const cart = await Cart.findOne({ user: userId, order: false })
    .populate({
      path: "products.product",
      model: "Product",
    })
    .exec();

  if (!cart) {
    throw new Error("Cart not found");
  }

  res.json(cart);
});
