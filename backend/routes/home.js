const express = require('express');
const router = express.Router();
const ensureVerified = require('../middleware/auth');

router.get('/home', ensureVerified, (req, res) => {
  res.send('Welcome to the home page.');
});

module.exports = router;