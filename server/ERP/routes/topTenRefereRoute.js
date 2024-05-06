const express = require("express");
const { topTenReferer } = require("../../CommonControllers/topTenReferer");

const router = express.Router();

router.get("/top-ten-referer", topTenReferer);

module.exports = router;
