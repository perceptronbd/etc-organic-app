const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const Branch = require("../models/branchModel");

// @desc    Get all products
// @route   GET /api/products
// @access  Public")

//NOTE: getAllProducts for mobile app only
//route: /api/getAllproducts

exports.getAllProducts = asyncHandler(async (req, res) => {
  try {
      // Replace the hardcoded branch ID with your actual branch ID
      const branchId = '658f3e49b2e456d220b116a5';

      // Find the branch by ID and populate the products field
      const branch = await Branch.findById(branchId).populate('stock');
      // const productDetails  = await Branch.findById(branchId).populate('stock');

      // console.log(branch);
      
      if (!branch) {
          return res.status(404).json({ message: 'Branch not found' });
      }

      // Filter products with non-zero quantity
      const availableProducts = branch.stock.filter((product) => product.quantity > 0);

    //   console.log(availableProducts);

      const productIds = availableProducts.map((product) => product.product)
    
      // Find the products by their IDs

      const foundProducts = await Product.find({ _id: { $in: productIds } });

      console.log(foundProducts);
    
      res.status(200).json(foundProducts);
  } catch (error) {
      console.error('Error getting products:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});