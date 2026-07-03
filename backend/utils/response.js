function sendSuccess(res, statusCode = 200, message, data) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

module.exports = { sendSuccess };