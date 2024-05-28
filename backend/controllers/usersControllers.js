const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
require('dotenv').config();
const { sendVerificationEmail } = require('./emailservice');

module.exports.register = async (req, res) => {
  try {
    const { user_name, user_handle, email, isDoctor, profile_image, password, qualification, specialization, years_of_experience, contact_detail } = req.body;

    if (!user_name || !user_handle || !email || !password) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const newUser = new User({
      user_name,
      user_handle,
      email,
      isDoctor,
      profile_image,
      password: hashedPassword,
      contact_detail: contact_detail || {},
      verificationToken,
    });

    if (isDoctor) {
      newUser.qualification = qualification;
      newUser.specialization = specialization;
      newUser.Years_of_experience = years_of_experience;
    }

    const savedUser = await newUser.save();
    sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: "Registration successful! Please check your email to verify your account." });
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ errors: validationErrors });
    }
    if (error.code === 11000) {
      return res.status(409).json({ error: "Email or user handle already exists" });
    }
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