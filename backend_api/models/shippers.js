const mongoose = require("mongoose");

const shippersSchema = new mongoose.Schema({
  name: { type: String, require: false, unique: false },
  imagesShipper: { type: String, required: false },
  phone: { type: String, require: false },
  point: { type: Number, require: false },
  createAt: { type: String, require: false },
});

module.exports = mongoose.model("Shipper", shippersSchema);
