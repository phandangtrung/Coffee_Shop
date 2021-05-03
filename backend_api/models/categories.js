const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    alias: { type: String, require: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categoriesSchema);
