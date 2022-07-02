const express = require('express');
const router = require('./userRoutes');
const {setTime,getTime} = require('../controllers/adminController');

router.route('/admin').post(setTime).get(getTime);

module.exports = router;