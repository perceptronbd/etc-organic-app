const User = require("../../models/mobileUserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (req, res) => {
  const { mobileNumber, password, name, givenCode } = req.body;

  if (!name || !givenCode || !password || !mobileNumber) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ mobileNumber });
  if (existingUser) {
    res.status(400);
    throw new Error("User with this phone number already exists");
  }

  // Generate a random referral code
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const codeLength = 6;
  let referralCode;
  let codeExists = true;

  while (codeExists) {
    referralCode = "";
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      referralCode += characters[randomIndex];
    }

    // Check if the generated code exists in the database
    const existingReferralUser = await User.findOne({ referralCode });
    if (!existingReferralUser) {
      codeExists = false;
    }
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const referrer = await User.findOne({ referralCode: givenCode });
  if (!referrer) {
    res.status(400);
    throw new Error("Invalid Referral Code");
  }
  // Create new user
  const user = new User({
    mobileNumber,
    password: hashedPassword,
    name,
    referralCode,
    referredBy: referrer._id,
  });

  await user.save();

  // Generate Token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.status(201).json({
    data: {
      _id: user._id,
      name,
      mobileNumber,
      token,
      referralCode: user.referralCode,
      referredBy: user.referredBy,
    },
    message: "User registered successfully",
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { mobileNumber, password } = req.body;

  if (!mobileNumber || !password) {
    const message =
      !mobileNumber && !password
        ? "Please provide both mobile number and password"
        : !mobileNumber
        ? "Please provide mobile number"
        : "Please provide password";
    res.status(400);
    throw new Error(message);
  }

  // Check if user exists with the given mobile number
  const user = await User.findOne({ mobileNumber });

  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  // Generate Token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "35m",
  });

  // Calculate the session expiration time (30 minutes from now)
  const sessionExpirationTime = new Date().getTime() + 30 * 60 * 1000;

  res.status(200).json({
    data: {
      user,
      token,
      sessionExpirationTime,
    },
    message: "User logged in successfully",
  });
});
