const asyncHandler = require("express-async-handler");
const multer = require("multer");
const cloudinary = require("../../utils/cloudinary");

const path = require("path");

const Product = require("../../models/productModel");
const salesModel = require("../../models/salesModel");
const Branch = require("../../models/branchModel");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const createProduct = async (req, res) => {
  try {
    // Check if there's a file in the request
    console.log(req.file);
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // Upload image to Cloudinary
    const image = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "products" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(req.file.buffer);
    });

    const data = {
      productName: req.body.productName,
      category: req.body.category,
      salesPrice: req.body.salesPrice,
      purchasePrice: req.body.purchasePrice,
      units: req.body.units,
      csb: req.body.csb,
      points: req.body.points,
      description: req.body.description,
      image: { public_id: image.public_id, secure_url: image.secure_url },
    };

    // Create a new product instance
    const product = new Product(data);

    // Save the product
    await product.save();

    // Send response
    res.status(201).send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const getAllProducts = async (req, res) => {
  try {
    // Fetch all products
    const allProducts = await Product.find();

    // Find all branches containing each product and add their IDs
    const productsWithBranches = await Promise.all(
      allProducts.map(async (product) => {
        const branches = await Branch.find({ "stock.product": product._id });
        const branchIds = branches.map((branch) => branch._id);

        return {
          ...product.toObject(),
          branchIds, // This will be an array of branch IDs
        };
      })
    );

    res.status(200).json({
      code: 200,
      products: productsWithBranches,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const calculateProductStock = async (req, res) => {
  try {
    // Fetch all products
    const allProducts = await Product.find();

    // Get the total stock for each product and the associated branch IDs
    const productsWithTotalStock = await Promise.all(
      allProducts.map(async (product) => {
        const branches = await Branch.find({ "stock.product": product._id });
        const branchIds = branches.map((branch) => branch._id);

        return {
          _id: product._id,
          productName: product.productName,
          totalStock: product.units,
          branchIds, // Array of branch IDs
        };
      })
    );

    res.status(200).json({
      code: 200,
      products: productsWithTotalStock,
    });
  } catch (error) {
    console.error("Error calculating product stock:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id; // Assuming the product ID is passed as a route parameter

    console.log(productId);

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
const getProductByid = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id; // Assuming the product ID is passed as a route parameter

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error getting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const productId = req.params.id; // Assuming the product ID is passed as a route parameter
    const updatedData = req.body; // Assuming the updated data is sent in the request body
    const file = req.file; // file object provided by Multer

    // Initialize variables for the updated product data
    let updatedProductData = { ...updatedData };

    // Check if a file was uploaded
    if (file) {
      try {
        // Upload image to Cloudinary
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader
            .upload_stream({ folder: "products" }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            })
            .end(file.buffer);
        });

        // Prepare the image object with Cloudinary's public_id and secure_url
        const image = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };

        // Update the image in the product data
        updatedProductData.image = image;
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return res.status(500).json({ message: "Server error" });
      }
    }

    // Update the product with the new data
    const product = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send response
    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = {
  createProduct,
  getAllProducts,
  calculateProductStock,
  getProductByid,
  updateProduct,
  upload,
  deleteProduct,
};
