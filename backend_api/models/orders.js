const mongoose = require("mongoose");
const { productsSchema } = require("./products");

const ordersSchema = new mongoose.Schema({
  customerName: { type: String, require: false },
  customerPhone: { type: String, required: false },
  customerAddress: { type: String, require: false },
  totalPrices: { type: Number, require: false },
  status: { type: Boolean, default: true },
  note: { type: String, required: false },
  createAt: { type: Date, require: false },
  doneAt: { type: Date, require: false },
  productList: [
    {
      _id: false,
      pro: productsSchema,
      quantity: { type: Number, require: false },
    },
  ],
  branchId: { type: String, required: false },
  userId: { type: String, required: false },
  shipperId: { type: String, required: false },
});

module.exports = mongoose.model("Order", ordersSchema);
