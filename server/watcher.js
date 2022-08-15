require("dotenv").config();
const mongoose = require("mongoose");
const Reminder = require("./models/reminder");
const Schedule = require("./models/schedule");
const admin = require("firebase-admin");
const servicAccount = require("./messaging-notification.json");

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
  })
  .catch((err) => {
    console.log("Error occurred wgile connecting to MongoDB", err);
    process.exit(1);
  });
