const express = require("express");

const couponCodeController = require("../controller/couponCode-controllers");

const router = express.Router();

router.get("/", couponCodeController.getAllCouponCode);
router.get("/code/",couponCodeController.getCouponbyCode);

router.post("/", couponCodeController.createCouponCode);

router.delete("/:ccid", couponCodeController.deleteCouponCode);

module.exports = router;
