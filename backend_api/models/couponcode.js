const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema({
  note: { type: String, required: false },
  discount: { type: Number, require: false },
  couponCode: { type: String, required: false },
});

module.exports = mongoose.model("CouponCode", couponCodeSchema);
