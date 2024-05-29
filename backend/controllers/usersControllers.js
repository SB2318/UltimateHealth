const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const UnverifiedUser = require('../models/UnverifiedUserModel');
const bcrypt = require("bcrypt");
require('dotenv').config();
const { sendVerificationEmail } = require('./emailservice');

module.exports.register = async (req, res) => {
  try {
    const { user_name, user_handle, email, isDoctor, Profile_image, password, qualification, specialization, Years_of_experience, contact_detail } = req.body;

    // Check for required fields
    if (!user_name || !user_handle || !email || !password) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    // Check if user already exists in User or UnverifiedUser collections
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    existingUser = await UnverifiedUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Please verify your email. Verification email already sent.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a verification token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Create new unverified user
    const newUnverifiedUser = new UnverifiedUser({
      user_name,
      user_handle,
      email,
      password: hashedPassword,
      isDoctor,
      contact_detail,
      Profile_image,
      verificationToken,
    });

    // Include doctor-specific fields if the user is a doctor
    if (isDoctor) {
      newUnverifiedUser.qualification = qualification;
      newUnverifiedUser.specialization = specialization;
      newUnverifiedUser.Years_of_experience = Years_of_experience;
    }

    // Save the unverified user to the database
    await newUnverifiedUser.save();

    // Send verification email
    sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: 'Registration successful. Please verify your email.' });
  } catch (error) {
    console.error('Error during registration:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ errors: validationErrors });
    }

    // Handle duplicate email/user handle error
    if (error.code === 11000) {
      return res.status(409).json({ error: "Email or user handle already exists" });
    }

    // Handle general server errors
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ error: 'Email not verified. Please check your email.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie('token', token, { httpOnly: true, maxAge: 86400000 });
    res.status(200).json({ user, token, message: "Login Successful" });
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