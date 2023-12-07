const express = require('express');
const router = express.Router();
const { validatorsArray, loginValidators } = require('../validatores/userValidatores');
const { registerUser, loginUser } = require('../controllers/userController');
const {validateAccessToken} = require('../middelware/authMiddelware')

router.post('/user/register', validatorsArray, registerUser);


router.post('/user/login', loginValidators, loginUser);
router.get('/user/detail', validateAccessToken )



module.exports = router;
