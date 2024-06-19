const express = require('express');
const router = express.Router();
const { verifyToken, verifyUser } = require("../auth/authMiddleware");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnverifiedUser = require("../models/UnverifiedUserModel");
const User = require("../models/UserModel");
const { sendVerificationEmail } = require('../controllers/emailservice');
const {
    register, login, logout,
    sendOTPForForgotPassword, verifyOtpForForgotPassword,
    deleteByUser, deleteByAdmin
} = require("../controllers/usersControllers");

router.get("/hello", (req, res) => {
    console.log("Hello World Route Executed");
    res.send("Hello World");
});

// Register New User
router.post("/user/register", register);

// Login User Route
router.post("/user/login", login);

// Forget password
router.post("/user/forgotpassword", sendOTPForForgotPassword);

// verify password
router.post("/user/verifypassword", verifyOtpForForgotPassword);

router.post('/user/deleteUser', deleteByUser);
router.post('/admin/deleteUser', deleteByAdmin);

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

        // Respond with an HTML page
        res.send(`
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verified</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f8ff;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 40px;
            text-align: center;
            max-width: 500px;
            width: 100%;
        }
        .logo {
            width: 100px;
          
        }
        .illustration {
            width: 100%;
            height: auto;
            margin-bottom: 20px;
        }
        h1 {
            color: #007BFF;
            margin-top:0px;
        }
        p {
            font-size: 16px;
            color: #666;
        }
        .button {
            background-color: #007BFF;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://imgur.com/I5lDXoI.png" alt="Logo" class="logo">
        <h1>Welcome ✅</h1>
        <p>Your account has been verified successfully.</p>
        <a href="your-app-scheme://" class="button">Open Your App</a>
      
    </div>
</body>
</html>

        `);
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/user/logout", logout);

module.exports = router;
