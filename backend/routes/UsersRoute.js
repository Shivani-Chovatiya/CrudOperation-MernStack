const express = require("express");
const {
  authController,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getallUsers,
  deleteuser,
} = require("../controller/usersController");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

//user registration
router.route("/").post(registerUser);

//post email and password auth
router.post("/login", authController);
router.get("/getallusers", getallUsers);
router.post("/deleteuser", deleteuser);
//get user profile Private Route

router.route("/profile").post(getUserProfile);
router.route("/update").put(updateUserProfile);

module.exports = router;
