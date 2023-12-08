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
  res.status(201).json({ data: { message: 'User registered successfully', user: newUser }, message: 'Success' });
  } catch (error) {
    console.error('Error registering User:', error);
    res.status(500).json({ data: [], message: 'Error registering user' });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await UserService.authenticateUser(username, password);

    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    res.json({ access_token: user._id });
  } catch (error) {
    console.error('Error logging in User:', error);
    res.status(500).json({ message: 'Error logging in user' });
  }
};


const getUserDetails = async (req, res) => {
  try {
    const user = req.user; 


    if (!user) {
      return res.status(400).json({ error: 'Invalid user' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Error fetching user details' });
  }
};


const deleteUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(400).json({ error: 'Invalid user' });
    }

    await User.findOneAndDelete({ _id: user._id });

    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};



module.exports = { registerUser, loginUser, getUserDetails, deleteUser};

  

  