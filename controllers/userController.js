const { validationResult } = require('express-validator');

const User = require('../models/User');
const UserService = require('../services/UserService');

const registerUser = async (req, res) => {
  try{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
  const { username, password, email, firstname, lastname } = req.body;
  const newUser =await UserService.createUser( username, password, email, firstname, lastname )
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering User:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

module.exports = { registerUser };

  

  
