const CouponCode = require("../models/couponcode");
const cc = require("../coupon-code");
const HttpError = require("../error-handle/http-error");
const { ISO_8601 } = require("moment");

const createCouponCode = async (req, res, next) => {
  let code = cc.generate();
  const createCouponCode = {
    couponCode: code,
    content: req.body.content,
    percentage: req.body.percentage,
    amount: req.body.amount,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
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
    content: req.body.content,
    endTime: require.body.endTime,
    percentage: req.body.percentage,
    amount: req.body.amount,
  };
  try {
    couponcode = await CouponCode.findByIdAndUpdate(
      CouponCodeId,
      updateCouponCode
    );
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

const getAllCouponCodeByUser = async (req, res, next) => {
  let couponcode;
  let currentDate = new Date();
  //let end = new Date('2021-04-04T11:46:46.000Z').getMinutes();
  //console.log(end)
  try {
    couponcode = await CouponCode.find({
      startTime: {$lte: currentDate},
      endTime: {$gte: currentDate}
    });
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
  getAllCouponCodeByUser,
};
