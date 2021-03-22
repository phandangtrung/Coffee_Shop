const CouponCode = require("../models/couponcode");
const cc = require("../coupon-code");
const moment = require("moment");

const HttpError = require("../error-handle/http-error");

const createCouponCode = async (req, res, next) => {
  let code = cc.generate();
  const createCouponCode = {
    couponCode: code,
    content: req.body.content,
    amount: req.body.amount,
    createAt: req.body.createAt,
    expireDate: req.body.expireDate,
    isActive: req.body.isActive,
  };
  const newDiscount = new CouponCode(createCouponCode);
  await newDiscount.save();
  res.status(200).json({
    message: "Create Success",
    newDiscount,
  });
};

const updateCouponCode = async (req, res, next) => {
  const CouponCodeId = req.params.ccid;
  const updateCouponCode = {
    expireDate: require.body.expireDate,
    isActive: require.body.isActive,
  };
  try {
    couponcode = await CouponCode.findByIdAndUpdate(CouponCodeId, updateCouponCode);
  } catch (err) {
    const error = new HttpError("Something went wrong, can not delete", 500);
    return next(error);
  }
  if (!couponcode) {
    const error = new HttpError("Could not find any Couponcode", 404);
    return next(error);
  }
  res.status(200).json({ message: "Update Couponcode successfull" });
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
  updateCouponCode,
  deleteCouponCode,
  getAllCouponCode,
  getCouponbyCode,
};
