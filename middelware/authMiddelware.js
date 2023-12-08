const userAccess = require("../validatores/userAccess");
const User = require('../models/User');

const validateAccessToken = async (req, res, next) => {
  try {
    const accessToken = req.headers['access_token'];

    if (!accessToken) {
      return res.status(400).json({ error: 'Access token is missing' });
    }

    const user = await userAccess.getUserByAccessToken(accessToken);

    if (!user) {
      return res.status(401).json({ data: [], message: 'Invalid access token' });
      
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error validating access token:', error);
    res.status(500).json({ data: [], message: 'Error validating access token' });
  }
};

module.exports = { validateAccessToken };
