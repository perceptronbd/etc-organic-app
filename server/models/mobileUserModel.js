const mongoose = require("mongoose");

const mobileUserSchema = new mongoose.Schema({
  mobileNumber: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  referralCode: { type: String, unique: true },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: "MobileUser" },
  CSB: { type: Number, default: 0 },
  totalCSB: { type: Number, default: 0 },
  referNumber: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  taka: { type: Number, default: 0 },
});

module.exports = mongoose.model("MobileUser", mobileUserSchema);
