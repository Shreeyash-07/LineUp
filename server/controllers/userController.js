const userModel = require("../models/user");
const queueModel = require("../models/queue");
const { createError } = require("../utils/error");
const QRCode = require("qrcode");
const { findOneAndUpdate } = require("../models/user");
exports.signup = async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  // let user = await userModel.findOne({email:email}).select('+password')

  let existingEmail = await findEmailDuplicates(email, res);
  if (existingEmail === null) {
    try {
      const user = await userModel.create({
        name,
        email,
        password,
        phone,
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
      date: new Date().toLocaleDateString(),
      "availableSlots.isFull": { $eq: 0 },
    },
    { _id: 0, date: 0, slots: 0, __v: 0 },
    function (err, timeSlots) {
      if (err) {
        res.json({ error: err });
      }
      var obj = timeSlots[0].availableSlots;
      var timeArr = [];
      obj.forEach((element) => {
        if (element.isFull === false) {
          timeArr.push(element.time);
        }
      });
      res.json(timeArr);
    }
  );
};

exports.bookslot = async (req, res) => {
  let { slot, name, phone } = req.body;
  let bookedSlotObj = { name: name, phone: phone };
  await queueModel.updateOne(
    {
      date: "7/7/2022",
      "slots.time": slot,
    },
    {
      $push: { "slots.$.users": bookedSlotObj },
    }
  );

  let slots = await queueModel.aggregate([
    { $match: { date: "7/7/2022" } },
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
  ]);

  var users = JSON.stringify(slots[0].slots[0].users);
  let uri = await generateQR(JSON.stringify(users));
  // console.log(uri);
  // console.log(slots[0]);

  await queueModel.updateOne(
    {
      date: "7/7/2022",
      "slots.time": slot,
    },
    {
      $set: { "slots.$.QRCode": uri },
    }
  );

  let len = slots[0].slots[0].count;

  len === 5 &&
    (await queueModel.updateOne(
      {
        data: "7/7/2022",
        "availableSlots.time": slot,
      },
      {
        $set: { "availableSlots.$.isFull": true },
      }
    ));

  res.json({ len, message: "slot has been booked" });
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

const sendToken = async (user, statusCode, res) => {
  const token = await user.getSignedToken();
  // console.log(token);
  // this.tokens = this.tokens.concat({token:token})
  // console.log(this._id);
  res
    .cookie("jwtoken", token, { httpOnly: true })
    .status(statusCode)
    .json({ success: true, token, user });
};
