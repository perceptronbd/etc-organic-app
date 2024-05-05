const express = require("express");
const router = express.Router();

const {
  addSale,
  getAllProductByBranch,
  createMultipleSales,
  getMultipleSalesData,
} = require("../controllers/salesController");

const { salesManagement } = require("../middleware/authMiddleware");
const { checkLogin } = require("../middleware/checkLogin");

router.post("/addsales", checkLogin, salesManagement, addSale);
router.get(
  "/get-all-products-by-branch/:id",
  checkLogin,
  salesManagement,
  getAllProductByBranch
);
router.post(
  "/create-multiple-sales",
  checkLogin,
  salesManagement,
  createMultipleSales
);

router.get("/get-multiple-sales-data", getMultipleSalesData);

module.exports = router;
