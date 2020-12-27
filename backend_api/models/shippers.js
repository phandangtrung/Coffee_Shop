const mongoose = require("mongoose");

const shippersSchema = new mongoose.Schema({
  name: { type: String, required: false, index: { unique: false } },
  identityCard: { type: String, required: false, unique: true },
  imagesShipper: { type: String, required: false },
  phone: { type: String, require: false },
  point: { type: Number, require: false },
  status: { type: Boolean, default: false },
  createAt: { type: String, require: false },
});

module.exports = mongoose.model("Shipper", shippersSchema);
