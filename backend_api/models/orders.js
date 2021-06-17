const mongoose = require("mongoose");
const { productsSchema } = require("./products");

const ordersSchema = new mongoose.Schema(
  {
    customerName: { type: String, require: false },
    customerPhone: { type: String, require: false },
    customerAddress: { type: String, require: false },
    totalPrices: { type: Number, require: false },
    note: { type: String, require: false },
    status: { type: Boolean, require: false, default: false },
    doneAt: { type: String, require: false },
    userId: { type: String, require: false },
    couponCodeId: { type: mongoose.Schema.Types.ObjectId, ref: "CouponCode" },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    productList: [
      {
        _id: false,
        pro: productsSchema,
        quantity: { type: Number, require: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", ordersSchema);
