const mongoose = require("mongoose");
// const { MongoServerError } = require("mongodb");


function isAppError(err) {
  return (
    typeof err === "object" &&
    err !== null &&
    "isOperational" in err &&
    err.isOperational === true
  );
}

// ── Error Handler ──────────────────────────────────────────

function errorHandler(err, req, res, _next) {
  let statusCode = 500;
  let code = "INTERNAL_ERROR";
  let message = "Internal server error";
  let details = undefined;

  // ── Mongoose: ValidationError ────────────────────────────
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    code = "VALIDATION_ERROR";
    message = "Invalid input data";

    details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // ── Mongoose: CastError ──────────────────────────────────
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    code = "INVALID_ID";
    message = `Invalid ${err.path}`;
  }

  // ── MongoDB: Duplicate Key ───────────────────────────────
  else if (err.code === 11000) {
    statusCode = 409;
    code = "DUPLICATE_RESOURCE";

    const field = Object.keys(err.keyPattern || {})[0];
    message = `${field} already exists`;
  }

  // ── Custom App Error ─────────────────────────────────────
  else if (isAppError(err)) {
    statusCode = err.statusCode;
    code = err.code;
    message = err.message;
    details = err.details;
  }

  // ── Fallback ─────────────────────────────────────────────
  else {
    // Optional dev debug
    // if (process.env.NODE_ENV === "development") {
    //   message = err instanceof Error ? err.message : message;
    //   details = err;
    // }
  }

  if (statusCode === 500) {
    console.error(err);
  }
  
  // ── Production Safety ────────────────────────────────────
  if (process.env.NODE_ENV === "PRODUCTION" && !isAppError(err)) {
    message = "Internal server error";
    details = undefined;
  }

  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  });
}

module.exports = {errorHandler};