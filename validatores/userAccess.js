const User = require('../models/User');

const getUserByAccessToken = async (accessToken) => {
  try {
    const user = await User.findOne({ _id: accessToken });
    return user;
  } catch (error) {
    console.error('Error fetching user by access token:', error);
    throw new Error('Error fetching user by access token');
  }
};



module.exports = { getUserByAccessToken };
