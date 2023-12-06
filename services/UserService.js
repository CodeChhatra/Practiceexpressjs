const User = require('../models/User');
const bcrypt = require('bcrypt'); 

const createUser = async (username, password, email, firstname, lastname) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      firstname,
      lastname,
    });
      
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error('Could not create user');
  }
};

// Other methods like updateUser, deleteUser, getUserById, etc.

module.exports = { createUser };
