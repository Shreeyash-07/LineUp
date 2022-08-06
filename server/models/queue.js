const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },
    availableSlots: [
      {
        time: String,
        isFull: { type: Boolean, default: false },
      },
    ],
    tempQueue: [
      {
        name: String,
        phone: String,
      },
    ],
    slots: [
      {
        time: String,
        QRCode: String,
        users: [
          {
            name: String,
            phone: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const queue = mongoose.model("Queue", queueSchema);
module.exports = queue;
