const express = require("express");

const couponCodeController = require("../controller/couponCode-controllers");

const router = express.Router();

router.post("/", couponCodeController.createCouponCode);

module.exports = router;
