const moment = require("moment");
const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
  couponCode: { type: String, required: false, unique: true },
  content: { type: String, require: false },
  //isPercent: { type: Boolean, require: false, default: true },
  createAt: {type: Date, default: Date.now},
  amount: { type: Number, require: false },
  expireDate: { type: Date, require: false },
  isActive: { type: Boolean, require: false, default: true },
});

module.exports = mongoose.model("CouponCode", couponCodeSchema);
