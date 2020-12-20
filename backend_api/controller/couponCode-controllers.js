const CouponCode = require("../models/couponcode");
const cc = require("../coupon-code");

const createCouponCode = async (req, res, next) => {
  const code = cc.generate;
  const createCouponCode = {
    discount: req.body.discount,
    couponCode: code,
  };
  const newDiscount = new CouponCode(createCouponCode);
  await newDiscount.save();
  res.status(200).json({
    message: "Create Success",
    newDiscount,
  });
};


module.exports = { createCouponCode };
