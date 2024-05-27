const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const verificationToken = crypto.randomBytes(32).toString('hex');

  const user = new User({ email, password, verificationToken });
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email-id',
      pass: 'your-App-key',
    },
  });

  const mailOptions = {
    from: 'your-email-id',
    to: user.email,
    subject: 'Email Verification',
    text: `Please verify your email by clicking the following link: http://localhost:3025/auth/verify-email?token=${verificationToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Registration successful. Please check your email for verification link.');
  });
});

router.get('/verify-email', async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    return res.status(400).send('Invalid token.');
  }

  user.verified = true;
  user.verificationToken = undefined;
  await user.save();

  res.send('Email verified successfully.');
});

module.exports = router;
