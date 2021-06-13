const moment = require("moment");
const mongoose = require("mongoose");

const couponCodeSchema = new mongoose.Schema(
  {
    couponCode: { type: String, required: true},
    content: { type: String, require: false },
    percentage: { type: Number, require: true },
    amount: { type: Number, require: false },
    startTime: { type: Date, require: false },
    endTime: { type: Date, require: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CouponCode", couponCodeSchema);
