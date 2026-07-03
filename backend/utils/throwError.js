function throwError(statusCode, code, message, details) {
  const error = new Error(message);

  error.statusCode = statusCode;
  error.code = code;
  error.isOperational = true;
  error.details = details;

  Error.captureStackTrace(error, throwError);

  throw error;
}

module.exports = {throwError};