const express = require("express");
const { getAllStock } = require("../controllers/stockController");
const router = express.Router();

router.get("/stock/getAllStock", getAllStock);

module.exports = router;
