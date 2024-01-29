const asyncHandler = require("express-async-handler");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config();

// Generate Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, designation, branch, permissions } =
    req.body;

  // Validation
  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !designation ||
    !branch ||
    !permissions
  ) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be up to 6 characters");
  }

  // Check if user email already exists
  const userExists = await User.findOne({ phone });

  if (userExists) {
    res.status(400);
    throw new Error("Phone number already already been registered");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    designation,
    branch,
    permissions,
  });

  //   Generate Token
  const token = generateToken(user._id);

  // Send HTTP-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: "none",
    secure: true,
  });

  if (user) {
    const { _id, name, email, phone, designation, branch, permissions } = user;
    res.status(201).json({
      _id,
      name,
      email,
      phone,
      designation,
      token,
      branch,
      permissions,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//login user

const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  console.log("Received:", phone, password);

  // Validate request
  if (!phone || !password) {
    res.status(400);
    throw new Error("Please provide both phone and password");
  }

  // Check if user exists
  const user = await User.findOne({ phone });
  console.log("User:", user);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Check password
  console.log("Stored Password:", user.password);
  const passwordIsCorrect = await bcrypt.compare(password, user.password);
  console.log("Password Check:", password, passwordIsCorrect);

  // Generate token
  const token = generateToken(user._id);

  if (passwordIsCorrect) {
    // Set HTTP-only cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    const { _id, name, email, phone, designation, branch, permissions } = user;
    res.status(200).json({
      _id,
      name,
      email,
      phone,
      token,
      designation,
      branch,
      permissions,
    });
  } else {
    res.status(401); 
    const message = !passwordIsCorrect ? "Invalid password" : "Invalid phone";
    throw new Error(message);
  }
});

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
});

const updateUser = asyncHandler(async (req, res) => {
  const userID = req.params.id;

  const userData = req.body;

  console.log(userData);

  const updatedUser = await User.findByIdAndUpdate(userID, userData, {
    new: true,
  });
  console.log("Updated user:", updatedUser);

  await updatedUser.save();

  res.status(200).json({ message: "User has been updated" });
});

const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (!userId) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json(user);
});

//create a controller to delete a user
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findByIdAndDelete(userId);

  if (!userId) {
    res.status(404);
    throw new Error("User not found");
  }

  res.status(200).json({ message: "User has been deleted" });
});

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser,
};
