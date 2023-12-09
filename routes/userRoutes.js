const express = require("express");
const router = express.Router();
const {
  validatorsArray,
  loginValidators,
} = require("../validatores/userValidatores");
const {
  registerUser,
  loginUser,
  getUserDetails,
  addAddress,
  getUserWithAddresses
} = require("../controllers/userController");
const { validateAccessToken } = require("../middelware/authMiddelware");
const UserController = require("../controllers/userController");
const UserService = require("../services/UserService");

router.post("/user/register", validatorsArray, registerUser);
router.post("/user/login", loginValidators, loginUser);
router.get("/user/detail", validateAccessToken, getUserDetails);
router.put("/user/delete", validateAccessToken, UserController.deleteUser);
router.get("/user/list/:page",  UserService.getPaginatedUsers);
router.post("/user/address", validateAccessToken, addAddress);
router.get("/user/get/:id", validateAccessToken, getUserWithAddresses);

module.exports = router;
