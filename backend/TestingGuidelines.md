
# Testing Guidelines for UltimateHealth Backend

## Table of Contents
1. [Introduction](#introduction)
2. [Testing Setup](#testing-setup)
3. [Testing Standards](#testing-standards)
4. [Unit Testing](#unit-testing)
5. [Integration Testing](#integration-testing)
6. [API Testing](#api-testing)
7. [Database Testing](#database-testing)
8. [Socket.io Testing](#socketio-testing)
9. [File Upload Testing](#file-upload-testing)
10. [Security Testing](#security-testing)
11. [Test Data Management](#test-data-management)
12. [CI/CD Integration](#cicd-integration)
13. [Best Practices](#best-practices)

---

## Introduction

This document provides comprehensive testing guidelines for the UltimateHealth backend application. The project currently has 158+ API endpoints.

**Project Overview:**
- **Framework:** Node.js with Express.js 4.21.1
- **Database:** MongoDB with Mongoose 8.3.4
- **Authentication:** JWT-based (User & Admin roles)
- **Real-time:** Socket.io 4.2.0
- **File Storage:** AWS S3-compatible (Vultr)
- **API Endpoints:** 158+ endpoints across 16 route files

---

## Testing Setup

### 1. Install Testing Dependencies

```bash
# Core testing frameworks
npm install --save-dev jest supertest

# MongoDB testing utilities
npm install --save-dev mongodb-memory-server

# Mocking utilities
npm install --save-dev jest-mock-extended

# Socket.io testing
npm install --save-dev socket.io-client

# Code coverage
npm install --save-dev @jest/globals
```

### 2. Configure Jest

Create `jest.config.js` in the project root:

```javascript
module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'controllers/**/*.js',
    'services/**/*.js',
    'middleware/**/*.js',
    'utils/**/*.js',
    '!**/node_modules/**',
    '!**/coverage/**'
  ],
  testMatch: [
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).js'
  ],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  testTimeout: 10000,
  verbose: true,
  forceExit: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
};
```

### 3. Update package.json Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:unit": "jest --testPathPattern=unit",
    "test:integration": "jest --testPathPattern=integration",
    "test:api": "jest --testPathPattern=api",
    "test:verbose": "jest --verbose --detectOpenHandles"
  }
}
```

### 4. Create Test Directory Structure

```
backend_ultimatehealth/
├── tests/
│   ├── setup.js                    # Global test setup
│   ├── teardown.js                 # Global test cleanup
│   ├── helpers/
│   │   ├── testDb.js              # MongoDB test helpers
│   │   ├── authHelper.js          # Auth token generation
│   │   └── mockData.js            # Test data factories
│   ├── unit/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── utils/
│   ├── integration/
│   │   ├── auth/
│   │   ├── articles/
│   │   ├── podcasts/
│   │   └── users/
│   ├── api/
│   │   ├── userRoutes.test.js
│   │   ├── articleRoutes.test.js
│   │   ├── podcastRoutes.test.js
│   │   └── adminRoutes.test.js
│   └── socket/
│       └── notifications.test.js
```

### 5. Create Global Test Setup

**tests/setup.js:**
```javascript
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});

// Set test environment variables
process.env.NODE_ENV = 'test';
process.env.JWT_ACCESS_SECRET = 'test-access-secret';
process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
process.env.JWT_VERIFICATION_SECRET = 'test-verification-secret';
```

**tests/helpers/testDb.js:**
```javascript
const mongoose = require('mongoose');

class TestDb {
  static async clearDatabase() {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  }

  static async closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  static isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }
}

module.exports = TestDb;
```

**tests/helpers/authHelper.js:**
```javascript
const { generateAccessToken, generateRefreshToken } = require('../../services/security/tokenService');
const User = require('../../models/UserModel');
const Admin = require('../../models/admin/adminModel');

class AuthHelper {
  static async createTestUser(userData = {}) {
    const defaultUser = {
      user_name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword123',
      user_handle: 'testuser',
      isverified: true,
      ...userData
    };

    const user = new User(defaultUser);
    await user.save();
    return user;
  }

  static async createTestAdmin(adminData = {}) {
    const defaultAdmin = {
      name: 'Test Admin',
      email: 'admin@example.com',
      password: 'hashedpassword123',
      role: 'reviewer',
      ...adminData
    };

    const admin = new Admin(defaultAdmin);
    await admin.save();
    return admin;
  }

  static generateUserTokens(user) {
    const payload = {
      userId: user._id,
      role: 'user',
      email: user.email
    };

    return {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload)
    };
  }

  static generateAdminTokens(admin) {
    const payload = {
      userId: admin._id,
      role: 'admin',
      email: admin.email
    };

    return {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload)
    };
  }
}

module.exports = AuthHelper;
```

**tests/helpers/mockData.js:**
```javascript
const mongoose = require('mongoose');

class MockData {
  static createArticleData(overrides = {}) {
    return {
      title: 'Test Article Title',
      description: 'Test article description',
      content: 'Test article content with at least 100 characters to meet validation requirements.',
      authorId: new mongoose.Types.ObjectId(),
      tags: [new mongoose.Types.ObjectId()],
      status: 'unassigned',
      ...overrides
    };
  }

  static createPodcastData(overrides = {}) {
    return {
      title: 'Test Podcast',
      description: 'Test podcast description',
      audioUrl: 'https://example.com/audio.mp3',
      duration: 1800,
      creatorId: new mongoose.Types.ObjectId(),
      status: 'in-progress',
      ...overrides
    };
  }

  static createUserData(overrides = {}) {
    const random = Math.floor(Math.random() * 10000);
    return {
      user_name: `Test User ${random}`,
      email: `test${random}@example.com`,
      password: 'Password123!',
      user_handle: `testuser${random}`,
      isverified: true,
      ...overrides
    };
  }

  static createCommentData(overrides = {}) {
    return {
      userId: new mongoose.Types.ObjectId(),
      articleId: new mongoose.Types.ObjectId(),
      content: 'This is a test comment',
      status: 'Active',
      ...overrides
    };
  }
}

module.exports = MockData;
```

---

## Testing Standards

### Code Coverage Targets

| Component | Minimum Coverage | Target Coverage |
|-----------|------------------|-----------------|
| Controllers | 70% | 85% |
| Services | 80% | 95% |
| Middleware | 75% | 90% |
| Utils | 85% | 95% |
| Routes | 60% | 80% |
| **Overall** | **70%** | **85%** |

### Test Naming Conventions

```javascript
describe('Component/Function Name', () => {
  describe('Method/Function', () => {
    it('should perform expected behavior when condition is met', () => {
      // Test implementation
    });

    it('should throw error when invalid input provided', () => {
      // Test implementation
    });
  });
});
```

### Test Structure (AAA Pattern)

```javascript
it('should create a new article successfully', async () => {
  // Arrange: Set up test data and conditions
  const user = await AuthHelper.createTestUser();
  const articleData = MockData.createArticleData({ authorId: user._id });

  // Act: Execute the function being tested
  const article = await createArticle(articleData);

  // Assert: Verify the results
  expect(article).toBeDefined();
  expect(article.title).toBe(articleData.title);
  expect(article.authorId.toString()).toBe(user._id.toString());
});
```

---

## Unit Testing

Unit tests focus on testing individual functions and methods in isolation.

### 1. Service Layer Testing

**Example: tests/unit/services/tokenService.test.js**

```javascript
const {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
} = require('../../../services/security/tokenService');

describe('Token Service', () => {
  const mockPayload = {
    userId: '507f1f77bcf86cd799439011',
    role: 'user',
    email: 'test@example.com'
  };

  describe('generateAccessToken', () => {
    it('should generate a valid JWT access token', () => {
      const token = generateAccessToken(mockPayload);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    it('should include correct payload in token', () => {
      const token = generateAccessToken(mockPayload);
      const decoded = verifyAccessToken(token);

      expect(decoded.userId).toBe(mockPayload.userId);
      expect(decoded.role).toBe(mockPayload.role);
      expect(decoded.email).toBe(mockPayload.email);
    });
  });

  describe('verifyAccessToken', () => {
    it('should verify valid access token', () => {
      const token = generateAccessToken(mockPayload);
      const decoded = verifyAccessToken(token);

      expect(decoded).toBeDefined();
      expect(decoded.userId).toBe(mockPayload.userId);
    });

    it('should throw error for invalid token', () => {
      const invalidToken = 'invalid.token.here';

      expect(() => verifyAccessToken(invalidToken)).toThrow();
    });

    it('should throw error for expired token', () => {
      // Mock an expired token scenario
      const expiredToken = generateAccessToken(mockPayload, '0s');

      setTimeout(() => {
        expect(() => verifyAccessToken(expiredToken)).toThrow();
      }, 100);
    });
  });

  describe('generateRefreshToken', () => {
    it('should generate refresh token with longer expiry', () => {
      const token = generateRefreshToken(mockPayload);
      const decoded = verifyRefreshToken(token);

      expect(decoded).toBeDefined();
      expect(decoded.exp).toBeGreaterThan(Date.now() / 1000 + 86400); // > 1 day
    });
  });
});
```

**Example: tests/unit/services/encryptService.test.js**

```javascript
const { hashPassword, comparePassword } = require('../../../services/security/encryptService');

describe('Encrypt Service', () => {
  describe('hashPassword', () => {
    it('should hash a password successfully', async () => {
      const password = 'testPassword123!';
      const hashedPassword = await hashPassword(password);

      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword.length).toBeGreaterThan(20);
    });

    it('should generate different hashes for same password', async () => {
      const password = 'testPassword123!';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);

      expect(hash1).not.toBe(hash2);
    });
  });

  describe('comparePassword', () => {
    it('should return true for matching password', async () => {
      const password = 'testPassword123!';
      const hashedPassword = await hashPassword(password);
      const isMatch = await comparePassword(password, hashedPassword);

      expect(isMatch).toBe(true);
    });

    it('should return false for non-matching password', async () => {
      const password = 'testPassword123!';
      const wrongPassword = 'wrongPassword456!';
      const hashedPassword = await hashPassword(password);
      const isMatch = await comparePassword(wrongPassword, hashedPassword);

      expect(isMatch).toBe(false);
    });
  });
});
```

### 2. Middleware Testing

**Example: tests/unit/middleware/authenticateToken.test.js**

```javascript
const authenticateToken = require('../../../middleware/authentcatetoken');
const { generateAccessToken } = require('../../../services/security/tokenService');
const BlacklistedToken = require('../../../models/blackListedToken');

describe('authenticateToken Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      cookies: {},
      headers: {},
      userId: null
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  it('should authenticate valid token from cookies', async () => {
    const payload = { userId: '507f1f77bcf86cd799439011', role: 'user' };
    const token = generateAccessToken(payload);
    req.cookies.accessToken = token;

    await authenticateToken(req, res, next);

    expect(req.userId).toBe(payload.userId);
    expect(next).toHaveBeenCalled();
  });

  it('should authenticate valid token from Authorization header', async () => {
    const payload = { userId: '507f1f77bcf86cd799439011', role: 'user' };
    const token = generateAccessToken(payload);
    req.headers['authorization'] = `Bearer ${token}`;

    await authenticateToken(req, res, next);

    expect(req.userId).toBe(payload.userId);
    expect(next).toHaveBeenCalled();
  });

  it('should reject request without token', async () => {
    await authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Access token is required' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should reject blacklisted token', async () => {
    const payload = { userId: '507f1f77bcf86cd799439011', role: 'user' };
    const token = generateAccessToken(payload);

    // Mock blacklisted token
    BlacklistedToken.findOne = jest.fn().mockResolvedValue({ token });
    req.cookies.accessToken = token;

    await authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token has been revoked' });
  });

  it('should reject invalid token', async () => {
    req.cookies.accessToken = 'invalid.token.here';

    await authenticateToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});
```

### 3. Utility Function Testing

**Example: tests/unit/utils/throwError.test.js**

```javascript
const throwError = require('../../../utils/throwError');

describe('throwError Utility', () => {
  it('should throw error with correct status code and message', () => {
    const statusCode = 400;
    const code = 'VALIDATION_ERROR';
    const message = 'Invalid input';

    expect(() => {
      throwError(statusCode, code, message);
    }).toThrow();

    try {
      throwError(statusCode, code, message);
    } catch (error) {
      expect(error.statusCode).toBe(statusCode);
      expect(error.code).toBe(code);
      expect(error.message).toBe(message);
    }
  });

  it('should include details when provided', () => {
    const details = { field: 'email', reason: 'invalid format' };

    try {
      throwError(400, 'VALIDATION_ERROR', 'Invalid input', details);
    } catch (error) {
      expect(error.details).toEqual(details);
    }
  });
});
```

### 4. Model Validation Testing

**Example: tests/unit/models/UserModel.test.js**

```javascript
const User = require('../../../models/UserModel');
const mongoose = require('mongoose');

describe('User Model', () => {
  describe('Schema Validation', () => {
    it('should create user with valid data', async () => {
      const userData = {
        user_name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        user_handle: 'testuser'
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.user_name).toBe(userData.user_name);
      expect(savedUser.email).toBe(userData.email);
    });

    it('should fail without required fields', async () => {
      const user = new User({});

      let error;
      try {
        await user.save();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.errors.user_name).toBeDefined();
      expect(error.errors.email).toBeDefined();
    });

    it('should enforce unique email constraint', async () => {
      const userData = {
        user_name: 'Test User',
        email: 'duplicate@example.com',
        password: 'hashedpassword',
        user_handle: 'testuser1'
      };

      await new User(userData).save();

      const duplicateUser = new User({
        ...userData,
        user_handle: 'testuser2'
      });

      await expect(duplicateUser.save()).rejects.toThrow();
    });

    it('should set default values correctly', async () => {
      const user = new User({
        user_name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        user_handle: 'testuser'
      });

      await user.save();

      expect(user.isverified).toBe(false);
      expect(user.followers).toEqual([]);
      expect(user.following).toEqual([]);
      expect(user.created_at).toBeDefined();
    });
  });
});
```

---

## Integration Testing

Integration tests verify that multiple components work together correctly.

### 1. Authentication Flow Testing

**Example: tests/integration/auth/userAuth.test.js**

```javascript
const request = require('supertest');
const app = require('../../../index'); // Export app from index.js
const User = require('../../../models/UserModel');
const { hashPassword } = require('../../../services/security/encryptService');

describe('User Authentication Integration', () => {
  describe('POST /api/user/register', () => {
    it('should register a new user successfully', async () => {
      const userData = {
        user_name: 'New User',
        email: 'newuser@example.com',
        password: 'Password123!',
        user_handle: 'newuser',
        dob: '1990-01-01'
      };

      const response = await request(app)
        .post('/api/user/register')
        .send(userData)
        .expect(201);

      expect(response.body.message).toBeDefined();
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe(userData.email);

      // Verify user was created in database
      const user = await User.findOne({ email: userData.email });
      expect(user).toBeDefined();
      expect(user.isverified).toBe(false);
    });

    it('should reject registration with existing email', async () => {
      const userData = {
        user_name: 'Existing User',
        email: 'existing@example.com',
        password: 'Password123!',
        user_handle: 'existinguser'
      };

      await new User({
        ...userData,
        password: await hashPassword(userData.password)
      }).save();

      const response = await request(app)
        .post('/api/user/register')
        .send(userData)
        .expect(400);

      expect(response.body.error).toBeDefined();
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/user/register')
        .send({ email: 'test@example.com' })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });

  describe('POST /api/user/login', () => {
    beforeEach(async () => {
      const password = await hashPassword('Password123!');
      await new User({
        user_name: 'Login User',
        email: 'login@example.com',
        password: password,
        user_handle: 'loginuser',
        isverified: true
      }).save();
    });

    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .send({
          email: 'login@example.com',
          password: 'Password123!'
        })
        .expect(200);

      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
      expect(response.body.user).toBeDefined();
    });

    it('should reject login with invalid password', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .send({
          email: 'login@example.com',
          password: 'WrongPassword!'
        })
        .expect(401);

      expect(response.body.error).toBeDefined();
    });

    it('should reject login for non-existent user', async () => {
      const response = await request(app)
        .post('/api/user/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'Password123!'
        })
        .expect(404);

      expect(response.body.error).toBeDefined();
    });

    it('should reject login for unverified user', async () => {
      await new User({
        user_name: 'Unverified User',
        email: 'unverified@example.com',
        password: await hashPassword('Password123!'),
        user_handle: 'unverified',
        isverified: false
      }).save();

      const response = await request(app)
        .post('/api/user/login')
        .send({
          email: 'unverified@example.com',
          password: 'Password123!'
        })
        .expect(403);

      expect(response.body.error).toContain('not verified');
    });
  });

  describe('POST /api/user/logout', () => {
    it('should logout successfully with valid token', async () => {
      const user = await new User({
        user_name: 'Logout User',
        email: 'logout@example.com',
        password: await hashPassword('Password123!'),
        user_handle: 'logoutuser',
        isverified: true
      }).save();

      const loginResponse = await request(app)
        .post('/api/user/login')
        .send({
          email: 'logout@example.com',
          password: 'Password123!'
        });

      const { accessToken } = loginResponse.body;

      const response = await request(app)
        .post('/api/user/logout')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body.message).toContain('Logged out');
    });
  });
});
```

### 2. Article Management Integration Tests

**Example: tests/integration/articles/articleCRUD.test.js**

```javascript
const request = require('supertest');
const app = require('../../../index');
const AuthHelper = require('../../helpers/authHelper');
const MockData = require('../../helpers/mockData');
const Article = require('../../../models/Articles');
const ArticleTag = require('../../../models/ArticleModel');

describe('Article Management Integration', () => {
  let user, userToken, admin, adminToken, tag;

  beforeEach(async () => {
    user = await AuthHelper.createTestUser();
    userToken = AuthHelper.generateUserTokens(user).accessToken;

    admin = await AuthHelper.createTestAdmin({ role: 'admin' });
    adminToken = AuthHelper.generateAdminTokens(admin).accessToken;

    tag = await new ArticleTag({ tag_name: 'Health' }).save();
  });

  describe('POST /api/articles', () => {
    it('should create article successfully', async () => {
      const articleData = {
        title: 'New Health Article',
        description: 'Article description',
        content: 'Article content with sufficient length to meet validation requirements.',
        tags: [tag._id.toString()]
      };

      const response = await request(app)
        .post('/api/articles')
        .set('Authorization', `Bearer ${userToken}`)
        .send(articleData)
        .expect(201);

      expect(response.body.article).toBeDefined();
      expect(response.body.article.title).toBe(articleData.title);
      expect(response.body.article.status).toBe('unassigned');
      expect(response.body.article.authorId.toString()).toBe(user._id.toString());
    });

    it('should reject article creation without authentication', async () => {
      const articleData = MockData.createArticleData();

      await request(app)
        .post('/api/articles')
        .send(articleData)
        .expect(401);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/articles')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ title: 'Only Title' })
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /api/articles/:id', () => {
    it('should retrieve article by ID', async () => {
      const article = await new Article({
        ...MockData.createArticleData({
          authorId: user._id,
          tags: [tag._id],
          status: 'published'
        })
      }).save();

      const response = await request(app)
        .get(`/api/articles/${article._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.article._id).toBe(article._id.toString());
      expect(response.body.article.title).toBe(article.title);
    });

    it('should return 404 for non-existent article', async () => {
      const fakeId = '507f1f77bcf86cd799439011';

      await request(app)
        .get(`/api/articles/${fakeId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(404);
    });
  });

  describe('PUT /api/articles/:id', () => {
    it('should update own article', async () => {
      const article = await new Article({
        ...MockData.createArticleData({
          authorId: user._id,
          tags: [tag._id]
        })
      }).save();

      const updateData = {
        title: 'Updated Article Title',
        description: 'Updated description'
      };

      const response = await request(app)
        .put(`/api/articles/${article._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.article.title).toBe(updateData.title);
      expect(response.body.article.description).toBe(updateData.description);
    });

    it('should reject update of another user\'s article', async () => {
      const otherUser = await AuthHelper.createTestUser({
        email: 'other@example.com',
        user_handle: 'otheruser'
      });

      const article = await new Article({
        ...MockData.createArticleData({
          authorId: otherUser._id,
          tags: [tag._id]
        })
      }).save();

      await request(app)
        .put(`/api/articles/${article._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ title: 'Hacked Title' })
        .expect(403);
    });
  });

  describe('POST /api/articles/:id/like', () => {
    it('should like an article', async () => {
      const article = await new Article({
        ...MockData.createArticleData({
          authorId: user._id,
          tags: [tag._id],
          status: 'published'
        })
      }).save();

      const response = await request(app)
        .post(`/api/articles/${article._id}/like`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.message).toContain('liked');

      // Verify like was saved
      const updatedArticle = await Article.findById(article._id);
      expect(updatedArticle.likes).toBe(1);
    });

    it('should unlike an already liked article', async () => {
      const article = await new Article({
        ...MockData.createArticleData({
          authorId: user._id,
          tags: [tag._id],
          status: 'published',
          likes: 1
        })
      }).save();

      // First like
      await request(app)
        .post(`/api/articles/${article._id}/like`)
        .set('Authorization', `Bearer ${userToken}`);

      // Unlike
      const response = await request(app)
        .post(`/api/articles/${article._id}/like`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.message).toContain('unliked');
    });
  });

  describe('DELETE /api/articles/:id', () => {
    it('should delete own article', async () => {
      const article = await new Article({
        ...MockData.createArticleData({
          authorId: user._id,
          tags: [tag._id]
        })
      }).save();

      await request(app)
        .delete(`/api/articles/${article._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      // Verify deletion
      const deletedArticle = await Article.findById(article._id);
      expect(deletedArticle).toBeNull();
    });
  });
});
```

### 3. User Social Features Integration Tests

**Example: tests/integration/users/socialFeatures.test.js**

```javascript
const request = require('supertest');
const app = require('../../../index');
const AuthHelper = require('../../helpers/authHelper');

describe('User Social Features Integration', () => {
  let user1, user1Token, user2, user2Token;

  beforeEach(async () => {
    user1 = await AuthHelper.createTestUser({
      email: 'user1@example.com',
      user_handle: 'user1'
    });
    user1Token = AuthHelper.generateUserTokens(user1).accessToken;

    user2 = await AuthHelper.createTestUser({
      email: 'user2@example.com',
      user_handle: 'user2'
    });
    user2Token = AuthHelper.generateUserTokens(user2).accessToken;
  });

  describe('POST /api/user/follow', () => {
    it('should follow another user successfully', async () => {
      const response = await request(app)
        .post('/api/user/follow')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({ targetUserId: user2._id.toString() })
        .expect(200);

      expect(response.body.message).toContain('followed');

      // Verify follow relationship
      const updatedUser1 = await User.findById(user1._id);
      const updatedUser2 = await User.findById(user2._id);

      expect(updatedUser1.following).toContain(user2._id);
      expect(updatedUser2.followers).toContain(user1._id);
    });

    it('should unfollow a followed user', async () => {
      // First follow
      await request(app)
        .post('/api/user/follow')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({ targetUserId: user2._id.toString() });

      // Then unfollow
      const response = await request(app)
        .post('/api/user/follow')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({ targetUserId: user2._id.toString() })
        .expect(200);

      expect(response.body.message).toContain('unfollowed');
    });

    it('should reject following non-existent user', async () => {
      const fakeId = '507f1f77bcf86cd799439011';

      await request(app)
        .post('/api/user/follow')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({ targetUserId: fakeId })
        .expect(404);
    });

    it('should reject following yourself', async () => {
      await request(app)
        .post('/api/user/follow')
        .set('Authorization', `Bearer ${user1Token}`)
        .send({ targetUserId: user1._id.toString() })
        .expect(400);
    });
  });

  describe('GET /api/user/socials', () => {
    beforeEach(async () => {
      // Create follow relationship
      user1.following.push(user2._id);
      user2.followers.push(user1._id);
      await user1.save();
      await user2.save();
    });

    it('should retrieve followers list', async () => {
      const response = await request(app)
        .get('/api/user/socials')
        .query({ type: 'followers' })
        .set('Authorization', `Bearer ${user2Token}`)
        .expect(200);

      expect(response.body.users).toHaveLength(1);
      expect(response.body.users[0]._id).toBe(user1._id.toString());
    });

    it('should retrieve following list', async () => {
      const response = await request(app)
        .get('/api/user/socials')
        .query({ type: 'following' })
        .set('Authorization', `Bearer ${user1Token}`)
        .expect(200);

      expect(response.body.users).toHaveLength(1);
      expect(response.body.users[0]._id).toBe(user2._id.toString());
    });
  });
});
```

---

## API Testing

API tests verify complete request-response cycles for all endpoints.

### 1. API Test Template

```javascript
const request = require('supertest');
const app = require('../../index');

describe('API: /api/resource', () => {
  let authToken;

  beforeAll(async () => {
    // Setup: Create test user and get auth token
  });

  afterAll(async () => {
    // Cleanup: Remove test data
  });

  describe('GET /api/resource', () => {
    it('should return 200 OK with valid data', async () => {
      const response = await request(app)
        .get('/api/resource')
        .set('Authorization', `Bearer ${authToken}`)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toBeDefined();
    });

    it('should return 401 Unauthorized without token', async () => {
      await request(app)
        .get('/api/resource')
        .expect(401);
    });
  });

  describe('POST /api/resource', () => {
    it('should create resource with valid data', async () => {
      const data = { /* valid data */ };

      const response = await request(app)
        .post('/api/resource')
        .set('Authorization', `Bearer ${authToken}`)
        .send(data)
        .expect(201);

      expect(response.body.id).toBeDefined();
    });

    it('should return 400 Bad Request with invalid data', async () => {
      const invalidData = { /* invalid data */ };

      const response = await request(app)
        .post('/api/resource')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidData)
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });
});
```

### 2. Comprehensive Route Testing Matrix

For each endpoint, test the following scenarios:

| Test Scenario | Expected Status | Description |
|--------------|----------------|-------------|
| **Happy Path** | 200/201 | Valid request with proper authentication |
| **Authentication** | 401 | Missing/invalid authentication token |
| **Authorization** | 403 | Valid token but insufficient permissions |
| **Validation** | 400 | Invalid or missing required fields |
| **Not Found** | 404 | Resource doesn't exist |
| **Conflict** | 409 | Duplicate resource creation |
| **Server Error** | 500 | Database or system error |

### 3. Admin Routes Testing

**Example: tests/api/adminRoutes.test.js**

```javascript
const request = require('supertest');
const app = require('../../index');
const AuthHelper = require('../helpers/authHelper');
const Article = require('../../models/Articles');

describe('API: Admin Routes', () => {
  let admin, adminToken, reviewer, reviewerToken, user, userToken;

  beforeEach(async () => {
    admin = await AuthHelper.createTestAdmin({ role: 'admin' });
    adminToken = AuthHelper.generateAdminTokens(admin).accessToken;

    reviewer = await AuthHelper.createTestAdmin({
      email: 'reviewer@example.com',
      role: 'reviewer'
    });
    reviewerToken = AuthHelper.generateAdminTokens(reviewer).accessToken;

    user = await AuthHelper.createTestUser();
    userToken = AuthHelper.generateUserTokens(user).accessToken;
  });

  describe('POST /api/admin/login', () => {
    it('should login admin with valid credentials', async () => {
      const response = await request(app)
        .post('/api/admin/login')
        .send({
          email: admin.email,
          password: 'Password123!'
        })
        .expect(200);

      expect(response.body.accessToken).toBeDefined();
      expect(response.body.admin.role).toBe('admin');
    });

    it('should reject regular user login on admin endpoint', async () => {
      await request(app)
        .post('/api/admin/login')
        .send({
          email: user.email,
          password: 'Password123!'
        })
        .expect(401);
    });
  });

  describe('GET /api/admin/articles/review-pending', () => {
    beforeEach(async () => {
      await new Article({
        title: 'Pending Review Article',
        description: 'Description',
        content: 'Content',
        authorId: user._id,
        status: 'review-pending',
        tags: []
      }).save();
    });

    it('should retrieve pending articles for admin', async () => {
      const response = await request(app)
        .get('/api/admin/articles/review-pending')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.articles).toBeDefined();
      expect(response.body.articles.length).toBeGreaterThan(0);
    });

    it('should allow reviewer access', async () => {
      const response = await request(app)
        .get('/api/admin/articles/review-pending')
        .set('Authorization', `Bearer ${reviewerToken}`)
        .expect(200);

      expect(response.body.articles).toBeDefined();
    });

    it('should reject regular user access', async () => {
      await request(app)
        .get('/api/admin/articles/review-pending')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
    });
  });

  describe('POST /api/admin/articles/:id/approve', () => {
    let article;

    beforeEach(async () => {
      article = await new Article({
        title: 'Article to Approve',
        description: 'Description',
        content: 'Content',
        authorId: user._id,
        status: 'review-pending',
        tags: []
      }).save();
    });

    it('should approve article successfully', async () => {
      const response = await request(app)
        .post(`/api/admin/articles/${article._id}/approve`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.message).toContain('approved');

      // Verify status change
      const updatedArticle = await Article.findById(article._id);
      expect(updatedArticle.status).toBe('published');
    });
  });

  describe('GET /api/admin/analytics/monthly', () => {
    it('should retrieve monthly analytics', async () => {
      const response = await request(app)
        .get('/api/admin/analytics/monthly')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.analytics).toBeDefined();
    });
  });
});
```

---

## Database Testing

### 1. Database Operations Testing

```javascript
const mongoose = require('mongoose');
const Article = require('../../models/Articles');
const User = require('../../models/UserModel');

describe('Database Operations', () => {
  describe('Article Queries', () => {
    it('should populate author information', async () => {
      const user = await new User({
        user_name: 'Author',
        email: 'author@example.com',
        password: 'hash',
        user_handle: 'author'
      }).save();

      const article = await new Article({
        title: 'Test Article',
        description: 'Description',
        content: 'Content',
        authorId: user._id,
        tags: []
      }).save();

      const populated = await Article.findById(article._id)
        .populate('authorId', 'user_name user_handle');

      expect(populated.authorId.user_name).toBe('Author');
      expect(populated.authorId.user_handle).toBe('author');
    });

    it('should handle pagination correctly', async () => {
      // Create 15 articles
      for (let i = 0; i < 15; i++) {
        await new Article({
          title: `Article ${i}`,
          description: 'Description',
          content: 'Content',
          authorId: new mongoose.Types.ObjectId(),
          tags: []
        }).save();
      }

      const page = 2;
      const limit = 5;
      const skip = (page - 1) * limit;

      const articles = await Article.find()
        .skip(skip)
        .limit(limit);

      expect(articles).toHaveLength(5);
    });
  });

  describe('Transaction Testing', () => {
    it('should rollback on transaction failure', async () => {
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const user = new User({
          user_name: 'Transaction User',
          email: 'transaction@example.com',
          password: 'hash',
          user_handle: 'transactionuser'
        });
        await user.save({ session });

        // Intentionally cause error
        throw new Error('Simulated error');

        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
      } finally {
        session.endSession();
      }

      // Verify user was not saved
      const savedUser = await User.findOne({ email: 'transaction@example.com' });
      expect(savedUser).toBeNull();
    });
  });
});
```

### 2. Schema Validation Testing

```javascript
describe('Schema Validation', () => {
  describe('Article Schema', () => {
    it('should validate content length', async () => {
      const article = new Article({
        title: 'Title',
        description: 'Description',
        content: 'Short', // Too short
        authorId: new mongoose.Types.ObjectId(),
        tags: []
      });

      let error;
      try {
        await article.validate();
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
    });

    it('should validate enum values', async () => {
      const article = new Article({
        title: 'Title',
        description: 'Description',
        content: 'Content',
        authorId: new mongoose.Types.ObjectId(),
        status: 'invalid-status', // Not in enum
        tags: []
      });

      await expect(article.save()).rejects.toThrow();
    });
  });
});
```

---

## Socket.io Testing

### Socket.io Real-time Features Testing

**Example: tests/socket/notifications.test.js**

```javascript
const io = require('socket.io-client');
const { createServer } = require('http');
const { Server } = require('socket.io');
const AuthHelper = require('../helpers/authHelper');

describe('Socket.io Notifications', () => {
  let httpServer, ioServer, clientSocket, serverSocket;
  let user, userToken;

  beforeAll(async () => {
    user = await AuthHelper.createTestUser();
    userToken = AuthHelper.generateUserTokens(user).accessToken;

    httpServer = createServer();
    ioServer = new Server(httpServer);

    await new Promise((resolve) => {
      httpServer.listen(() => {
        const port = httpServer.address().port;
        clientSocket = io(`http://localhost:${port}`, {
          auth: { token: userToken }
        });

        ioServer.on('connection', (socket) => {
          serverSocket = socket;
        });

        clientSocket.on('connect', resolve);
      });
    });
  });

  afterAll(() => {
    ioServer.close();
    clientSocket.close();
    httpServer.close();
  });

  it('should connect with valid token', (done) => {
    expect(clientSocket.connected).toBe(true);
    done();
  });

  it('should receive notification event', (done) => {
    const notification = {
      type: 'like',
      message: 'Someone liked your article',
      userId: user._id.toString()
    };

    clientSocket.on('notification', (data) => {
      expect(data.type).toBe(notification.type);
      expect(data.message).toBe(notification.message);
      done();
    });

    serverSocket.emit('notification', notification);
  });

  it('should join article room', (done) => {
    const articleId = '507f1f77bcf86cd799439011';

    clientSocket.emit('join-article', { articleId });

    setTimeout(() => {
      expect(serverSocket.rooms.has(`article-${articleId}`)).toBe(true);
      done();
    }, 100);
  });

  it('should broadcast to room members', (done) => {
    const articleId = '507f1f77bcf86cd799439011';
    const comment = { content: 'New comment', userId: user._id };

    clientSocket.emit('join-article', { articleId });

    clientSocket.on('new-comment', (data) => {
      expect(data.content).toBe(comment.content);
      done();
    });

    setTimeout(() => {
      ioServer.to(`article-${articleId}`).emit('new-comment', comment);
    }, 100);
  });
});
```

---

## File Upload Testing

### Testing File Upload Functionality

**Example: tests/integration/upload/fileUpload.test.js**

```javascript
const request = require('supertest');
const app = require('../../../index');
const path = require('path');
const fs = require('fs');
const AuthHelper = require('../../helpers/authHelper');

describe('File Upload Integration', () => {
  let user, userToken;
  const testImagePath = path.join(__dirname, '../../fixtures/test-image.jpg');

  beforeAll(() => {
    // Create test image if doesn't exist
    if (!fs.existsSync(testImagePath)) {
      const buffer = Buffer.from('fake-image-data');
      fs.writeFileSync(testImagePath, buffer);
    }
  });

  beforeEach(async () => {
    user = await AuthHelper.createTestUser();
    userToken = AuthHelper.generateUserTokens(user).accessToken;
  });

  describe('POST /api/user/update-profile-image', () => {
    it('should upload profile image successfully', async () => {
      const response = await request(app)
        .post('/api/user/update-profile-image')
        .set('Authorization', `Bearer ${userToken}`)
        .attach('image', testImagePath)
        .expect(200);

      expect(response.body.message).toContain('updated');
      expect(response.body.imageUrl).toBeDefined();
    });

    it('should reject non-image file', async () => {
      const textFilePath = path.join(__dirname, '../../fixtures/test.txt');
      fs.writeFileSync(textFilePath, 'test content');

      await request(app)
        .post('/api/user/update-profile-image')
        .set('Authorization', `Bearer ${userToken}`)
        .attach('image', textFilePath)
        .expect(400);

      fs.unlinkSync(textFilePath);
    });

    it('should reject oversized file', async () => {
      // Mock a large file scenario
      const largeFile = Buffer.alloc(10 * 1024 * 1024); // 10MB
      const largePath = path.join(__dirname, '../../fixtures/large.jpg');
      fs.writeFileSync(largePath, largeFile);

      await request(app)
        .post('/api/user/update-profile-image')
        .set('Authorization', `Bearer ${userToken}`)
        .attach('image', largePath)
        .expect(400);

      fs.unlinkSync(largePath);
    });
  });

  describe('POST /api/articles with image', () => {
    it('should create article with cover image', async () => {
      const response = await request(app)
        .post('/api/articles')
        .set('Authorization', `Bearer ${userToken}`)
        .field('title', 'Article with Image')
        .field('description', 'Description')
        .field('content', 'Article content with sufficient length')
        .field('tags', '[]')
        .attach('coverImage', testImagePath)
        .expect(201);

      expect(response.body.article.coverImage).toBeDefined();
    });
  });

  describe('POST /api/podcast/create with audio', () => {
    it('should upload podcast audio file', async () => {
      const audioPath = path.join(__dirname, '../../fixtures/test-audio.mp3');
      fs.writeFileSync(audioPath, Buffer.from('fake-audio-data'));

      const response = await request(app)
        .post('/api/podcast/create')
        .set('Authorization', `Bearer ${userToken}`)
        .field('title', 'Test Podcast')
        .field('description', 'Podcast description')
        .field('duration', '1800')
        .attach('audio', audioPath)
        .expect(201);

      expect(response.body.podcast.audioUrl).toBeDefined();

      fs.unlinkSync(audioPath);
    });
  });
});
```

---

## Security Testing

### 1. Authentication Security Tests

```javascript
describe('Security: Authentication', () => {
  describe('Token Security', () => {
    it('should reject expired tokens', async () => {
      // Generate token with immediate expiry
      const payload = { userId: '507f1f77bcf86cd799439011' };
      const expiredToken = generateAccessToken(payload, '0s');

      await new Promise(resolve => setTimeout(resolve, 100));

      await request(app)
        .get('/api/user/getprofile')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(403);
    });

    it('should reject tampered tokens', async () => {
      const validToken = generateAccessToken({ userId: '123' });
      const tamperedToken = validToken.slice(0, -5) + 'XXXXX';

      await request(app)
        .get('/api/user/getprofile')
        .set('Authorization', `Bearer ${tamperedToken}`)
        .expect(403);
    });

    it('should reject tokens after logout (blacklist)', async () => {
      const user = await AuthHelper.createTestUser();
      const tokens = AuthHelper.generateUserTokens(user);

      // Logout to blacklist token
      await request(app)
        .post('/api/user/logout')
        .set('Authorization', `Bearer ${tokens.accessToken}`);

      // Try to use blacklisted token
      await request(app)
        .get('/api/user/getprofile')
        .set('Authorization', `Bearer ${tokens.accessToken}`)
        .expect(401);
    });
  });

  describe('Password Security', () => {
    it('should enforce password complexity', async () => {
      const weakPasswords = [
        'short',           // Too short
        'alllowercase',    // No uppercase/numbers
        'ALLUPPERCASE',    // No lowercase/numbers
        '12345678',        // No letters
        'NoSpecial123'     // No special chars (if required)
      ];

      for (const password of weakPasswords) {
        const response = await request(app)
          .post('/api/user/register')
          .send({
            user_name: 'Test',
            email: 'test@example.com',
            password: password,
            user_handle: 'test'
          });

        expect(response.status).toBeGreaterThanOrEqual(400);
      }
    });

    it('should hash passwords before storage', async () => {
      const password = 'Password123!';
      const user = await new User({
        user_name: 'Test',
        email: 'test@example.com',
        password: await hashPassword(password),
        user_handle: 'test'
      }).save();

      expect(user.password).not.toBe(password);
      expect(user.password.length).toBeGreaterThan(20);
    });
  });

  describe('SQL/NoSQL Injection Prevention', () => {
    it('should sanitize user input', async () => {
      const user = await AuthHelper.createTestUser();
      const token = AuthHelper.generateUserTokens(user).accessToken;

      const maliciousInput = { $ne: null }; // MongoDB injection attempt

      const response = await request(app)
        .get('/api/articles')
        .query({ tags: JSON.stringify(maliciousInput) })
        .set('Authorization', `Bearer ${token}`);

      // Should handle gracefully without exposing data
      expect(response.status).toBeLessThan(500);
    });
  });

  describe('Rate Limiting', () => {
    it('should rate limit excessive requests', async () => {
      const requests = [];

      // Send 100 rapid requests
      for (let i = 0; i < 100; i++) {
        requests.push(
          request(app)
            .post('/api/user/login')
            .send({ email: 'test@example.com', password: 'wrong' })
        );
      }

      const responses = await Promise.all(requests);
      const rateLimited = responses.some(r => r.status === 429);

      expect(rateLimited).toBe(true);
    });
  });

  describe('CORS Configuration', () => {
    it('should have proper CORS headers', async () => {
      const response = await request(app)
        .options('/api/user/register')
        .set('Origin', 'http://localhost:3000');

      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });
});
```

### 2. Authorization Tests

```javascript
describe('Security: Authorization', () => {
  describe('Role-Based Access Control', () => {
    let user, userToken, admin, adminToken;

    beforeEach(async () => {
      user = await AuthHelper.createTestUser();
      userToken = AuthHelper.generateUserTokens(user).accessToken;

      admin = await AuthHelper.createTestAdmin();
      adminToken = AuthHelper.generateAdminTokens(admin).accessToken;
    });

    it('should restrict admin endpoints to admins only', async () => {
      await request(app)
        .get('/api/admin/analytics/monthly')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);

      await request(app)
        .get('/api/admin/analytics/monthly')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);
    });

    it('should prevent users from modifying others\' content', async () => {
      const otherUser = await AuthHelper.createTestUser({
        email: 'other@example.com',
        user_handle: 'other'
      });

      const article = await new Article({
        title: 'Other User Article',
        description: 'Description',
        content: 'Content',
        authorId: otherUser._id,
        tags: []
      }).save();

      await request(app)
        .delete(`/api/articles/${article._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
    });
  });

  describe('Resource Ownership', () => {
    it('should verify ownership before deletion', async () => {
      const user1 = await AuthHelper.createTestUser();
      const user2 = await AuthHelper.createTestUser({
        email: 'user2@example.com',
        user_handle: 'user2'
      });

      const token1 = AuthHelper.generateUserTokens(user1).accessToken;
      const token2 = AuthHelper.generateUserTokens(user2).accessToken;

      // User1 creates article
      const createResponse = await request(app)
        .post('/api/articles')
        .set('Authorization', `Bearer ${token1}`)
        .send({
          title: 'User1 Article',
          description: 'Description',
          content: 'Content',
          tags: []
        });

      const articleId = createResponse.body.article._id;

      // User2 tries to delete User1's article
      await request(app)
        .delete(`/api/articles/${articleId}`)
        .set('Authorization', `Bearer ${token2}`)
        .expect(403);

      // User1 can delete own article
      await request(app)
        .delete(`/api/articles/${articleId}`)
        .set('Authorization', `Bearer ${token1}`)
        .expect(200);
    });
  });
});
```

---

## Test Data Management

### 1. Test Fixtures

Create reusable test data in `tests/fixtures/`:

**tests/fixtures/users.json:**
```json
{
  "validUser": {
    "user_name": "John Doe",
    "email": "john@example.com",
    "password": "Password123!",
    "user_handle": "johndoe",
    "dob": "1990-01-01"
  },
  "doctorUser": {
    "user_name": "Dr. Jane Smith",
    "email": "dr.jane@example.com",
    "password": "Password123!",
    "user_handle": "drjane",
    "isDoctor": true,
    "specialization": "Cardiology"
  }
}
```

**tests/fixtures/articles.json:**
```json
{
  "validArticle": {
    "title": "Understanding Heart Health",
    "description": "A comprehensive guide to maintaining heart health",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    "tags": ["cardiology", "health"]
  }
}
```

### 2. Database Seeding

**tests/helpers/seed.js:**
```javascript
const User = require('../../models/UserModel');
const Article = require('../../models/Articles');
const ArticleTag = require('../../models/ArticleModel');
const { hashPassword } = require('../../services/security/encryptService');

class DatabaseSeeder {
  static async seedUsers(count = 10) {
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push({
        user_name: `User ${i}`,
        email: `user${i}@example.com`,
        password: await hashPassword('Password123!'),
        user_handle: `user${i}`,
        isverified: true
      });
    }
    return await User.insertMany(users);
  }

  static async seedArticles(authorId, count = 5) {
    const articles = [];
    for (let i = 0; i < count; i++) {
      articles.push({
        title: `Article ${i}`,
        description: `Description for article ${i}`,
        content: `Content for article ${i}`.repeat(10),
        authorId: authorId,
        status: 'published',
        tags: []
      });
    }
    return await Article.insertMany(articles);
  }

  static async seedTags() {
    const tags = ['Cardiology', 'Neurology', 'Pediatrics', 'Oncology'];
    const tagDocs = tags.map(tag => ({ tag_name: tag }));
    return await ArticleTag.insertMany(tagDocs);
  }

  static async seedAll() {
    const users = await this.seedUsers(10);
    await this.seedTags();
    await this.seedArticles(users[0]._id, 20);
    return { users };
  }
}

module.exports = DatabaseSeeder;
```

---

## CI/CD Integration

### 1. GitHub Actions Workflow

Create `.github/workflows/test.yml`:

```yaml
name: Run Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    services:
      mongodb:
        image: mongo:7
        ports:
          - 27017:27017
        options: >-
          --health-cmd "mongosh --eval 'db.adminCommand({ ping: 1 })'"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
    - uses: actions/checkout@v3

    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run linter
      run: npm run lint --if-present

    - name: Run unit tests
      run: npm run test:unit
      env:
        NODE_ENV: test
        MONGODB_URL: mongodb://localhost:27017/test

    - name: Run integration tests
      run: npm run test:integration
      env:
        NODE_ENV: test
        MONGODB_URL: mongodb://localhost:27017/test

    - name: Run API tests
      run: npm run test:api
      env:
        NODE_ENV: test
        MONGODB_URL: mongodb://localhost:27017/test

    - name: Generate coverage report
      run: npm run test:coverage

    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/coverage-final.json
        flags: unittests
        name: codecov-umbrella

    - name: Archive test results
      if: always()
      uses: actions/upload-artifact@v3
      with:
        name: test-results
        path: |
          coverage/
          test-results/
```

### 2. Pre-commit Hook

Create `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "Running tests before commit..."

npm run test:unit
if [ $? -ne 0 ]; then
  echo "Unit tests failed. Commit aborted."
  exit 1
fi

npm run test:integration
if [ $? -ne 0 ]; then
  echo "Integration tests failed. Commit aborted."
  exit 1
fi

echo "All tests passed!"
```

Install husky:
```bash
npm install --save-dev husky
npx husky install
```

---

## Best Practices

### 1. Test Organization

- **Group related tests** using `describe` blocks
- **Use meaningful test names** that describe the expected behavior
- **Follow AAA pattern**: Arrange, Act, Assert
- **Keep tests independent** - each test should run in isolation
- **Clean up after tests** - use `afterEach` and `afterAll` hooks

### 2. Test Coverage Goals

```javascript
// Focus on high-value tests first:
// 1. Critical user paths (auth, content creation)
// 2. Security features (authorization, validation)
// 3. Data integrity (transactions, relationships)
// 4. Business logic (workflows, calculations)
```

### 3. Mocking Strategy

```javascript
// Mock external services (S3, Firebase, Email)
jest.mock('../../services/emailService', () => ({
  sendVerificationEmail: jest.fn().mockResolvedValue(true),
  sendPasswordResetEmail: jest.fn().mockResolvedValue(true)
}));

// Don't mock: Database, business logic, utilities
// Do mock: External APIs, file system, time-sensitive operations
```

### 4. Async Testing

```javascript
// Always return promises or use async/await
it('should handle async operations', async () => {
  const result = await asyncFunction();
  expect(result).toBeDefined();
});

// Use done callback for event-driven tests
it('should emit event', (done) => {
  emitter.on('event', (data) => {
    expect(data).toBe('value');
    done();
  });
  emitter.emit('event', 'value');
});
```

### 5. Error Testing

```javascript
// Test both success and failure cases
it('should handle errors gracefully', async () => {
  await expect(functionThatFails()).rejects.toThrow('Expected error');
});

// Verify error messages and codes
try {
  await functionThatFails();
} catch (error) {
  expect(error.statusCode).toBe(400);
  expect(error.code).toBe('VALIDATION_ERROR');
}
```

### 6. Performance Testing

```javascript
describe('Performance', () => {
  it('should complete within acceptable time', async () => {
    const start = Date.now();
    await expensiveOperation();
    const duration = Date.now() - start;

    expect(duration).toBeLessThan(1000); // < 1 second
  });

  it('should handle concurrent requests', async () => {
    const requests = Array(100).fill().map(() =>
      request(app).get('/api/articles')
    );

    const responses = await Promise.all(requests);
    const successCount = responses.filter(r => r.status === 200).length;

    expect(successCount).toBeGreaterThan(95); // 95% success rate
  });
});
```

### 7. Test Maintenance

- **Review and update tests** when requirements change
- **Remove obsolete tests** that no longer apply
- **Refactor test code** to reduce duplication
- **Document complex test scenarios** with comments
- **Keep test data realistic** but minimal

### 8. Debugging Tests

```javascript
// Use verbose mode for detailed output
// npm run test:verbose

// Run specific test file
// npm test -- tests/unit/services/tokenService.test.js

// Run tests matching pattern
// npm test -- --testNamePattern="should authenticate"

// Debug with breakpoints
// node --inspect-brk node_modules/.bin/jest --runInBand
```

---

## Quick Start Checklist

- [ ] Install testing dependencies (`jest`, `supertest`, `mongodb-memory-server`)
- [ ] Create `jest.config.js` configuration file
- [ ] Set up test directory structure (`tests/unit`, `tests/integration`, `tests/api`)
- [ ] Create global test setup (`tests/setup.js`)
- [ ] Create test helpers (`authHelper.js`, `mockData.js`, `testDb.js`)
- [ ] Write unit tests for critical utilities (tokenService, encryptService)
- [ ] Write integration tests for authentication flow
- [ ] Write API tests for main endpoints (users, articles, podcasts)
- [ ] Set up CI/CD workflow (GitHub Actions)
- [ ] Configure code coverage reporting
- [ ] Add pre-commit hooks for automated testing
- [ ] Document testing conventions for team

---

## Additional Resources

### Testing Tools & Libraries
- **Jest**: https://jestjs.io/
- **Supertest**: https://github.com/visionmedia/supertest
- **MongoDB Memory Server**: https://github.com/nodkz/mongodb-memory-server
- **Socket.io Client**: https://socket.io/docs/v4/client-api/

### Testing Guides
- Jest Best Practices: https://github.com/goldbergyoni/javascript-testing-best-practices
- API Testing Guide: https://www.postman.com/api-testing/
- MongoDB Testing: https://www.mongodb.com/docs/manual/testing/

### Code Coverage Tools
- **Istanbul/NYC**: https://istanbul.js.org/
- **Codecov**: https://codecov.io/
- **Coveralls**: https://coveralls.io/

---

## Appendix: Test Coverage Tracking

### Current Status
- **Total Endpoints**: 158+
- **Tested Endpoints**: 0
- **Coverage**: 0%
- **Target**: 85%

### Priority Matrix

| Priority | Component | Endpoints | Status |
|----------|-----------|-----------|--------|
| P0 | Authentication | 12 | ❌ Not Started |
| P0 | Articles CRUD | 15 | ❌ Not Started |
| P0 | User Management | 10 | ❌ Not Started |
| P1 | Podcasts | 25 | ❌ Not Started |
| P1 | Admin Features | 23 | ❌ Not Started |
| P2 | Comments | 8 | ❌ Not Started |
| P2 | Notifications | 5 | ❌ Not Started |
| P3 | Analytics | 12 | ❌ Not Started |
| P3 | Other Features | 48+ | ❌ Not Started |

---

**Document Version**: 1.0
**Last Updated**: 2026-04-13
**Maintained By**: Backend Development Team
