const { throwError } = require("../utils/throwError");
const { HTTP_STATUS, ERROR_CODES } = require("../constants/errorConstants");

const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user) {
      throwError(HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED_ACCESS, "Unauthorized");
    }

    if (!allowedRoles.includes(req.user.role)) {
      throwError(HTTP_STATUS.FORBIDDEN, ERROR_CODES.ACCESS_DENIED, "Forbidden");
    }

    next();
  };

module.exports = {authorize};