const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/update/profile', authController.updateProfile);
router.post('/update/password', authController.updatePassword);

module.exports = router;
