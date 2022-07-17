const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getslots,
  bookslot,
  about
} = require("../controllers/userController");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/getslots").get(getslots);
router.route("/bookslot").put(bookslot);
router.route("/about").get(about);

module.exports = router;
