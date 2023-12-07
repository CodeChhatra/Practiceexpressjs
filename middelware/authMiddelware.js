const UserService = require("../services/UserService");


const validateAccessToken = async (req, res, next) => {
    try {
      
      const accessToken = req.headers['access_token']
  
      if (!accessToken) {
        return res.status(400).json({ error: 'Access token is missing' });
      }
  
      const user = await UserService.getUserByAccessToken(accessToken); 
      if (!user) {
        return res.status(400).json({ error: 'Invalid access token' });
      }
      else
      {
        return res.status(200).json({data: user})
      }
    } catch (error) {
      console.error('Error validating access token:', error);
      res.status(500).json({ message: 'Error validating access token' });
    }
  };

  module.exports = {validateAccessToken}