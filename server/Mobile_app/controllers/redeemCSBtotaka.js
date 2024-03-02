const MobileUser = require("../../models/mobileUserModel");

async function redeemCSBtoTaka(req, res) {
  try {
    const user = req.user._id;

    const existingUser = await MobileUser.findById(user);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let { totalCSB, CSB, taka } = existingUser;

    if (totalCSB < 45) {
      return res
        .status(400)
        .json({ message: "Total CSB must be greater than 45" });
    }

    if (CSB === 0) {
      return res.status(400).json({ message: "CSB cannot be zero" }); // Error for zero CSB
    }

    if (CSB !== 0) {
      // Convert CSB to Taka (use the actual conversion rate)
      const conversionRate = 1; // Replace with the correct value
      const convertedTaka = taka + (CSB * conversionRate);

      // Update the user model
      const updatedUser = await MobileUser.findOneAndUpdate(
        { _id: user },
        { $set: { taka: convertedTaka, CSB: 0 } },
        { new: true }
      );

      return res.json({ CSB: updatedUser.CSB, taka: updatedUser.taka });
    } else {
      return res.json({ CSB: existingUser.CSB, taka: existingUser.taka });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { redeemCSBtoTaka };
