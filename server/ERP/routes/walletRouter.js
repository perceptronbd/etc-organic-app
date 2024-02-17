const express = require("express");
const router = express.Router();


const {walletHistoryERP, getWalletHistoryById}  = require("../controllers/walletController");

// const { salesManagement } = require("../middleware/authMiddleware");
// const { checkLogin } = require("../middleware/checkLogin");


router.get("/getwallethistoryERP", walletHistoryERP)
router.get("/getwallethistoryByid/:id", getWalletHistoryById)

module.exports = router;