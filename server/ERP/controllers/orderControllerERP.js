const asyncHandler = require("express-async-handler");
const OrderModel = require('../../models/orderModel');

const Branch = require("../../models/branchModel");
const updateUserCSB = require("../../utils/updateUserCSB");
const mobileUser = require("../../models/mobileUserModel");
const product = require("../../models/productModel");

// const CheckoutModel = require('../../models/checkoutModel');
// const CartModel = require('../../models/cartModel');


exports.getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await OrderModel.find({})
            
           
            console.log(orders);
        if (!orders) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

exports.cancelOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the order by ID
      const order = await OrderModel.findById(id);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Check if the order is in "Pending" status
      if (order.status !== 'Pending') {
        return res.status(400).json({ message: 'Order cannot be canceled as it is not in "Pending" status' });
      }
  
      // Update the order status to "Canceled"
      order.status = 'Canceled';
  
      // Save the updated order
      await order.save();
  
      res.status(200).json({ message: 'Order canceled successfully', order });
    } catch (error) {
      console.error('Error canceling order:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


exports.completeOrder = asyncHandler(async (req, res) => {
    try {
        // Get order ID from the request parameters
        const { id } = req.params;

        // Get customer ID from the request body
        const { customerId, products } = req.body;

        // Find the pending order by order ID
        const order = await OrderModel.findOne({ _id: id, status: 'Pending' });

        if (!order) {
            return res.status(404).json({
                code:   404,
                message: "Pending order not found",
            });
        }

        // Check if the customer ID matches the order's user ID
        if (!order.user.equals(customerId)) {
            return res.status(400).json({
                code:   400,
                message: "Customer ID does not match the order's user ID",
            });
        }

        // Find the branch with ID  123
        const branch = await Branch.findById("658f3e49b2e456d220b116a5");

        if (!branch) {
            return res.status(404).json({
                code:   404,
                message: "Branch not found",
            });
        }

        // Check if the branch has enough stock for all products
        for (const productInfo of products) {
            const { product, quantity } = productInfo;
            // Extract the product ID from the product object
            const productId = product._id;
            const stockItem = branch.stock.find(item => item.product.equals(productId));
            if (!stockItem || stockItem.quantity < quantity) {
                return res.status(400).json({
                    code:   400,
                    message: `Product unavailable. Insufficient stock for product ${productId} in branch   123.`,
                });
            }
            stockItem.quantity -= quantity;
        }

  
        // Update the order status to "Complete"
        order.status = "Complete";
        order.orderDate = new Date(); // Set the order date to the current date and time

        // Save the updated order
        await order.save();

        // Iterate over the products and update the CSB for each product
        for (const productInfo of products) {
            const { product, quantity } = productInfo;
            // Extract the product ID from the product object
            const productId = product._id;
            await updateUserCSB(productId, customerId, quantity);
        }

        await branch.save();

        // Send a success response
        res.status(200).json({
            code:   200,
            order: order,
            message: "Order completed successfully",
        });
    } catch (error) {
        console.error("Error completing order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
