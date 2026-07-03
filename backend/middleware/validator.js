const { throwError } = require("../utils/throwError");

const validateBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    const details =
      result.error?.issues?.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })) || [];

    throwError(400, "VALIDATION_ERROR", "Missing or invalid fields", details);
  }

  req.validateBody = result.data;
  next();
};


const validateQuery = (schema) => (req, res, next) => {
   const result = schema.safeParse(req.query);

  if (!result.success) {
    const details =
      result.error?.issues?.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })) || [];

    throwError(400, "VALIDATION_ERROR", "Missing or invalid fields", details);
  }

  req.validateQuery = result.data;
  next();
}

const validateParams = (schema) => (req, res, next) => {
   const result = schema.safeParse(req.params);

  if (!result.success) {
    const details =
      result.error?.issues?.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })) || [];

    throwError(400, "VALIDATION_ERROR", details[0]?.message || "Invalid parameters");
  }

  req.validateParams = result.data;
  next();
}
module.exports = { validateBody, validateQuery, validateParams };