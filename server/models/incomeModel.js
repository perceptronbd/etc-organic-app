const mongoose = require("mongoose");

// Define the Income schema
const IncomeSchema = new mongoose.Schema({
  incomeTitle: {
    type: String, // Expected to be a string
    required: true, // This field must be provided
    trim: true, // Trims leading/trailing whitespace
  },
  amount: {
    type: Number, // Expected to be a numeric value
    required: true, // This field must be provided
    min: 0, // Ensures a non-negative amount
  },
  created_at: {
    type: Date, // Tracks when the record was created
    default: Date.now, // Defaults to the current date and time
  },
});

// Create the model
const Income = mongoose.model("Income", IncomeSchema);

module.exports = Income;
