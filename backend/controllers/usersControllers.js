const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

module.exports.register = async (req, res) => {
    try {
      const {
        user_name,
        user_handle,
        email,
        isDoctor,
        profile_image,
        password,
        qualification,
        specialization,
        years_of_experience,
        contact_detail,
      } = req.body;
  
      // Validate required fields
      if (!user_name || !user_handle || !email || !password) {
        return res.status(400).json({ error: "Please provide all required fields" });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user document
      const newUser = new User({
        user_name,
        user_handle,
        email,
        isDoctor,
        profile_image,
        password: hashedPassword, // Store the hashed password
        contact_detail: contact_detail || {}, // Initialize contact_detail if not provided
      });
  
      // If the user is a doctor, add the additional fields
      if (isDoctor) {
        newUser.qualification = qualification;
        newUser.specialization = specialization;
        newUser.Years_of_experience = years_of_experience;
      }
  
      // Save the new user document to the database
      const savedUser = await newUser.save();
  
      // Send the saved user document as the response
      res.status(201).json({ user: savedUser });
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.name === 'ValidationError') {
        // Handle validation errors
        const validationErrors = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ errors: validationErrors });
      }
      if (error.code === 11000) {
        // Duplicate key error (email or user_handle already exists)
        return res.status(409).json({ error: "Email or user handle already exists" });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  };


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

module.exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(400).json({ message: 'User with this email does not exist.' });
    }
  
    const otp = crypto.randomBytes(3).toString('hex');
    const otpExpires = Date.now() + 3600000; // 1 hour
  
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();
  
    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email.' });
      }
      res.status(200).json({ message: 'OTP sent to your email.' });
    });
  };
  
module.exports.confirmPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
  
    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpires = null;
    await user.save();
  
    res.status(200).json({ message: 'Password reset successful.' });
  };



module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // If the user is not found, return an error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is incorrect, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JSON Web Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );


    // Setting Cookie for 1 day
    res.cookie('token', token, { httpOnly: true, maxAge: 86400000 }); // 1 day


    // Return the user data and the JWT token
    res.status(200).json({ user, token, message:"Login Successfull" });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports.logout = (req, res) => {
    
    // Clear the JWT token cookie
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
  };