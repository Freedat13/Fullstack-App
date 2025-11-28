const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Task", TaskSchema);
