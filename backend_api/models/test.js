const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: { type: String, required: false, index: { unique: false } },
});

module.exports = mongoose.model("Test", testSchema);
