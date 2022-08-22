const express = require("express");
const router = require("./userRoutes");
const {
  setTime,
  getTime,
  startServing,
  stopServing,
} = require("../controllers/adminController");

router.route("/admin").post(setTime).get(getTime);
router.route("/startserve").put(startServing);
router.route("/stopserve").put(stopServing);
module.exports = router;
