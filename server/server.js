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
const withdrawRoute = require("./ERP/routes/widrawRoutes");
const walletHistoryRoute = require("./ERP/routes/walletRouter");

//Mobile Routes
const mobileUserRoute = require("./Mobile_app/routes/userRoutes");

//error Middlewares
const errorHandler = require("./ERP/middleware/errorMiddleware");
const mobileErrorHandler = require("./Mobile_app/middleware/errorMiddleware");

const app = express();
//middleware

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

//Mobile Routes
app.use("/mobile", mobileUserRoute);
app.use(mobileErrorHandler);

const PORT = process.env.PORT || 5000;
const HOST = "192.168.0.110";

app.get("/", (req, res) => {
  // This line has been corrected to use the `json()` method
  res.json({ message: "Hello, world!" });
});

// Serve static files from the "pulic" directory
app.use(express.static("public"));

//connect to db and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
