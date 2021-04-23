const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const {products} = require("./products");

const BranchesSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    location: { type: String, require: true },
    ailas: { type: String, require: false },
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

// const district9Schema = new schema.mongoose({
//   quantity: { type: Number, require: true },
//   location: { type: String, require: true },
//   ailas: { type: String, require: false },
//   productId: { type: String, require: true },

// });

module.exports = mongoose.model("branches", BranchesSchema);
