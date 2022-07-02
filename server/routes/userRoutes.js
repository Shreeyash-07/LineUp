const express = require('express');
const router = express.Router();
const {signup,login,getslots} = require('../controllers/userController');

router.route('/api/signup').post(signup);
router.route('/api/login').post(login);
router.route('/getslots').get(getslots);

module.exports = router;