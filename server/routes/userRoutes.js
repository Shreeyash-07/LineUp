const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getslots,
  bookslot,
  confirmID,
} = require("../controllers/userController");

const {
  Authenticate,
  AuthenticateAdmin,
} = require("../middlewares/authenticate");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/getslots").get(Authenticate, getslots);
router.route("/bookslot").put(bookslot);
router.route("/checkqr").post(confirmID);

module.exports = router;
