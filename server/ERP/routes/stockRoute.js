const express = require("express");
const { getAllStock } = require("../controllers/stockController");
const router = express.Router();

router.get("/stocks/get-all-stocks", getAllStock);

module.exports = router;
