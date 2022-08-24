const mongoose = require("mongoose");
const user = require("../models/user");
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
    slots: [
      {
        time: String,
        QRCode: String,
        users: [
          {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
            name: String,
            phone: String,
            isConfirmed: { type: Boolean, default: false },
          },
        ],
        tempQ: [
          {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: user },
            name: String,
            phone: String,
            status: {
              type: String,
              enum: ["Not served", "Being Serve", "Served"],
              default: "Not served",
            },
            token: { type: String, default: null },
            isBeingServe: { type: Boolean, default: false },
            isConfirmed: { type: Boolean, default: false },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const queue = mongoose.model("Queue", queueSchema);
module.exports = queue;
