const CouponCode = require("../models/couponcode");
const cc = require("../coupon-code");

const HttpError = require("../error-handle/http-error");

const createCouponCode = async (req, res, next) => {
  let code = cc.generate();
  const createCouponCode = {
    discount: req.body.discount,
    couponCode: code,
    note: req.body.note,
  };
  const newDiscount = new CouponCode(createCouponCode);
  await newDiscount.save();
  res.status(200).json({
    message: "Create Success",
    newDiscount,
  });
};

const deleteCouponCode = async (req, res, next) => {
  const CouponCodeId = req.params.ccid;
  let couponcode;
  try {
    couponcode = await CouponCode.findByIdAndDelete(CouponCodeId);
  } catch (err) {
    const error = new HttpError("Something went wrong, can not delete", 500);
    return next(error);
  }
  if (!couponcode) {
    const error = new HttpError("Could not find any Couponcode", 404);
    return next(error);
  }
  res.status(200).json({ message: "Deleted Couponcode successfull" });
};

const getAllCouponCode = async (req, res, next) => {
  let couponcode;
  try {
    couponcode = await CouponCode.find();
    console.log(couponcode);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, coud not find any CouponCode",
      500
    );
    return next(error);
  }

  if (!couponcode) {
    const error = new HttpError("Could not find any CouponCode", 404);
    return next(error);
  }
  res.status(200).json({ couponcode });
};

const getCouponbyCode = async (req, res, next) => {
  let couponcode;
  const code = req.body.couponCode;
  try {
    couponcode = await CouponCode.findOne({ couponCode: code });
    console.log(couponcode);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, coud not find any CouponCode",
      500
    );
    return next(error);
  }

  if (!couponcode) {
    const error = new HttpError("Could not find any CouponCode", 404);
    return next(error);
  }
  res.status(200).json({ couponcode });
};

module.exports = {
  createCouponCode,
  deleteCouponCode,
  getAllCouponCode,
  getCouponbyCode,
};
