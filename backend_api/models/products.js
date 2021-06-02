const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    alias: { type: String, require: false },
    size_M: { type: Number, default: false },
    size_L: { type: Number, default: false },
    prices: { type: Number, require: false },
    description: { type: String, require: false },
    imagesProduct: { type: String, require: false },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

const products = mongoose.model("Product", productsSchema);
module.exports = { products, productsSchema };
