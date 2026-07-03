const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../../models/blackListedToken');

const blackListToken = async (token) => {
    let expiresAt;
    let jti;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.exp) {
            expiresAt = new Date(decoded.exp * 1000);
        }
        if (decoded.jti) {
            jti = decoded.jti;
        }
    } catch (err) {
        try {
            const decoded = jwt.decode(token);
            if (decoded) {
                if (decoded.exp) {
                    expiresAt = new Date(decoded.exp * 1000);
                }
                if (decoded.jti) {
                    jti = decoded.jti;
                }
            }
        } catch (e) {
            // Ignore decode failures
        }
    }

    if (!expiresAt) {
        expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }

    const blacklistedToken = new BlacklistedToken({ 
        token: token,
        jti: jti || token,
        expiresAt: expiresAt
    });
    await blacklistedToken.save();
}

const addTokenToBlacklist = async (jti, expiresAt) => {
  const blacklistedToken = new BlacklistedToken({ jti, expiresAt });
  await blacklistedToken.save();
}

module.exports = {
    blackListToken,
    addTokenToBlacklist
}