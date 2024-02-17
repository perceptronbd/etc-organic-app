const asyncHandler = require("express-async-handler");
const OrderModel = require('../../models/orderModel');
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