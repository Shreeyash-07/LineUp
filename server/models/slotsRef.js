const mongoose = require("mongoose");
const prioritySchedule = require("../models/prioritySchedule");
const slotRefSchema = new mongoose.Schema({
  slotRefId: { type: mongoose.Schema.Types.ObjectId, ref: prioritySchedule },
  prevSlot: { type: String, required: true },
  nextSlot: { type: String, required: true },
});

const slotRef = mongoose.model("slotRef", slotRefSchema);
module.exports = slotRef;
