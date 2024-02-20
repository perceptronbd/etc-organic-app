const express = require("express");
const router = express.Router();

const {getAllWithdrawRequests,confirmWithdraw} = require("../controllers/withdrawRequestController");

router.get("/getWithdrawRequests", getAllWithdrawRequests);
router.put("/confirmWithdrawRequest/:id",confirmWithdraw);


module.exports = router;