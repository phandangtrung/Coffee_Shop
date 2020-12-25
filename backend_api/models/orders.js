const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
  customerName: { type: String, require: false, unique: false },
  customerPhone: { type: String, required: false },
  customerAddress: { type: String, require: false },
  totalPrices: { type: Number, require: false },
  status: { type: Boolean, default: false },
  note: { type: String, required: false },
  createAt: { type: Date, require: false },
  doneAt: { type: Date, require: false },
  productlist: { type: Array, require: false },
  userId: { type: String, required: false },
  shipperId: { type: String, required: false },
});

module.exports = mongoose.model("Order", ordersSchema);
