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
    return res.status(422).json({ success: false, message: "User not found" });
    // return next(createError(422, "User not found"));
  } else {
    try {
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ success: false, message: "Credentials are incorrect" });
        // return next(createError(401, "Credentials are incorrect"));
      } else {
        sendToken(user, 200, res);
      }
    } catch (error) {
      return res.status(500).json({ success: false, desc: "Error" + error });
      // next(error);
    }
  }
};

exports.logout = async (req, res) => {
  console.log("del");
  res.clearCookie("Booked")
  res.clearCookie("userID")
  res.clearCookie("jwtoken")
  res.status(200).json({sucess:"true"})
}

exports.properRouting = async (req, res) => {
  let user = await userModel.findById(req.cookies.userID);
  console.log(user)
  res.json({success:true,user:user});
  // res.json(user);
  // const query = await userModel.find(userid);
  // res.json({booked:query.isBooked})
};

exports.getslots = async (req, res, next) => {
  queueModel.find(
    {
      date: new Date().toLocaleDateString(),
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

      const userid = req.rootUser._id;

      res.status(200).json({ slots, userid });
    }
  );
};

exports.getestime = async (req, res) => {
  let user = await userModel.findById(req.cookies.userID);
  let estimatedTime = user.currentAppointment.estimatedTime;
  res.json({ estimatedTime });
};

exports.bookslot = async (req, res) => {
  let { slot, id } = req.body;
  const user = await userModel.findById(id);
  let bookedSlotObj = { userId: id, name: user.name, phone: user.phone };
  await queueModel.updateOne(
    {
      date: "19/8/2022",
      "slots.time": slot,
    },
    {
      $push: { "slots.$.users": bookedSlotObj },
    }
  ); //Fetching Queue

  let slots = await queueModel.aggregate([
    { $match: { date: "19/8/2022" } },
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

  let users = slots[0].slots[0].users;
  let usersForQR = [];
  users.forEach((user) => {
    usersForQR.push(user.userId);
  });

  console.log(usersForQR);

  let uri = await generateQR(JSON.stringify(usersForQR));

  await queueModel.updateOne(
    {
      date: "19/8/2022",
      "slots.time": slot,
    },
    {
      $set: { "slots.$.QRCode": uri },
    }
  ); //Updating QR after booking slot

  await userModel.findByIdAndUpdate(id, {
    isBooked: true,
    $set: { "currentAppointment.time": slot },
  });

  let len = slots[0].slots[0].count;

  len === 5 &&
    (await queueModel.updateOne(
      {
        data: "19/8/2022",
        "availableSlots.time": slot,
      },
      {
        $set: { "availableSlots.$.isFull": true },
      }
    )); //check if length is 5 then disable the slot
  console.log(req.cookies);

  //setting notification
  let [leftHalfOfTheTime, rightHalfOfTheTime] = slot.split("-");
  console.log(leftHalfOfTheTime);
  let [hrs, min] = leftHalfOfTheTime.split(":");
  if (min <= 30) {
    hrs = parseInt(hrs) - 1;
    min = parseInt(min) + 60 - 30;
  } else {
    min = parseInt(min) - 30;
  }
  console.log({ time: hrs + ":" + min });
  let yr = new Date().getFullYear(),
    dt = new Date().getDate(),
    mon = new Date().getMonth();

  const reminder = await reminderModel.create({
    userId: req.cookies.userID,
    message: "Jaa re tera time aa gaya hai",
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
    return await QRCode.toDataURL(users, { width: 500, margin: 3 });
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

exports.confirmID = async (req, res) => {
  const { data } = req.body;
  console.log(data);
  const userID = req.cookies.userID;

  // console.log(req.cookies.userID);
  function findId(id) {
    return id === userID;
  }
  const x = data.find(findId);
  if (x) {
    const user = await userModel.findById(userID);
    let slot = user.currentAppointment.time;
    console.log({ slot: slot });
    let slots = await queueModel.aggregate([
      { $match: { date: "19/8/2022" } },
      { $unwind: "$slots" },
      { $match: { "slots.time": slot } },
      {
        $project: {
          "slots.time": "$slots.time",
          "slots.count": { $size: "$slots.tempQ" },
        },
      },
    ]);
    let timeSlot = slots[0].slots.time;
    let tempQcount = slots[0].slots.count;
    let [leftside, rightside] = timeSlot.split("-");
    let [hr, min] = leftside.split(":");
    let [hr1, min1] = rightside.split(":");
    const token = hr + "_" + hr1 + "_" + tempQcount;
    let userObj = {
      userId: userID,
      name: user.name,
      phone: user.phone,
      token: token,
      isConfirmed: true,
    };
    console.log({ userid: userID, token: token });
    userModel
      .findByIdAndUpdate(userID, {
        $set: {
          "currentAppointment.token": token,
          "currentAppointment.estimatedTime": new Date(
            new Date().getTime() + 15 * 60000 * tempQcount
          ),
        },
      })
      .then((resp) => {
        console.log({ res: resp });
      })
      .catch((err) => {
        console.log({ err: err });
      });
    await queueModel.updateOne(
      { date: "19/8/2022", "slots.time": slot },
      { $push: { "slots.$.tempQ": userObj } }
    );
  }
  return res.json({ status: true });
};

const sendToken = async (user, statusCode, res) => {
  const token = await user.getSignedToken();
  const isbooked = user.isBooked;
  console.log(user._id);
  // console.log(token);
  // this.tokens = this.tokens.concat({token:token})
  // console.log(this._id);
  res
    .cookie("jwtoken", token, { httpOnly: true })
    .cookie("userID", user._id)
    // .cookie("Booked", isbooked, { overwrite: true })
    // .status(statusCode)
    .json({ success: true, token, user });
};

// const res = await queueModel.findOneAndUpdate(
//   {
//     date: "19/8/2022",
//     "slots.time": slot,
//     "slots.$.users.userId": userID,
//   },
//   {
//     $set: { "slots.$.users.0.isConfirmed": true },
//   }
// );

// {
//         $group: {
//           _id: "$_id",
//           slots: {
//             $push: "$slots",
//           },
//         },
//       },
