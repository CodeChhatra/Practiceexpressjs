const UserService = require("../services/UserService");
const AccessToken = require("../models/AccessToken")
const User = require('../models/User');


const validateAccessToken = async (req, res, next) => {
  try {
    const accessToken = req.headers['access_token'];
    console.log(accessToken)
    if (!accessToken) {
      return res.status(400).json({ error: 'Access token is missing' });
    }

    const tokenData = await AccessToken.findOne({ access_token: accessToken });
    if (!tokenData) {
      return res.status(400).json({ error: 'Invalid access token' });
    }

    const currentTimestamp = Date.now() / 1000;
    if (tokenData.expiry && tokenData.expiry < currentTimestamp) {
      return res.status(401).json({ error: 'Access token has expired' });
    }

    req.user = await User.findById(tokenData.user_id);
    next();
  } catch (error) {
    console.error('Error validating access token:', error);
    res.status(500).json({ message: 'Error validating access token' });
  }
};


  module.exports = {validateAccessToken}