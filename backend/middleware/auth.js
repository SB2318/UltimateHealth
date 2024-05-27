const User = require('../models/user');

const ensureVerified = async (req, res, next) => {
  // Here, you should have a way to get the user's ID. This example assumes you have user ID in req.user.id
  const user = await User.findById(req.user.id);

  if (!user || !user.verified) {
    return res.status(403).send('You need to verify your email to access this page.');
  }

  next();
};

module.exports = ensureVerified;
