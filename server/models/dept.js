const mongoose = require("mongoose");
const DeptSchema = new mongoose.Schema({
  HospitalName: {
    type: String,
    required: true,
  },
  DepartmentName: [
    {
      type: String,
      required: true,
    },
  ],
  Doctors: [
    {
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
  ],
});
