const userModel = require("../models/user");
const queueModel = require("../models/queue");
const reminderModel = require("../models/reminder");
const scheduleModel = require("../models/schedule");
const { createError } = require("../utils/error");
const QRCode = require("qrcode");
exports.signup = async (req, res, next) => {
  const { name, email, password, phone, fcmToken } = req.body;
  // let user = await userModel.findOne({email:email}).select('+password')

  let existingEmail = await findEmailDuplicates(email, res);
  if (existingEmail === null) {
    try {
      const user = await userModel.create({
        name,
        email,
        password,
        phone,
        fcmToken,
      });
      const token = await user.getSignedToken();
      res.status(201).json({ success: true, token });
    } catch (error) {
      next(error);
    }
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email: email }).select("+password");
  if (!user) {
    // res.status(422).json({message:'User not found'});
    return next(createError(422, "User not found"));
  } else {
    try {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        // res.status(401).json({message:'Credentials are incorrect'});
        return next(createError(401, "Credentials are incorrect"));
      } else {
        sendToken(user, 200, res);
        console.log(user._id);
      }
    } catch (error) {
      // res.status(500).json({success:false,desc:'Error'+error})
      next(error);
    }
  }
};

exports.getslots = async (req, res, next) => {
  queueModel.find(
    {
      date: "10/7/2022",
      "availableSlots.isFull": { $eq: 0 },
    },
    { _id: 0, date: 0, slots: 0, __v: 0 },
    function (err, timeSlots) {
      if (err) {
        res.json({ error: err });
      }
      var slots = timeSlots[0].availableSlots;
      // var timeArr = [];
      // obj.forEach((element) => {
      //   if (element.isFull === false) {
      //     timeArr.push(element.time);
      //   }
      // });
      const userObj = {
        name: req.rootUser.name,
        phone: req.rootUser.phone,
      };
      res.status(200).json({ slots, userObj });
    }
  );
};

exports.bookslot = async (req, res) => {
  let { slot, name, phone } = req.body;
  let bookedSlotObj = { name: name, phone: phone };
  await queueModel.updateOne(
    {
      date: "10/7/2022",
      "slots.time": slot,
    },
    {
      $push: { "slots.$.users": bookedSlotObj },
    }
  ); //Fetching Queue

  let slots = await queueModel.aggregate([
    { $match: { date: "10/7/2022" } },
    { $unwind: "$slots" },
    { $match: { "slots.time": slot } },
    {
      $project: {
        "slots.time": "$slots.time",
        "slots.QRCode": "$slots.QRCode",
        "slots.count": { $size: "$slots.users" },
        "slots.users": "$slots.users",
      },
    },
    {
      $group: {
        _id: "$_id",
        slots: {
          $push: "$slots",
        },
      },
    },
  ]); //Getting users array to recreate QR

  console.log(slots);
  var users = JSON.stringify(slots[0].slots[0].users);
  let uri = await generateQR(JSON.stringify(users));

  await queueModel.updateOne(
    {
      date: "10/7/2022",
      "slots.time": slot,
    },
    {
      $set: { "slots.$.QRCode": uri },
    }
  ); //Updating QR after booking slot

  let len = slots[0].slots[0].count;

  len === 5 &&
    (await queueModel.updateOne(
      {
        data: "10/7/2022",
        "availableSlots.time": slot,
      },
      {
        $set: { "availableSlots.$.isFull": true },
      }
    )); //check if length is 5 then disable the slot
  console.log(req.cookies);
  let [leftHalfOfTheTime, rightHalfOfTheTime] = slot.split("-");
  console.log(leftHalfOfTheTime);
  let [hrs, min] = leftHalfOfTheTime.split(":");
  if (min <= 30) {
    hrs = parseInt(hrs) - 1;
    min = parseInt(min) + 60 - 30;
  } else {
    min = parseInt(min) - 30;
  }
  // console.log({ time: hrs + ":" + min });
  let yr = new Date().getFullYear(),
    dt = new Date().getDate(),
    mon = new Date().getMonth();

  //August 19, 1975 23:15:30 GMT+07:00
  //Mon Aug 15 2022 00:50:00 GMT+0530 (India Standard Time)
  const reminder = await reminderModel.create({
    userId: req.cookies.userID,
    message: "Its times",
    time: new Date(yr, mon, dt, hrs, min, 00),
  }); //Create reminder for user

  await scheduleModel.create({
    _id: reminder._id,
    sendAt: reminder.time,
  });
  res.json({
    SUCCESS: true,
    time: new Date(),
    timenew: new Date(yr, mon, dt, hrs, min, 00),
  });
};

const generateQR = async (users) => {
  try {
    return await QRCode.toDataURL(users);
  } catch (err) {
    return err;
  }
};

const findEmailDuplicates = async (email, res) => {
  try {
    const existingAC = await userModel.findOne({ email: email });
    if (existingAC) {
      res.status(401).json({ success: false, desc: "Already exist AC" });
    } else {
      return existingAC;
    }
  } catch (error) {
    res.status(422).json({ sucess: false, desc: "Error" + error });
  }
};

exports.confirmID = (req, res) => {
  const { data } = req.body;
  const userID = req.cookies.userID;
  const userArray = JSON.parse(data);
  userArray.forEach((element) => {
    console.log(element._id);
    if (element._id === userID) {
      console.log("name is there");
    }
  });
  res.json({ satatus: true });
};

const sendToken = async (user, statusCode, res) => {
  const token = await user.getSignedToken();
  // console.log(token);
  // this.tokens = this.tokens.concat({token:token})
  // console.log(this._id);
  res
    .cookie("jwtoken", token, { httpOnly: true })
    .cookie("userID", user._id)
    .status(statusCode)
    .json({ success: true, token, user });
};
