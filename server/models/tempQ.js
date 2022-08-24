const { default: mongoose, mongo } = require("mongoose");

const tempQScheam = new mongoose.Schema({
  time: { type: String, required: true },
  user: [
    {
      name: String,
      phone: String,
      token: String,
      status: String,
      isBeingServe: { type: Boolean, default: false },
      isConfirmed: { type: Boolean, default: false },
    },
  ],
});
const tempq = mongoose.model("tempq", tempQScheam);
module.exports = tempq;
