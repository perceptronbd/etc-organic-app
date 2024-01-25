const express = require("express");
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname )
  }
 })
const upload = multer({ storage: storage });


const {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  getUserById,
  deleteUser,
} = require("../controllers/userController.js");
const { checkLogin } = require("../middleware/checkLogin");
const {
  createProduct,
  getAllProducts,
  calculateProductStock,
  addBranch,
} = require("../controllers/productController.js");
const { productManagement } = require("../middleware/authMiddleware.js");

// const protect = require("../middleware/authMiddleware.js");

//User
router.post("/login", loginUser);

//employee
router.post("/employee/register", registerUser);
router.get("/employee/getallusers", getAllUsers);
router.put("/employee/update-users/:id", updateUser);
router.get("/employee/getuserbyid/:id", getUserById);
router.delete("/employee/deleteuser/:id", deleteUser);

//products

router.get(
  "/products/getproducts",
  checkLogin,
  productManagement,
  getAllProducts
);
router.post(
  "/products/createproduct",
  checkLogin,
  productManagement,
  upload.single('image'),
  createProduct
);

// //Sales
// router.post("/sales/purchase", inputSales, (req, res)=>{
//     res.status.json()
// })
// router.post("/sales/retaile", inputSales, (req, res)=>{
//     res.status.json()
// })
// router.post("/sales/wholesale", inputSales, (req, res)=>{
//     res.status.json()
// })

module.exports = router;
