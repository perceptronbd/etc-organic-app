const express = require("express");
const router = express.Router();

const { productManagement } = require("../middleware/authMiddleware");
const { checkLogin } = require("../middleware/checkLogin");



const {addPurchase,getAllPurchases}  = require("../controllers/purchaseController");

router.post("/addPurchase",checkLogin,productManagement,addPurchase)
router.get("/getallPurchase",checkLogin, getAllPurchases)


module.exports = router;