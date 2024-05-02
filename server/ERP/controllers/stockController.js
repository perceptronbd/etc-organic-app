const Branch = require("../../models/branchModel");
const Product = require("../../models/productModel");

const getAllStock = async (req, res) => {
  try {
    const stocks = await Branch.find();
    const products = await Product.find();

    // Constructing the response in the desired format
    const response = products.map((product) => {
      const stock = {};
      let total = 0; // Total quantity for the product across all branches

      stocks.forEach((branch) => {
        const branchStock = branch.stock.find(
          (item) => item.product.toString() === product._id.toString()
        );
        if (branchStock) {
          stock[branch.name] = branchStock.quantity;
          total += branchStock.quantity;
        } else {
          stock[branch.name] = 0; // If product not found in branch stock, set quantity to 0
        }
      });

      stock.total = total; // Add total quantity for the product across all branches

      return {
        productId: product._id,
        productName: product.productName,
        stock: stock,
      };
    });

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = { getAllStock };
