const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const User = require("../model/UserModel");

// const crypto = require("crypto");
// const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
// const ErrorHander = require("../utils/errorhander");

const registerUser = asyncHandler(async (req, res) => {
  const {
    image,
    name,
    email,
    password,
    mobile_no,
    gender,
    check,
    city,
    state,
  } = req.body;
  // console.log(req.body);
  // console.log(check);
  const userExist = await User.findOne({ email });
  if (userExist) {
    // console.log("User Already Exists!");
    res.status(400);

    throw new Error("User Already Exists!");
  }

  const user = await User.create({
    image,
    name,
    email,
    password,
    mobile_no,
    gender,
    check,
    city,
    state,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      image: user.image,
      name: user.name,
      email: user.email,
      password: user.password,
      mobile_no: user.mobile_no,
      gender: user.gender,
      check: user.check,
      city: user.city,
      state: user.state,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const authController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      mobile_no: user.mobile_no,
      gender: user.gender,
      check: user.check,
      city: user.city,
      state: user.state,
      token: generateToken(user._id),
      //   token: null,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  // res.send("success");
  const { id } = req.body;
  // console.log(id);
  const user = await User.findById(id);
  // console.log(user.check);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      mobile_no: user.mobile_no,
      gender: user.gender,
      check: user.check,
      city: user.city,
      state: user.state,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  console.log(req.body);
  const user = await User.findById(req.body.id);
  // console.log(user);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    user.mobile_no = req.body.mobile_no || user.mobile_no;
    user.gender = req.body.gender || user.gender;
    user.check = req.body.check || user.check;
    user.city = req.body.city || user.city;
    user.state = req.body.state || user.state;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      password: updateUser.password,
      mobile_no: updateUser.mobile_no,
      gender: updateUser.gender,
      check: updateUser.check,
      city: updateUser.city,
      state: updateUser.state,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("user Not Found!");
  }
});

const getallUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send(users);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

const deleteuser = asyncHandler(async (req, res) => {
  const userid = req.body.userid;
  try {
    await User.findOneAndDelete({ _id: userid });

    res.status(200).send("User Deleted");
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});

module.exports = {
  authController,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getallUsers,
  deleteuser,
  //   forgotPassword,
};
