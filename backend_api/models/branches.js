const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { products } = require("./products");

const BranchesSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    location: { type: String, require: true },
    alias: { type: String, require: false },
    status: { type: Boolean, default: true },
    listProduct: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: { type: Number, require: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Branch", BranchesSchema);
