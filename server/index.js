require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const schedule = require("node-schedule");
const cookieParser = require("cookie-parser");
const webpush = require("web-push");
const cors = require("cors");
const admin = require("firebase-admin");
const servicAccount = require("./messaging-notification.json");

admin.initializeApp({
  credential: admin.credential.cert(servicAccount),
});

const publicKey =
  "BCCxcB9gbvtDhX3NXyYJ_q0FhDbIwqP0Gds_2_Evfe8blnlyA52_7qVnSkApfeMi1PtbLXniZvizLL6BuTeZfMM";
const privateKey = "Bi62wzcrcBpTf0JQhYRM-vvkpCrSrnbgEb9Q_hvpDIA";
// const vapidKeys = webpush.generateVAPIDKeys();
webpush.setVapidDetails("mailto:test@test.com", publicKey, privateKey);
// console.log(vapidKeys);
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(cors());
app.use(cookieParser());
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((err) => {
    console.log("Error occurred with MongoDB: " + err);
  });

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/", adminRoutes);
app.use("/", userRoutes);
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({ message: "Hello" });
  const payload = JSON.stringify({ title: "U r late" });
  webpush
    .sendNotification(subscription, payload)
    .catch((err) => console.log(err));
});
app.get("/cors", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send({ msg: "This has CORS enabled 🎈" });
});

app.listen(PORT, function () {
  console.log(`listening to ${PORT}`);
});
