const mongoose = require("mongoose");
const priorityScheduleSchema = new mongoose.Schema({
  endAt: { type: Date, required: true },
});
priorityScheduleSchema.index({ endAt: 1 }, { expireAfterSeconds: 0 });
const prioritySchedule = mongoose.model(
  "prioritySchedule",
  priorityScheduleSchema
);
module.exports = prioritySchedule;
