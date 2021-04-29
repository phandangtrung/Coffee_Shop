const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: { type: String, require: true },
  alias: { type: String, require: false },
  size_M: { type: Boolean, default: false },
  size_L: { type: Boolean, default: false },
  prices: { type: Number, require: false },
  createAt: { type: String, required: false },
  description: { type: String, require: false },
  imagesProduct: { type: String, require: false },
  reviews: { type: String, require: false },
  ratings: { type: Number, require: false },
  categoryId: { type: String, required: false },
});

const products = mongoose.model("Product", productsSchema);
module.exports = { products, productsSchema };
