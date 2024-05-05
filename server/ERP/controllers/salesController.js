const asyncHandler = require("express-async-handler");
const Branch = require("../../models/branchModel");
const Sales = require("../../models/salesModel");
const updateUserCSB = require("../../utils/updateUserCSB");
const mobileUser = require("../../models/mobileUserModel");
const product = require("../../models/productModel");
const Product = require("../../models/productModel");
const { default: mongoose } = require("mongoose");
const salesModel = require("../../models/salesModel");

// Add a new sale

const addSale = asyncHandler(async (req, res) => {
  try {
    // Get sale details from the request body
    const {
      product,
      customerName,
      customerNumber,
      quantity,
      price,
      branch,
      discount,
      finalPrice,
    } = req.body;

    // Find the user by their mobile number
    const user = await mobileUser.findOne({ mobileNumber: customerNumber });

    if (!user) {
      return res.status(404).json({
        code: 404,
        message: "User not found",
      });
    }

    // Create a new sale record
    const newSale = new Sales({
      product,
      customerName,
      customerNumber,
      customerId: user._id, // Use the _id from the user object
      quantity,
      price,
      branch,
      discount,
      finalPrice,
    });

    // Find the branch by its ID
    const branchData = await Branch.findById(branch);

    if (!branchData) {
      // Handle if the branch is not found
      console.error(`Branch with ID ${branch} not found.`);
      return res.status(404).json({
        code: 404,
        message: `Branch not found`,
      });
    }

    const stock = branchData.stock;

    if (!stock) {
      // Handle if the stock array is not found in the branch data
      console.error(`Stock array not found in branch ${branch}.`);
      return res.status(404).json({
        code: 404,
        message: `No stock found for branch`,
      });
    }

    const productIndex = stock.findIndex((product) =>
      product.product.equals(newSale.product)
    );

    if (productIndex === -1) {
      // If the product is not found in the stock, handle the error
      console.error(
        `Product with name ${newSale.product} not found in branch ${branch} stock.`
      );
      return res.status(404).json({
        code: 404,
        message: `Product not found in branch stock`,
      });
    }

    // If the product is in stock, decrement the quantity
    if (stock[productIndex].quantity >= quantity) {
      stock[productIndex].quantity -= quantity;
    } else {
      // Handle if the requested quantity is greater than the available stock
      console.error(
        `Insufficient stock for product ${newSale.product} in branch ${branch}.`
      );
      return res.status(400).json({
        code: 400,
        message: `Insufficient stock for product in branch`,
      });
    }

    // Save the updated branch data
    const updatedBranch = await Branch.findByIdAndUpdate(
      branch,
      { stock },
      { new: true }
    );

    // Update user CSB (assuming this function is defined elsewhere)
    updateUserCSB(product, user._id, quantity);

    // Save the new sale record
    await newSale.save();

    // Send a success response
    res.status(201).json({
      code: 201,
      sale: newSale,
      message: "Sale added successfully",
    });
  } catch (error) {
    console.error("Error adding sale:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getAllProductByBranch = async (req, res) => {
  try {
    const { id } = req.params; // Branch ID from the request parameters
    const branch = await Branch.findById(id);

    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }

    const branchProducts = branch.stock || []; // Ensuring this is at least an empty array
    const productIds = branchProducts.map((stock) => stock.product);

    // Fetch product details to obtain product names
    const productDetails = await Product.find({ _id: { $in: productIds } });

    // Create a mapping from product ID to product name
    const productNameMap = productDetails.reduce((acc, product) => {
      acc[product._id.toString()] = product.productName;
      return acc;
    }, {});

    // Construct response with product ID and product name
    const productsWithNames = branchProducts.map((stock) => ({
      productId: stock.product,
      productName: productNameMap[stock.product] || "Unknown Product",
    }));

    res.status(200).json({
      branchName: branch.name,
      products: productsWithNames,
    });
  } catch (error) {
    console.error("Error fetching product names:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createMultipleSales = async (req, res) => {
  try {
    const {
      customerName,
      customerNumber,
      customerId,
      branchId,
      discount,
      finalPrice,
      multipleProduct,
    } = req.body;

    // Validate required fields
    if (
      !customerName ||
      !customerNumber ||
      !branchId ||
      !Array.isArray(multipleProduct)
    ) {
      return res.status(400).json({
        message: "Missing required fields or 'multipleProduct' is not an array",
      });
    }

    // Validate multipleProduct content
    for (const item of multipleProduct) {
      if (!item.product && !mongoose.isValidObjectId(item.product)) {
        return res.status(400).json({
          message: "Invalid or missing productId in multipleProduct",
        });
      }
      if (typeof item.quantity !== "number" && item.quantity <= 0) {
        return res.status(400).json({
          message: "Quantity must be a positive number",
        });
      }
      if (typeof item.price !== "number" && item.price < 0) {
        return res.status(400).json({
          message: "Price must be a non-negative number",
        });
      }
    }

    // Create a new sales document
    const newSale = new Sales({
      customerName,
      customerNumber,
      customerId,
      branch: branchId,
      discount,
      finalPrice,
      multipleProduct, // Ensure this is properly validated
    });

    // Save the new sale to the database

    // Apply CSB updates and wallet history for each product in multipleProduct
    for (const item of multipleProduct) {
      const { product, quantity } = item;
      console.log(product, quantity, customerId);
      await updateUserCSB(product, customerId, quantity);
    }
    await newSale.save();
    // Return success response
    res.status(201).json({
      message: "Sales record created successfully",
      sale: newSale,
    });
  } catch (error) {
    console.error("Error creating sales record:", error);
    res.status(500).json({
      message: "An error occurred while creating the sales record",
    });
  }
};

const getAllSales = async (req, res) => {
  try {
    // Fetch all sales and populate related fields
    const salesRecords = await salesModel
      .find()
      .populate("branch")
      .populate("multipleProduct.product");

    // Map the data to get only the required fields
    const salesSummary = salesRecords.map((sale) => ({
      customerId: sale.customerId,
      customerName: sale.customerName,
      customerNumber: sale.customerNumber,
      finalPrice: sale.finalPrice,
      branch: sale.branch.name,
      address: sale.address,
    }));

    // Return the sales data
    res.status(200).json({
      message: "All sales records fetched successfully",
      sales: salesSummary,
    });
  } catch (error) {
    console.error("Error fetching sales records:", error);
    res.status(500).json({
      message: "An error occurred while fetching the sales records",
    });
  }
};

module.exports = {
  addSale,
  updateUserCSB,
  getAllProductByBranch,
  createMultipleSales,
  getAllSales,
};
