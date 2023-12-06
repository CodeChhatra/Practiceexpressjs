const express = require('express');
const router = express.Router();
const validatorsArray = require('../validatores/userValidatores');
const { registerUser } = require('../controllers/userController')



router.post('/user/register', validatorsArray, registerUser);

module.exports = router;
