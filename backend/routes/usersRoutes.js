const express = require('express');
const router = express.Router();
const verifyToken = require("../auth/authMiddleware");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User=require("../models/UserModel")


// Backend API -  http://localhost:3025/api/

const {register,login,logout} = require("../controllers/usersControllers");


router.get("/hello", (req, res) => {
    console.log("Hello World Route Executed");
    res.send("Hello World");
});

// Register New User
router.post("/user/register", register);

// Login User Route
router.post("/user/login",login);


router.get("/user/profile", verifyToken, (req, res) => {
    const userId = req.userId;
    res.status(200).json({ message: "You are authenticated!", userId });
});
//verification route
router.get('/user/verify-email', async (req, res) => {
    const { token } = req.query;
  
    if (!token) {
      return res.status(400).json({ error: 'Token is missing' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email: decoded.email, verificationToken: token });
  
      if (!user) {
        return res.status(400).json({ error: 'Invalid token' });
      }
  
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();
  
      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error('Error verifying email:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

router.post("/user/logout",logout);


module.exports = router;