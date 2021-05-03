const mongoose = require("mongoose");
const { productsSchema } = require("./products");

const ordersSchema = new mongoose.Schema(
  {
    customerName: { type: String, require: false },
    customerPhone: { type: String, required: false },
    customerAddress: { type: String, require: false },
    totalPrices: { type: Number, require: false },
    status: { type: Boolean, default: true },
    note: { type: String, required: false },
    doneAt: { type: Date, require: false },
    productList: [
      {
        _id: false,
        pro: productsSchema,
        quantity: { type: Number, require: false },
      },
    ],
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    shipperId: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", ordersSchema);
