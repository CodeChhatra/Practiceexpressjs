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

module.exports = { createUser, authenticateUser, getPaginatedUsers };
