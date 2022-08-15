const mongoose = require("mongoose");
const scheduleSchema = new mongoose.Schema({
  sendAt: { type: Date, required: true },
});
scheduleSchema.index({ sendAt: 1 }, { expireAfterSeconds: 0 });
const schedule = mongoose.model("schedule", scheduleSchema);
module.exports = schedule;
