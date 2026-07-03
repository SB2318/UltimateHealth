const BlacklistedToken = require('../models/blackListedToken');
const Admin = require("../models/admin/adminModel");
const { verifyRefreshToken } = require("../services/security/tokenService");

const adminAuthenticateToken = async (req, res, next) => {
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
    const admin = await Admin.findById(decoded.userId);
    if (!admin || !admin.isVerified || admin.signature_url ===  "") {
      return res.status(403).json({ error: 'Either Email not verified or Admin not found' });
    } else {
      req.userId = admin._id;
      next();
    }

  } catch (err) {
    console.log("middleware server error",err);
    res.status(500).json({ message: "Internal server error" });
  }

};

module.exports = adminAuthenticateToken;

