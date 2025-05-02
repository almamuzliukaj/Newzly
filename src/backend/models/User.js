const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
  resetToken: String,
  resetTokenExpiry: Date
});

module.exports = mongoose.model("User", userSchema);
