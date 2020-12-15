const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  customerName: { type: String, require: true },
  customerPhone: { type: String, required: true },
  customerAddress: { type: String, require: true },
  totalPrices: { type: Number, require: true },
  status: { type: Boolean, default: false },
  createAt: { type: Date, require: false },
  doneAt: { type: Date, require: false },
  productlist: { type: Array, require: false },
  userId: { type: String, required: false },
});

module.exports = mongoose.model("Order", ordersSchema);
