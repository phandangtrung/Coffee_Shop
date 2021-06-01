const express = require("express");
const { isAdmin, isAuth, isEmployee } = require("../middleware/uilt");
const couponCodeController = require("../controller/couponCode-controllers");

const router = express.Router();

//router.use(isAuth);

//Người dùng xem tất cả các mã giảm giá còn hạn sử dụng
router.get("/discount/user", couponCodeController.getAllCouponCodeByUser);

router.get("/code", couponCodeController.getCouponbyCode);

// router.use(isAdmin, isEmployee);

//admin xem tất cả các mã giảm giá
router.get("/", couponCodeController.getAllCouponCode);

router.post("/", couponCodeController.createCouponCode);

router.delete("/:ccid", couponCodeController.deleteCouponCode);

module.exports = router;
