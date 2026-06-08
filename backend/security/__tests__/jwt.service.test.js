/**
 * JWT Service Tests
 */

const jwt = require('jsonwebtoken');

// Mock the config and models
jest.mock('../config/jwt.config', () => ({
  accessToken: {
    expiresIn: '15m',
    algorithm: 'HS256',
    issuer: 'ultimatehealth-api',
    audience: 'ultimatehealth-app',
  },
  refreshToken: {
    expiresIn: '7d',
    algorithm: 'HS256',
    issuer: 'ultimatehealth-api',
  },
  secrets: {
    accessSecret: 'test-access-secret',
    refreshSecret: 'test-refresh-secret',
  },
  payload: {
    includeDeviceFingerprint: true,
    includeUserAgent: true,
    includeIPAddress: true,
  },
  security: {
    enableRotation: true,
    maxTokensPerUser: 5,
  },
}));

// Mock User model
jest.mock('../../models/user.model', () => ({
  findById: jest.fn(),
}));

// Mock RefreshToken model
jest.mock('../models/refresh-token.model', () => {
  const mockSave = jest.fn().mockResolvedValue(true);
  const MockRefreshToken = jest.fn().mockImplementation((data) => ({
    ...data,
    save: mockSave,
  }));
  MockRefreshToken.findOne = jest.fn();
  MockRefreshToken.countDocuments = jest.fn();
  MockRefreshToken.findOneAndUpdate = jest.fn();
  MockRefreshToken.updateMany = jest.fn();
  return MockRefreshToken;
});

const jwtService = require('../services/jwt.service');

