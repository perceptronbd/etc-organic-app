const Income = require("../../models/incomeModel");

const addIncome = async (req, res) => {
  try {
    // Extract fields from the request body
    const { incomeTitle, amount } = req.body;

    if (
      typeof incomeTitle !== "string" ||
      typeof amount !== "number" ||
      amount < 0
    ) {
      return res.status(400).json({
        message:
          "Invalid data. Please ensure all required fields are properly formatted.",
      });
    }

    // Create a new Income instance with the provided data
    const newIncome = new Income({ incomeTitle, amount });

    // Save the new record to the database
    await newIncome.save();

    // Return a success response
    res.status(201).json({
      message: "Income created successfully",
      data: newIncome,
    });
  } catch (error) {
    console.error("Error creating income:", error);
    res.status(500).json({
      message:
        "An error occurred while creating the income. Please try again later.",
    });
  }
};

module.exports = { addIncome };
