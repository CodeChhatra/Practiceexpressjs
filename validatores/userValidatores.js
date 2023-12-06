const { body } = require('express-validator');
const User = require('../models/User');

const validatorsArray = [
  body('username')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Username must be at least 5 characters long')
    .custom(async (value) => {
      const existingUser = await User.findOne({ username: value });
      if (existingUser) {
        throw new Error('Username already exists');
      }
      return true;
    }),
  body('email')
    .isEmail()
    .normalizeEmail()
    .custom(async (value) => {
      const existingEmail = await User.findOne({ email: value });
      if (existingEmail) {
        throw new Error('Email Already Exist');
      }
      return true;
    }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  body('firstname').notEmpty().withMessage('First Name Cannot be Empty'),
  body('lastname').notEmpty().withMessage('Last Name Cannot be Empty'),
];


module.exports = validatorsArray;
