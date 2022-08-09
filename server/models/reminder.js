const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  message: { type: String, required: true },
  time: { type: Date, required: true },
});

module.exports = mongoose.model("reminder", reminderSchema);
