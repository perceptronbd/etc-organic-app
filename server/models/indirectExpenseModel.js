const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  officeRent: {
    type: Number, // Expected to be a numeric value
    required: true,
    min: 0,
  },
  utility: {
    type: Number, // Expected to be a numeric value
    required: true,
    min: 0,
  },
  salary: {
    type: Number, // Expected to be a numeric value
    required: true,
    min: 0,
  },
  inputTitle: {
    type: String, // Expected to be a string
    required: true,
  },
  inputCost: {
    type: Number, // Expected to be a numeric value
    required: true,
    min: 0,
  },
  created_at: {
    type: Date, // Tracks when the record was created
    default: Date.now, // Defaults to the current date and time
  },
});

// Create the model
const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
