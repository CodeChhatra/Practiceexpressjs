const User = require('../models/User');
const AccessToken = require('../models/AccessToken');

const getUserByAccessToken = async (accessToken) => {
  try {
    const tokenData = await AccessToken.findOne({ access_token: accessToken });
    if (!tokenData) {
      return null;
    }

    const user = await User.findById(tokenData.user_id);

    return user;
  } catch (error) {
    console.error('Error fetching user by access token:', error);
    throw new Error('Error fetching user by access token');
  }
};

const getTokenData = async (accessToken) => {
  try {
    const tokenData = await AccessToken.findOne({ access_token: accessToken });
    return tokenData;
  } catch (error) {
    console.error('Error fetching token data by access token:', error);
    throw new Error('Error fetching token data by access token');
  }
};

module.exports = { getUserByAccessToken, getTokenData };
