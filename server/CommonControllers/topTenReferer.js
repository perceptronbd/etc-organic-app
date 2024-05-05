const mobileUserModel = require("../models/mobileUserModel");

const topTenReferer = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await mobileUserModel.find();

    // If no users are found, return an empty array with a success message
    if (!users || users.length === 0) {
      return res.status(200).json({
        message: "No users found",
        users: [],
      });
    }

    const usersFiltered = users.map((user) => ({
      name: user.name,
      number: user.mobileNumber,
      csb: user.CSB,
      referNumber: user.referNumber,
    }));

    res.status(200).json({
      message: "All users fetched successfully",
      users: usersFiltered,
    });

    // Return the list of users
    res.status(200).json({
      message: "All users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({
      message: "An error occurred while fetching users",
    });
  }
};

module.exports = { topTenReferer };
