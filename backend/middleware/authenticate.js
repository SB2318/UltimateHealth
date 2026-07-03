const expressAsyncHandler = require("express-async-handler");
const { throwError } = require("../utils/throwError");
const { HTTP_STATUS, ERROR_CODES } = require("../constants/errorConstants");
const { verifyRefreshToken, hashToken } = require("../services/security/tokenService");
const { findUserById } = require("../services/db/userService");
const { findAdminById } = require("../services/db/adminService");
const { ROLES } = require("../constants/roles");

const authenticate = expressAsyncHandler(async (req, _res, next) => {
  const token =
    req.cookies?.refreshToken ||
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    throwError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.ACCESS_DENIED,
      "Authentication required"
    );
  }

  const decoded = verifyRefreshToken(token);

  if (!decoded?.userId || !decoded?.jti || !decoded?.role) {
    throwError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.UNAUTHORIZED_ACCESS,
      "Invalid or expired token"
    );
  }

  let account = null;

  if (decoded.role === ROLES.ADMIN) {
    account = await findAdminById(decoded.userId);
  } else if (
    decoded.role === ROLES.USER ||
    decoded.role === ROLES.DOCTOR
  ) {
    account = await findUserById(decoded.userId);
  }

  if (!account) {
    throwError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.UNAUTHORIZED_ACCESS,
      "Account not found"
    );
  }

  if (account.isBlockUser || account.isBannedUser) {
    throwError(
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.ACCESS_DENIED,
      "Account access restricted"
    );
  }

  if (
    !account.refreshToken?.hashedRefreshToken ||
    !account.refreshToken?.jti
  ) {
    throwError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.UNAUTHORIZED_ACCESS,
      "Session expired"
    );
  }

  const hashedToken = await hashToken(token);

  const isValidSession =
    account.refreshToken.jti === decoded.jti &&
    account.refreshToken.hashedRefreshToken === hashedToken;

  if (!isValidSession) {
    throwError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.UNAUTHORIZED_ACCESS,
      "Invalid session"
    );
  }

  req.user = {
    userId: account._id,
    email: account.email,
    role: decoded.role,
  };

  next();
});

module.exports = { authenticate };