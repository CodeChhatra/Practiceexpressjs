const AccessToken = require("../models/AccessToken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

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
    throw new Error("Could not create user");
  }
};

const authenticateUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    console.log("user");
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
    throw new Error("Error authenticating user");
  }
};
const getPaginatedUsers = async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const usersPerPage = 10;
    const skip = (page - 1) * usersPerPage;

    const users = await User.find().skip(skip).limit(usersPerPage);
    const total_Count = await User.countDocuments();
    const total_Pages = Math.ceil(total_Count / usersPerPage);
      
      res.json({
        message: 'Success',
          totalUsersCount: total_Count,
          totalPages: total_Pages,
        data: [
           ...users ],
        
      });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ data: [], message: 'Error fetching users' });
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

const addAddress = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { user_id, address, city, state, pin_code, phone_no } = req.body;

    
    const access_token = req.headers.access_token; 


    const user = await UserService.addAddress(
      user_id,
      address,
      city,
      state,
      pin_code,
      phone_no
    );

    res.status(201).json({ message: 'Address added successfully', user });
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ error: 'Error adding address' });
  }
};

const updateAccessToken = async (userId, accessToken) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.accessToken = accessToken;
    await user.save();
    return user;
  } catch (error) {
    throw new Error('Error updating access token for user');
  }
};

async function deleteAddresses(userId, addressIds) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: { $in: addressIds } } } },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw new Error('Error deleting addresses');
  }
}

async function generatePasswordResetToken(email) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.RESET_TOKEN_SECRET, { expiresIn: '15m' });

    return token;
  } catch (error) {
    throw new Error('Error generating password reset token');
  }
}




module.exports = { createUser, authenticateUser, getPaginatedUsers, addAddress, getUserByAccessToken, updateAccessToken, deleteAddresses, generatePasswordResetToken};
