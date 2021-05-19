const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    email: { type: String, require: false },
    content: { type: String, required: false },
    rating: { type: Number, required: false },
    productId: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentsSchema);
