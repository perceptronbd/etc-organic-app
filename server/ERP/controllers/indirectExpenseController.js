const Expense = require("../../models/indirectExpenseModel");

const addExpense = async (req, res) => {
  try {
    const { officeRent, utility, salary, inputTitle, inputCost } = req.body;

    // Basic validation
    if (
      typeof officeRent !== "number" ||
      typeof utility !== "number" ||
      typeof salary !== "number" ||
      typeof inputTitle !== "string" ||
      typeof inputCost !== "number"
    ) {
      return res.status(400).json({
        message:
          "Invalid data. Please ensure all required fields are properly formatted.",
      });
    }

    // Create a new Expense instance with the provided data
    const newExpense = new Expense({
      officeRent,
      utility,
      salary,
      inputTitle,
      inputCost,
    });

    // Save the new record to the database
    await newExpense.save();

    // Return a success response
    res.status(201).json({
      message: "Expense created successfully",
      data: newExpense,
    });
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({
      message:
        "An error occurred while creating the expense. Please try again later.",
    });
  }
};

module.exports = { addExpense };
