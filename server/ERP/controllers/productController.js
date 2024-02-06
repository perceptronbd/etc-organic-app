const asyncHandler = require("express-async-handler");
const multer = require('multer');

const path = require('path');

const Product = require("../../models/productModel");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname )
  }
 })
 
 


const createProduct = async (req, res) => {
  try {
    // Handle file upload

    // console.log(req.file);
    if (!req.file) throw new Error('No file received')
 
    // Create a new product instance
    const product = new Product({
      productName: req.body.productName,
      category: req.body.category,
      salesPrice: req.body.salesPrice,
      purchasePrice: req.body.purchasePrice,
      units: req.body.units,
      csb: req.body.csb,
      points: req.body.points,
      description: req.body.description,
      image: req.file
    });
 
    // Save the product
    await product.save();
 
    // Send response
    res.status(201).send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
 };


const getAllProducts = asyncHandler(async(req,res) => {
    const allProducts = await Product.find({})
    res.status(200).json(allProducts)
  })


  const calculateProductStock = asyncHandler(async (req, res) => {
    const products = await Product.find();

    const productsWithTotalStock = products.map(product => ({
        _id: product._id,
        productName: product.productName,
        totalStock: product.units
    }));

    if(!productsWithTotalStock){
        res.status(500);
        throw new Error("Couldn't calculate weight")
    }

    res.status(200).json(productsWithTotalStock);
});


const getProductByid = asyncHandler(async (req, res) => {
  try {
     const productId = req.params.id; // Assuming the product ID is passed as a route parameter
 
     const product = await Product.findById(productId);
 
     if (!product) {
       return res.status(404).json({ message: 'Product not found' });
     }
 
     res.status(200).json(product);
  } catch (error) {
     console.error('Error getting product:', error);
     res.status(500).json({ message: 'Internal server error' });
  }
 });


const updateProduct = asyncHandler(async (req, res) => {

  //Second PR 
 try {
    const productId = req.params.id; // Assuming the product ID is passed as a route parameter
    const updatedData = req.body; // Assuming the updated data is sent in the request body
    const file = req.file; // file object provided by Multer

    // Update the product with the new data and file
    const product = await Product.findByIdAndUpdate(productId, {...updatedData, image: file}, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
 } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
 }
});
module.exports = {
    createProduct,
    getAllProducts,
    calculateProductStock,
    getProductByid,
    updateProduct
    
};