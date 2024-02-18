const asyncHandler = require("express-async-handler");
const Branch = require("../../models/branchModel");
const Sales = require("../../models/salesModel")
const updateUserCSB = require("../../utils/updateUserCSB");
const mobileUser = require("../../models/mobileUserModel");
const product = require("../../models/productModel");

// Add a new sale


const addSale = asyncHandler(async (req, res) => {
    try {
        // Get sale details from the request body
        const { product, customerName, customerNumber, quantity, price, branch, discount, finalPrice } = req.body;

        // Find the user by their mobile number
        const user = await mobileUser.findOne({ mobileNumber: customerNumber });

        if (!user) {
            return res.status(404).json({
                code:  404,
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
                code:  404,
                message: `Branch not found`,
            });
        }

        const stock = branchData.stock;

        if (!stock) {
            // Handle if the stock array is not found in the branch data
            console.error(`Stock array not found in branch ${branch}.`);
            return res.status(404).json({
                code:  404,
                message: `No stock found for branch`,
            });
        }

        const productIndex = stock.findIndex((product) => product.product.equals(newSale.product));

        if (productIndex === -1) {
            // If the product is not found in the stock, handle the error
            console.error(`Product with name ${newSale.product} not found in branch ${branch} stock.`);
            return res.status(404).json({
                code:  404,
                message: `Product not found in branch stock`,
            });
        }

        // If the product is in stock, decrement the quantity
        if (stock[productIndex].quantity >= quantity) {
            stock[productIndex].quantity -= quantity;
        } else {
            // Handle if the requested quantity is greater than the available stock
            console.error(`Insufficient stock for product ${newSale.product} in branch ${branch}.`);
            return res.status(400).json({
                code:  400,
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
            code:  201,
            sale: newSale,
            message: "Sale added successfully",
        });
    } catch (error) {
        console.error("Error adding sale:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = {addSale, updateUserCSB};