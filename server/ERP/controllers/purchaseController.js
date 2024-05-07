const asyncHandler = require("express-async-handler");

const Product = require("../../models/productModel");
const Branch = require("../../models/branchModel");

const Purchase = require("../../models/purchaseModel");

const addPurchase = async (req, res) => {
  try {
    // Get purchase details from the request body
    const {
      product,
      supplierName,
      supplierNumber,
      quantity,
      totalPurchasingPrice,
      branch,
      transportationCost,
    } = req.body;

    // Create a new purchase record
    const newPurchase = new Purchase({
      product,
      supplierName,
      supplierNumber,
      quantity,
      totalPurchasingPrice,
      branch,
      transportationCost,
    });

    // Save the purchase record to the database
    await newPurchase.save();

    // Update stock in the branch for the purchased product

    const branchData = await Branch.findById(branch);

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
      product.product.equals(newPurchase.product)
    );

    if (productIndex === -1) {
      // If the product is not found in the stock, add it
      stock.push({ product: newPurchase.product, quantity });
    } else {
      // If the product is already in the stock, update the quantity
      stock[productIndex].quantity += quantity;
    }

    const updatedBranch = await Branch.findByIdAndUpdate(
      branch,
      { stock },
      { new: true }
    );

    console.log(updatedBranch);

    // Send a success response
    res.status(201).json({
      code: 201,
      purchase: newPurchase,
      message: "Purchase added successfully",
    });
  } catch (error) {
    console.error("Error adding purchase:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllPurchases = async (req, res) => {
  try {
    // Fetch all purchase records
    const purchases = await Purchase.find();

    res.status(200).json({
      code: 200,
      data: purchases,
      message: "All purchase records retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getallPurchaseReport = async (req, res) => {
  try {
    // Fetch all purchase records
    const purchases = await Purchase.find();

    // Add a new field 'purchaseAmount' to each purchase
    const purchasesWithAmount = purchases.map((purchase) => {
      // Calculate the purchase amount
      const purchaseAmount =
        purchase.totalPurchasingPrice + purchase.transportationCost;

      // Return the updated purchase with the new field
      return {
        ...purchase.toObject(), // Convert mongoose object to plain object
        purchaseAmount, // Add the calculated field
      };
    });

    res.status(200).json({
      code: 200,
      data: purchasesWithAmount,
      message: "All purchase records retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addPurchase, getAllPurchases, getallPurchaseReport };
