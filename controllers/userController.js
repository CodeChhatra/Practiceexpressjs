const { validationResult } = require('express-validator');
const md5 = require('md5');
const User = require('../models/User');
const UserService = require('../services/UserService');
const jwt = require('jsonwebtoken');
const env = require('dotenv')
require('dotenv').config();
const passport = require('passport')

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


const loginUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }

      const foundUser = await UserService.authenticateUser(username, password);

      if (!foundUser) {
        return res.status(400).json({ error: 'Invalid username or password' });
      }

      const payload = { id: foundUser._id };
      const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log(accessToken)

      await UserService.updateAccessToken(foundUser._id, accessToken);

      res.json({ access_token: accessToken });
    } catch (error) {
      console.error('Error logging in User:', error);
      res.status(500).json({ message: 'Error logging in user' });
    }
  })(req, res, next);
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

// async function deleteUserAddresses(req, res) {
//   try {
//     const { addressIds } = req.body;

//     if (!addressIds || !Array.isArray(addressIds)) {
//       return res.status(400).json({ error: 'Invalid address IDs provided' });
//     }

//     const user = req.user;

//     if (!user) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     const updatedUser = await userService.deleteAddresses(user._id, addressIds);

//     res.status(200).json({ message: 'Addresses deleted successfully', user: updatedUser });
//   } catch (error) {
//     console.error('Error deleting addresses:', error);
//     res.status(500).json({ error: 'Error deleting addresses' });
//   }
// }

// async function forgotPassword(req, res) {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ error: 'Email is required' });
//     }

//     const resetToken = await userService.generatePasswordResetToken(email);


//     res.status(200).json({ message: 'Password reset token generated and sent successfully' });
//   } catch (error) {
//     console.error('Error generating password reset token:', error);
//     res.status(500).json({ error: 'Error generating password reset token' });
//   }
// }


module.exports = { registerUser, loginUser, getUserDetails, deleteUser , addAddress, getUserWithAddresses};

  

  