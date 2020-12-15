const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  alias: { type: String, require: false },
  createAt: { type: String, require: false },
});

module.exports = mongoose.model("Category", categoriesSchema);
