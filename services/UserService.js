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

const authenticateUser = async (username, password) => { 
  try {
    
    const user = await User.findOne({ username });
         console.log('user')
    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error('Error authenticating user');
  }
};

const getUserByAccessToken = async (accesstoken) =>{
  try{
    const user = await User.findOne({ _id : accesstoken});
    return user;
  }catch(error){
    throw new Error('Error Finding User By Access Token')
  }
}

module.exports = { createUser, authenticateUser, getUserByAccessToken }; 
