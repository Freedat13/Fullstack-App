const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// REMOVE all email fields + do not include email index
module.exports = mongoose.model("User", userSchema);
