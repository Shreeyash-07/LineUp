const express = require('express');
const router = express.Router();
const {signup,login,getslots} = require('../controllers/userController');

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/getslots').get(getslots);

module.exports = router;