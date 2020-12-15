const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, require: false },
  birthday: { type: String, require: false },
  phone: { type: String, require: false },
  isAdmin: { type: Boolean, required: true, default: false },
  isConfirm: { type: Boolean, require: true, default: false },
  isLock: { type: Boolean, require: true, default: false },
});

module.exports = mongoose.model("User", usersSchema);
