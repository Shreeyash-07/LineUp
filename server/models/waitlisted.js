const mongoose = require("mongoose");
const user = require("../models/user");
const waitlistedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
  name: String,
  phone: String,
  isConfirmed: { type: Boolean, default: false },
});

const waitList = mongoose.model("waitlist", waitlistedSchema);
module.exports = waitList;
