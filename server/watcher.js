require("dotenv").config();
const mongoose = require("mongoose");
const Reminder = require("./models/reminder");
const Schedule = require("./models/schedule");
const admin = require("firebase-admin");
const servicAccount = require("./messaging-notification.json");
const prioritySchedule = require("./models/prioritySchedule");
const queueModel = require("./models/queue");
const waitList = require("./models/waitlisted");
const slotRefModel = require("./models/slotsRef");
admin.initializeApp({
  credential: admin.credential.cert(servicAccount),
});
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Initialized watcher successfully");
    Schedule.watch([{ $match: { operationType: "delete" } }]).on(
      "change",
      async (data) => {
        console.log({ data: data });
        console.log("inside watch");
        const id = data.documentKey._id;
        const reminder = await Reminder.findOne({ _id: id }).populate({
          path: "userId",
          select: { name: 1, fcmToken: 1 },
        });
        const payload = {
          notification: {
            titile: "Reminder",
            body: reminder.message,
          },
        };
        const options = {
          priority: "high",
        };
        admin
          .messaging()
          .sendToDevice(reminder.userId.fcmToken, payload, options)
          .then((response) => {
            console.log("Notification sent successfuly", response);
          })
          .catch((err) => {
            console.log("Error Occurred while sending push", err);
          });
      }
    );
    prioritySchedule
      .watch([{ $match: { operationType: "delete" } }])
      .on("change", async (data) => {
        const id = data.documentKey._id;
        const reminder = await slotRefModel.findOne({ slotRefId: id });
        const prevSlot = reminder.prevSlot;
        const nextSlot = reminder.nextSlot;
        console.log({ reminder: reminder });
        let checkUnvisitedUsers = await queueModel.aggregate([
          { $match: { date: new Date().toLocaleDateString() } },
          { $unwind: "$slots" },
          { $match: { "slots.time": nextSlot } },
          {
            $project: {
              users: {
                $filter: {
                  input: "$slots.users",
                  as: "user",
                  cond: { $eq: ["$$user.isConfirmed", false] },
                },
              },
            },
          },
        ]);
        console.log({ checkUnvisitedusers: checkUnvisitedUsers[0].users });
        checkUnvisitedUsers[0].users.forEach(async (user) => {
          await waitList.create({
            userId: user.userId,
            name: user.name,
            phone: user.phone,
            isConfirmed: user.isConfirmed,
          });
        });
        let slots = await queueModel.aggregate([
          { $match: { date: new Date().toLocaleDateString() } },
          { $unwind: "$slots" },
          { $match: { "slots.time": nextSlot } },
          {
            $project: {
              "slots.time": "$slots.time",
              "slots.count": { $size: "$slots.users" },
            },
          },
        ]);
        console.log(slots);
        let userCount = slots[0].slots.count;
        if (userCount < 4) {
          await queueModel.updateOne(
            {
              date: new Date().toLocaleDateString(),
              "slots.time": nextSlot,
            },
            {
              $push: { "slots.$.users": bookedSlotObj },
            }
          ); //Fetching Queue
        }
      });
  })
  .catch((err) => {
    console.log("Error occurred while connecting to MongoDB", err);
    process.exit(1);
  });
