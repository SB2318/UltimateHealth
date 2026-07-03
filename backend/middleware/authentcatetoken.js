const BlacklistedToken = require('../models/blackListedToken');
const User = require("../models/UserModel");
const Admin = require("../models/admin/adminModel");
const { verifyRefreshToken } = require("../services/security/tokenService");

const authenticateToken = async (req, res, next) => {
  // Extract access token from cookies or Authorization header
  const accessToken = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ error: 'No access token provided' });
  }

  // Check for blacklist - Access tokens should be blacklisted on logout
  try {
    const blacklistedToken = await BlacklistedToken.findOne({ token: accessToken }).lean();

    if (blacklistedToken) {
      return res.status(403).json({ error: 'Token is blacklisted' });
    }

    const decoded = verifyRefreshToken(accessToken);

    // console.log("Decoded", decoded);

    if (decoded && decoded.role && decoded.role === 'user') {

      const user = await User.findById(decoded.userId);
      if (!user || !user.isVerified) {
        return res.status(403).json({ error: 'Email not verified' });
      }
      req.userId = user._id;
      next();
    } else if (decoded && decoded.role && decoded.role === 'admin') {

      const admin = await Admin.findById(decoded.userId);
      if (!admin || !admin.isVerified) {
        return res.status(403).json({ error: 'Email not verified' });
      }
      req.userId = admin._id;
      next();
    } else {
      // as of now this else condition, due to old datas

      const [user, admin] = await Promise.all(
        [
          User.findById(decoded.userId),
          Admin.findById(decoded.userId)
        ]
      );

      if (!admin || !admin.isVerified) {
        //  console.log("Enter If Block", user);
        if (!user || !user.isVerified) {
          return res.status(403).json({ error: 'Email not verified' });
        } else {

          req.userId = user._id;
          next();
        }
      } else {
        req.userId = admin._id;
        next();
      }
    }

  } catch (err) {
    console.log("middleware server error", err);
    res.status(500).json({ message: "Internal server error" });
  }

};

module.exports = authenticateToken;

