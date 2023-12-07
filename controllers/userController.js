const { validationResult } = require("express-validator");
const UserService = require("../services/UserService");


const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password, email, firstname, lastname } = req.body;
    const newUser = await UserService.createUser(
      username,
      password,
      email,
      firstname,
      lastname
    );
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering User:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await UserService.authenticateUser(username, password);

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    res.json({ access_token: user._id });
  } catch (error) {
    console.error("Error logging in User:", error);
    res.status(500).json({ message: "Error logging in user" });
  }
};

module.exports = { registerUser, loginUser };
