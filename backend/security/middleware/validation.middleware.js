/**
 * Input Validation & Sanitization Middleware
 * 
 * Features:
 * - Request body validation using express-validator
 * - XSS prevention using sanitize-html
 * - NoSQL injection prevention
 * - Email, password, and username validation
 */

const { body, param, query, validationResult } = require('express-validator');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');

// Sanitization options for user-generated content
const sanitizeOptions = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr',
    'ul', 'ol', 'li',
    'strong', 'em', 'b', 'i', 'u',
    'a', 'img',
    'blockquote', 'pre', 'code',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
  ],
  allowedAttributes: {
    'a': ['href', 'title', 'target'],
    'img': ['src', 'alt', 'width', 'height'],
    '*': ['class'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  transformNodes: true,
};

/**
 * Validation chain for user registration
 */
const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
    .custom(value => {
      if (!validator.isLength(value, { max: 255 })) {
        throw new Error('Email must be less than 255 characters');
      }
      return true;
    }),
  
  body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('Password must be between 8 and 128 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  
  body('user_handle')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores')
    .custom(value => {
      if (!validator.isLowercase(value)) {
        throw new Error('Username must be lowercase');
      }
      return true;
    }),
];

/**
 * Validation chain for login
 */
const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password is required'),
];

/**
 * Validation chain for article creation/update
 */
const articleValidation = [
  body('title')
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters')
    .trim(),
  
  body('content')
    .isLength({ min: 100 })
    .withMessage('Content must be at least 100 characters')
    .custom((value) => {
      // Check for potential XSS patterns
      const xssPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i, // onclick, onerror, etc.
        /data:/i,
      ];
      
      for (const pattern of xssPatterns) {
        if (pattern.test(value)) {
          throw new Error('Content contains potentially malicious code');
        }
      }
      return true;
    }),
  
  body('language')
    .isLength({ min: 2, max: 10 })
    .withMessage('Invalid language code')
    .trim(),
  
  body('tags')
    .optional()
    .isArray({ max: 10 })
    .withMessage('Maximum 10 tags allowed')
    .custom((tags) => {
      for (const tag of tags) {
        if (!validator.isLength(tag, { min: 2, max: 30 })) {
          throw new Error('Each tag must be between 2 and 30 characters');
        }
      }
      return true;
    }),
];

/**
 * Validation chain for podcast creation/update
 */
const podcastValidation = [
  body('title')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters')
    .trim(),
  
  body('description')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  
  body('duration')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer (seconds)'),
  
  body('language')
    .isLength({ min: 2, max: 10 })
    .withMessage('Invalid language code')
    .trim(),
];

/**
 * Validation chain for comment creation
 */
const commentValidation = [
  body('content')
    .isLength({ min: 1, max: 2000 })
    .withMessage('Comment must be between 1 and 2000 characters')
    .custom((value) => {
      // Block obvious XSS attempts
      const xssPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
      ];
      
      for (const pattern of xssPatterns) {
        if (pattern.test(value)) {
          throw new Error('Comment contains potentially malicious code');
        }
      }
      return true;
    }),
];

/**
 * Validation chain for profile update
 */
const profileValidation = [
  body('displayName')
    .optional()
    .isLength({ min: 2, max: 100 })
    .withMessage('Display name must be between 2 and 100 characters')
    .trim(),
  
  body('bio')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Bio must be less than 500 characters')
    .trim(),
  
  body('website')
    .optional()
    .isURL({ require_tld: true })
    .withMessage('Please provide a valid URL')
    .custom((value) => {
      if (value && !['http:', 'https:'].includes(new URL(value).protocol)) {
        throw new Error('Website must use HTTP or HTTPS protocol');
      }
      return true;
    }),
];

/**
 * Sanitize user-generated HTML content
 */
const sanitizeContent = (req, res, next) => {
  if (req.body.content) {
    req.body.content = sanitizeHtml(req.body.content, sanitizeOptions);
  }
  if (req.body.description) {
    req.body.description = sanitizeHtml(req.body.description, sanitizeOptions);
  }
  if (req.body.bio) {
    req.body.bio = sanitizeHtml(req.body.bio, sanitizeOptions);
  }
  next();
};

/**
 * Sanitize query parameters (prevent NoSQL injection)
 */
const sanitizeQuery = (req, res, next) => {
  // Remove any $ prefixed values from query (NoSQL injection prevention)
  const sanitizeObject = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    
    const sanitized = {};
    for (const key of Object.keys(obj)) {
      if (key.startsWith('$')) continue; // Skip MongoDB operators
      
      const value = obj[key];
      if (typeof value === 'object' && value !== null) {
        sanitized[key] = sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  };

  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  next();
};

/**
 * Sanitize request body (prevent NoSQL injection)
 */
const sanitizeBody = (req, res, next) => {
  // Remove any $ prefixed values from body (NoSQL injection prevention)
  const sanitizeObject = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    
    const sanitized = {};
    for (const key of Object.keys(obj)) {
      if (key.startsWith('$')) continue; // Skip MongoDB operators
      
      const value = obj[key];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        sanitized[key] = sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  };

  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  next();
};

/**
 * Validate MongoDB ObjectId
 */
const validateObjectId = (paramName = 'id') => {
  return [
    param(paramName)
      .isMongoId()
      .withMessage('Invalid ID format'),
  ];
};

/**
 * Validate pagination parameters
 */
const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
];

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  
  next();
};

/**
 * Validate email format
 */
const validateEmail = (email) => {
  return validator.isEmail(email) && validator.isLength(email, { max: 255 });
};

/**
 * Validate password strength
 */
const validatePassword = (password) => {
  return validator.isLength(password, { min: 8, max: 128 }) &&
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(password);
};

/**
 * Validate username format
 */
const validateUsername = (username) => {
  return validator.isLength(username, { min: 3, max: 30 }) &&
         /^[a-zA-Z0-9_]+$/.test(username);
};

/**
 * Sanitize string to prevent XSS
 */
const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return sanitizeHtml(str, { allowedTags: [], allowedAttributes: {} });
};

module.exports = {
  // Validation chains
  registerValidation,
  loginValidation,
  articleValidation,
  podcastValidation,
  commentValidation,
  profileValidation,
  
  // Sanitization middleware
  sanitizeContent,
  sanitizeQuery,
  sanitizeBody,
  
  // Validation helpers
  validateObjectId,
  validatePagination,
  handleValidationErrors,
  
  // Utility functions
  validateEmail,
  validatePassword,
  validateUsername,
  sanitizeString,
};