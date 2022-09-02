const express = require("express");
const router = require("./userRoutes");
const {
  setTime,
  getTime,
  startServing,
  stopServing,
  adduser,
} = require("../controllers/adminController");

router.route("/admin").post(setTime).get(getTime);
router.route("/startserve").put(startServing);
router.route("/stopserve").put(stopServing);
router.route("/adduser").post(adduser);
module.exports = router;
