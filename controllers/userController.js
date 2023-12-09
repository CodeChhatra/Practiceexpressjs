const { validationResult } = require('express-validator');
const md5 = require('md5');
const User = require('../models/User');
const UserService = require('../services/UserService');
const AccessToken = require('../models/AccessToken');
const mongoose = require('mongoose')

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
    const accessToken = md5(Math.random().toString());
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);

    const newAccessToken = new AccessToken({
      user_id: user._id,
      access_token: accessToken,
      expiry: expiry,
    });

    await newAccessToken.save();


    res.json({ access_token: accessToken});
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
const addAddress = async (req, res) => {
  try {
    const { userId, address, city, state, pin_code, phone_no } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Invalid user or unauthorized action' });
    }


    const foundUser = await User.findById(userId);
    console.log(foundUser)
    if (!foundUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    foundUser.addresses.push({ address, city, state, pin_code, phone_no });
    await foundUser.save();

    res.status(201).json({ message: 'Address added successfully', user: foundUser });
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ error: 'Error adding address' });
  }
};
const getUserWithAddresses = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Invalid user or unauthorized action' });
    }

    const userData = await User.findById(user._id).populate('addresses');
    res.json({ user: userData });
  } catch (error) {
    console.error('Error fetching user with addresses:', error);
    res.status(500).json({ message: 'Error fetching user with addresses' });
  }
};


module.exports = { registerUser, loginUser, getUserDetails, deleteUser , addAddress, getUserWithAddresses};

  

  