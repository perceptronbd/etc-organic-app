const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const multer = require("multer");

//ERP Routes
const userRoute = require("./ERP/routes/ERPuserRoutes");
const branchRoute = require("./ERP/routes/branchRoutes");
const purchaseRoute = require("./ERP/routes/purchaseRoutes");
const salesRoute = require("./ERP/routes/salesRouter");
const ordersRoute = require("./ERP/routes/orderRouter");
const withdrawRoute = require("./ERP/routes/withdrawRoutes");
const walletHistoryRoute = require("./ERP/routes/walletRouter");
const stockRoute = require("./ERP/routes/stockRoute");
const topTenRoute = require("./ERP/routes/topTenRefereRoute");
//Mobile Routes
const mobileUserRoute = require("./Mobile_app/routes/userRoutes");

//error Middlewares
const errorHandler = require("./ERP/middleware/errorMiddleware");
const mobileErrorHandler = require("./Mobile_app/middleware/errorMiddleware");
const incomeRoutes = require("./ERP/routes/incomeRoutes");

// const mobileUserModel = require("./models/mobileUserModel");
// const bcrypt = require("bcrypt");

const app = express();
//middleware

//add CORS
const corsOptions = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//error handler
app.use(errorHandler);

// ERP Routes
app.use("/api", userRoute);
app.use("/api", branchRoute);
app.use("/api", purchaseRoute);
app.use("/api", salesRoute);
app.use("/api", ordersRoute);
app.use("/api", withdrawRoute);
app.use("/api", walletHistoryRoute);
app.use("/api", stockRoute);
app.use("/api", topTenRoute);
app.use("/api", incomeRoutes);

//Mobile Routes
app.use("/mobile", mobileUserRoute);
app.use(mobileErrorHandler);

const PORT = process.env.PORT || 5000;
//const HOST = "192.168.0.105";

app.get("/", (req, res) => {
  // This line has been corrected to use the `json()` method
  res.json({ message: "Hello, world!" });
});

// Serve static files from the "pulic" directory
app.use(express.static("public"));

//connect to db and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(async () => {
//     try {
//       // Check if the user already exists
//       const existingUser = await mobileUserModel.findOne({ mobileNumber: "01958403951"});

//       if (!existingUser) {
//         // Generate a random referral code
//         const characters =
//           "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//         const codeLength = 6;
//         let referralCode = "";
//         for (let i = 0; i < codeLength; i++) {
//           const randomIndex = Math.floor(Math.random() * characters.length);
//           referralCode += characters[randomIndex];
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash("A@T242526", 10);

//         // Create a new user instance
//         const newUser = new mobileUserModel({
//           mobileNumber: "01958403951",
//           password: hashedPassword,
//           name: "Tofail Azad enterprise",
//           referralCode,
//           // Set other fields as needed
//         });

//         // Save the new user to the database
//         await newUser.save();
//         console.log("User created successfully");
//       } else {
//         console.log("User already exists");
//       }
//     } catch (err) {
//       console.error("Error creating user:", err);
//     }

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => console.log(err));
