const mongoose = require("mongoose");
const user = require("../models/user");
const reminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
  message: { type: String, required: true },
  time: { type: Date, required: true },
});

const reminder = mongoose.model("reminder", reminderSchema);
module.exports = reminder;
