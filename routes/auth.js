const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');
const { loginUser } = require('../controllers/authlogin');
const { bookDoctor } = require('../controllers/authBooking');




router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/book_appointment', bookDoctor);


module.exports = router;

