const express = require("express");
const { addExpense } = require("../controllers/indirectExpenseController");
const router = express.Router();

router.post("/add-expense", addExpense);

module.exports = router;
