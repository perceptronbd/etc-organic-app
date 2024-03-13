const express = require("express");
const router = express.Router();
const userController = require("../controllers/mobileUserController");
const profileUpdateController = require("../controllers/profileUpdateController");
const cartController = require("../controllers/cartController");
const orderController = require("../controllers/orderController");
const redeemCSB = require("../controllers/redeemCSBtotaka");
const getCSBandTakaController = require("../controllers/getCSBandTakaController");
const bankController = require("../controllers/bankController");
const commonColtroller = require("../../CommonControllers/getProducts");
const withdrawController = require("../controllers/withdrawController");
const walletHistoryController = require("../controllers/walletHistoryController");
const authenticateUser = require("../middleware/authMiddleware");

const {upload} = require("../controllers/profileUpdateController");


//user
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post(
  "/update-image",
  authenticateUser,
  upload.single("image"),
  profileUpdateController.uploadProfileImage
);

//Update the route for national image handling
router.post(
  "/update-national-image",
  upload.single("nationalIdImage"),
  authenticateUser,
  profileUpdateController.uploadNationalImage
);

// Update the route for district and division handling
router.post(
  "/update-district-and-division",
  authenticateUser,
  profileUpdateController.handleDistrictAndDivision
);
router.get(
  "/get-profile",
  authenticateUser,
  profileUpdateController.getProfileDetails
);

//cart
router.post("/add-to-cart", authenticateUser, cartController.addToCart);
router.post(
  "/remove-from-cart",
  authenticateUser,
  cartController.removeFromCart
);
router.post(
  "/increase-quantity",
  authenticateUser,
  cartController.increaseQuantity
);
router.post(
  "/decrease-quantity",
  authenticateUser,
  cartController.decreaseQuantity
);
router.post("/update-cart", authenticateUser, cartController.updateCart);
router.get("/get-cart-price", authenticateUser, cartController.getTotalPrice);
router.get(
  "/get-cart-details",
  authenticateUser,
  cartController.getCartDetails
);

//order
router.post("/place-order", authenticateUser, orderController.placeOrder);
router.get(
  "/get-user-order-details",
  authenticateUser,
  orderController.getOrderDetails
);

//wallet
router.post("/redeemCSB", authenticateUser, redeemCSB.redeemCSBtoTaka);
router.post("/withdraw", authenticateUser, withdrawController.createWithdraw);
router.get(
  "/getwithdraw",
  authenticateUser,
  withdrawController.getWithdrawRequests
);
router.get(
  "/getwallethistory",
  authenticateUser,
  walletHistoryController.walletHistory
);
router.get(
  "/get-csb-and-taka",
  authenticateUser,
  getCSBandTakaController.getCSBandTaka
);

//bank
router.post("/addBank", authenticateUser, bankController.createBank);
router.get("/getBank", authenticateUser, bankController.fetchBanksByUser);
router.delete("/deleteBank", authenticateUser, bankController.deleteBank);

//common
router.get("/get-products", commonColtroller.getAllProducts);


module.exports = router;