describe('JWT Service', () => {
  const mockUser = {
    _id: { toString: () => 'user123' },
    email: 'test@example.com',
    role: 'user',
    user_handle: 'testuser',
  };

  const mockOptions = {
    deviceFingerprint: 'device123',
    userAgent: 'Mozilla/5.0',
    ipAddress: '192.168.1.1',
  };

  describe('generateAccessToken', () => {
    it('should generate a valid access token', () => {
      const token = jwtService.generateAccessToken(mockUser, mockOptions);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      
      const decoded = jwt.decode(token);
      expect(decoded.sub).toBe('user123');
      expect(decoded.email).toBe('test@example.com');
      expect(decoded.role).toBe('user');
      expect(decoded.type).toBe('access');
      expect(decoded.deviceFingerprint).toBe('device123');
    });

    it('should include userAgent if provided', () => {
      const token = jwtService.generateAccessToken(mockUser, mockOptions);
      const decoded = jwt.decode(token);
      
      expect(decoded.userAgent).toBe('Mozilla/5.0');
    });

    it('should include ipAddress if provided', () => {
      const token = jwtService.generateAccessToken(mockUser, mockOptions);
      const decoded = jwt.decode(token);
      
      expect(decoded.ipAddress).toBe('192.168.1.1');
    });

    it('should work without options', () => {
      const token = jwtService.generateAccessToken(mockUser);
      const decoded = jwt.decode(token);
      
      expect(decoded.sub).toBe('user123');
      expect(decoded.deviceFingerprint).toBeUndefined();
    });
  });

  describe('generateRefreshToken', () => {
    it('should generate a refresh token and save to database', async () => {
      const RefreshToken = require('../models/refresh-token.model');
      RefreshToken.countDocuments.mockResolvedValue(0);
      
      const result = await jwtService.generateRefreshToken(mockUser, mockOptions);
      
      expect(result.token).toBeDefined();
      expect(result.expiresIn).toBe(7 * 24 * 60 * 60);
      expect(result.issuedAt).toBeDefined();
    });

    it('should revoke oldest token when max is reached', async () => {
      const RefreshToken = require('../models/refresh-token.model');
      RefreshToken.countDocuments.mockResolvedValue(5); // At max
      
      const oldestToken = { save: jest.fn().mockResolvedValue(true) };
      RefreshToken.findOne.mockResolvedValue(oldestToken);
      
      await jwtService.generateRefreshToken(mockUser, mockOptions);
      
      expect(oldestToken.revoked).toBe(true);
      expect(oldestToken.revokedAt).toBeDefined();
    });
  });

  describe('verifyAccessToken', () => {
    it('should verify a valid access token', () => {
      const token = jwtService.generateAccessToken(mockUser, mockOptions);
      const decoded = jwtService.verifyAccessToken(token);
      
      expect(decoded.sub).toBe('user123');
      expect(decoded.type).toBe('access');
    });

    it('should throw error for invalid token', () => {
      expect(() => {
        jwtService.verifyAccessToken('invalid-token');
      }).toThrow('Invalid access token');
    });

    it('should throw error for refresh token used as access token', () => {
      const RefreshToken = require('../models/refresh-token.model');
      RefreshToken.countDocuments.mockResolvedValue(0);
      
      const result = jwtService.generateRefreshToken(mockUser, mockOptions);
      
      expect(() => {
        jwtService.verifyAccessToken(result.token);
      }).toThrow('Invalid token type');
    });
  });

  describe('refreshAccessToken', () => {
    it('should generate new access token and rotate refresh token', async () => {
      const RefreshToken = require('../models/refresh-token.model');
      const User = require('../../models/user.model');
      
      RefreshToken.countDocuments.mockResolvedValue(0);
      RefreshToken.findOne.mockResolvedValue({
        token: 'old-refresh-token',
        save: jest.fn().mockResolvedValue(true),
      });
      User.findById.mockResolvedValue(mockUser);
      
      const result = await jwtService.refreshAccessToken('old-refresh-token', mockOptions);
      
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
      expect(result.expiresIn).toBe(900); // 15 minutes
      expect(result.tokenType).toBe('Bearer');
    });

    it('should revoke old refresh token after rotation', async () => {
      const RefreshToken = require('../models/refresh-token.model');
      const User = require('../../models/user.model');
      
      const mockTokenDoc = {
        token: 'old-refresh-token',
        save: jest.fn().mockResolvedValue(true),
      };
      
      RefreshToken.countDocuments.mockResolvedValue(0);
      RefreshToken.findOne.mockResolvedValue(mockTokenDoc);
      User.findById.mockResolvedValue(mockUser);
      
      await jwtService.refreshAccessToken('old-refresh-token', mockOptions);
      
      expect(RefreshToken.findOneAndUpdate).toHaveBeenCalled();
    });
  });

  describe('revokeRefreshToken', () => {
    it('should revoke a specific refresh token', async () => {
      const RefreshToken = require('../models/refresh-token.model');
      
      await jwtService.revokeRefreshToken('token-to-revoke', 'user_initiated');
      
      expect(RefreshToken.findOneAndUpdate).toHaveBeenCalledWith(
        { token: 'token-to-revoke' },
        expect.objectContaining({
          revoked: true,
          revokedReason: 'user_initiated',
        })
      );
    });
  });

  describe('revokeAllUserTokens', () => {
    it('should revoke all tokens for a user', async () => {
      const RefreshToken = require('../models/refresh-token.model');
      
      await jwtService.revokeAllUserTokens('user123', 'password_changed');
      
      expect(RefreshToken.updateMany).toHaveBeenCalledWith(
        { userId: 'user123', revoked: false },
        expect.objectContaining({
          revoked: true,
          revokedReason: 'password_changed',
        })
      );
    });
  });

  describe('decodeToken', () => {
    it('should decode token without verification', () => {
      const token = jwtService.generateAccessToken(mockUser, mockOptions);
      const decoded = jwtService.decodeToken(token);
      
      expect(decoded.sub).toBe('user123');
    });

    it('should return null for invalid token', () => {
      const decoded = jwtService.decodeToken('invalid-token');
      expect(decoded).toBeNull();
    });
  });
});