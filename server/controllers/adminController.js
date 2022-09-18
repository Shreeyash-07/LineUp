const express = require("express");
const schedule = require("node-schedule");
var QRCode = require("qrcode");
const queueModel = require("../models/queue");
const prioritySchedule = require("../models/prioritySchedule");
const slotRefModel = require("../models/slotsRef");
exports.setTime = async (req, res, next) => {
  // const response = await queueModel.findOne({
  //   date: new Date().toLocaleDateString(),
  // });
  // if (response) {
  //   alert("date already started");
  //   return res.json({ success: false });
  // }
  var time = req.body.time;
  console.log(time);
  console.log("Hello");
  var totalSlots = 8;
  let yr = new Date().getFullYear(),
    dt = new Date().getDate(),
    mon = new Date().getMonth();
  var aslots = [];
  var slotss = [];
  var [hrs, min] = time.split(":");
  const finalDate = new Date(yr, mon, dt, hrs, min, 00);

  var toSetMin = min;

  min = parseInt(min) + 15;
  if (min === 60 || min > 60) {
    hrs = parseInt(hrs) + 1;
    min = min - 60;
  }

  for (var i = 0; i < totalSlots; i++) {
    var nexthr = parseInt(hrs) + 1;
    var st = hrs + ":" + min + "-" + nexthr + ":" + min;
    aslots.push({
      time: hrs + ":" + min + "-" + nexthr + ":" + min,
      isFull: false,
    });
    var user = [{ time: hrs + ":" + min + "-" + nexthr + ":" + min }];
    const uri = await generateQR(user);
    slotss.push({
      time: hrs + ":" + min + "-" + nexthr + ":" + min,
      QRCode: uri,
    });
    const priorityReminder = await prioritySchedule.create({
      endAt: new Date(yr, mon, dt, nexthr, min, 00),
    });
    await slotRefModel.create({
      slotRefId: priorityReminder._id,
      prevSlot: hrs + ":" + min + "-" + (hrs + 1) + ":" + min,
      nextSlot: nexthr + ":" + min + "-" + (nexthr + 1) + ":" + min,
    });
    hrs = nexthr;
  }

  const job = schedule.scheduleJob(finalDate, function () {
    queueModel.create(
      {
        date: new Date().toLocaleDateString(),
        availableSlots: aslots,
        slots: slotss,
      },
      (err, result) => {
        if (err) console.log(err);
        console.log("New day has been started");
      }
    );
    // generateQR(totalSlots,slots,parseInt(toSetMin)+1);
  });
  return res.json({ date: "set successfully" }).status(200); //json({message:aslots,test:parseInt(toSetMin)+1})
};
<<<<<<< HEAD

exports.adduser = async (req, res) => {
  console.log("add user");
  const { name, phone, time } = req.body;
  console.log({ name, phone, time });
  let slots = await queueModel.aggregate([
    { $match: { date: new Date().toLocaleDateString() } },
    { $unwind: "$slots" },
    { $match: { "slots.time": time } },
    {
      $project: {
        "slots.time": "$slots.time",
        "slots.count": { $size: "$slots.tempQ" },
      },
    },
  ]);
  let timeSlot = slots[0].slots.time;
  // res.json(timeSlot);
  let tempQcount = slots[0].slots.count;
  let [leftside, rightside] = time.split("-");
  let [hr, min] = leftside.split(":");
  let [hr1, min1] = rightside.split(":");
  const token = hr + "_" + hr1 + "_" + tempQcount;
  let userObj = {
    name: name,
    phone: phone,
    time: time,
    token: token,
    isConfirmed: true,
  };
  await queueModel.findOneAndUpdate(
    {
      date: new Date().toLocaleDateString(),
      "slots.time": time,
    },
    {
      $push: {
        "slots.$.tempQ": userObj,
      },
    }
  );
  return res.json({ sucess: true });
};

exports.getTime = async (req, res, next) => {
  console.log("getTime");
  // console.log(new Date().toLocaleDateString());
  //   const slots = await queueModel.find({ date: "7/7/2022" });
  const response = await queueModel.findOne({
    date: new Date().toLocaleDateString(),
  });
  if (response) {
    const newSlots = await queueModel.aggregate([
      { $match: { date: new Date().toLocaleDateString() } },
      {
        $project: {
          x: {
            $zip: { inputs: ["$availableSlots", "$slots"] },
          },
        },
      },
      { $unwind: "$x" },
      {
        $project: {
          time: { $first: "$x.time" },
          isFull: { $first: "$x.isFull" },
          QRCode: { $first: "$x.QRCode" },
          tempQ: { $first: "$x.tempQ" },
          users: { $first: "$x.users" },
        },
      },
    ]);
    console.log("yes data");
    return res.json(newSlots);
  }
  console.log("inside gettime");
  return res.json({ message: false });

  // console.log(new Date().toLocaleDateString());
  // res.json({ message: "justmessage" });
=======
exports.getTime = async (req, res, next) => {
  const response = await queueModel.findOne({ date: new Date().toLocaleDateString() });
  if (response) {
    console.log("Date Exist")
  }
  // const newSlots = await queueModel.aggregate([
  //   { $match: { date: "19/8/2022" } },
  //   {
  //     $project: {
  //       x: {
  //         $zip: { inputs: ["$availableSlots", "$slots"] },
  //       },
  //     },
  //   },
  //   { $unwind: "$x" },
  //   {
  //     $project: {
  //       time: { $first: "$x.time" },
  //       isFull: { $first: "$x.isFull" },
  //       QRCode: { $first: "$x.QRCode" },
  //       tempQ: { $first: "$x.tempQ" },
  //       users: { $first: "$x.users" },
  //     },
  //   },
  // ]);
  //   let slts = slots[0].availableSlots;
  return res.json(newSlots);
>>>>>>> c321473c1bf9c54383ffd8d30d74baedf0b7b09d
};

// function generateQR(slotsNumber,slots,min){
//     var ind = 0;
//     const job = schedule.scheduleJob(min+' * * * *',function(){
//         if(ind === slotsNumber){
//             job.cancel();
//         }
//         console.log(min+' * * * *')
//         console.log(new Date().toLocaleTimeString());
//         console.log(slots[0]);
//         var user = [
//             {name:'Shree',phone:'7738984928'},
//         ]
//         QRCode.toDataURL(user,function(err,url){
//             queueModel.updateOne({date:new Date().toLocaleDateString()},
//             {$push:{slots:[{time:slots[ind],QRCode:url}]}},()=>{
//                 console.log('inserted');
//             });
//         })
//         ind++;
//     })
// }

const generateQR = async (user) => {
  try {
    return await QRCode.toDataURL(user);
  } catch (err) {
    return err;
  }
};

exports.startServing = async (req, res) => {
  const { id, slot } = req.body;
  console.log({ userid: id, slot: slot });
  await queueModel.findOneAndUpdate(
    {
      date: new Date().toLocaleDateString(),
      "slots.time": slot,
      "slots.$.tempQ.userId": id,
    },
    {
      $set: {
        "slots.$.tempQ.0.status": "Being Serve",
        "slots.$.tempQ.0.isBeingServe": true,
      },
    }
  );
  res.json({ status: true });
};

exports.stopServing = async (req, res) => {
  const { id, slot } = req.body;
  await queueModel.findOneAndUpdate(
    {
      data: "20/8/2022",
      "slots.time": slot,
      "slots.$.tempQ.userId": id,
    },
    {
      $set: {
        "slots.$.tempQ.0.status": "Served",
        "slots.$.tempQ.0.isBeingServe": false,
      },
    }
  );

  res.json({ status: true });
};
