const express = require('express');
const router = express.Router();
const { validatorsArray, loginValidators } = require('../validatores/userValidatores');
const { registerUser, loginUser } = require('../controllers/userController');


router.post('/user/register', validatorsArray, registerUser);


router.post('/user/login', loginValidators, loginUser);



module.exports = router;
