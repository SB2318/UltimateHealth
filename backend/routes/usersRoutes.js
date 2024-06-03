const express = require('express');
const router = express.Router();
const {verifyToken} = require("../auth/authMiddleware");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnverifiedUser = require("../models/UnverifiedUserModel");
const User=require("../models/UserModel")


// Backend API -  http://localhost:3025/api/

const {register,login,logout, sendOTPForForgotPassword, verifyOtpForForgotPassword,deleteByUser,deleteByAdmin} = require("../controllers/usersControllers");


router.get("/hello", (req, res) => {
    console.log("Hello World Route Executed");
    res.send("Hello World");
});

// Register New User
router.post("/user/register", register);

// Login User Route
router.post("/user/login",login);


// Forget password
router.post("/user/forgotpassword", sendOTPForForgotPassword);

// verify password
router.post("/user/verifypassword", verifyOtpForForgotPassword);
router.post('/user/deleteUser',deleteByUser);
router.post('/admin/deleteUser',deleteByAdmin);


router.get('/user/verify-email', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const unverifiedUser = await UnverifiedUser.findOne({ email: decoded.email, verificationToken: token });

    if (!unverifiedUser) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    // Move user from UnverifiedUser to User collection
    const newUser = new User({
      user_name: unverifiedUser.user_name,
      user_handle: unverifiedUser.user_handle,
      email: unverifiedUser.email,
      password: unverifiedUser.password,
      isDoctor: unverifiedUser.isDoctor,
      specialization: unverifiedUser.specialization,
      qualification: unverifiedUser.qualification,
      Years_of_experience: unverifiedUser.Years_of_experience,
      contact_detail: unverifiedUser.contact_detail,
      Profile_image: unverifiedUser.Profile_image,
      isVerified: true
    });

    await newUser.save();
    await UnverifiedUser.deleteOne({ email: unverifiedUser.email });

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/user/logout",logout);


module.exports = router;