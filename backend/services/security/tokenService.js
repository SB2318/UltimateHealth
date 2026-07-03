const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { throwError } = require("../../utils/throwError");
const { HTTP_STATUS, ERROR_CODES } = require("../../constants/errorConstants");
require("dotenv").config();

const ISSUER = 'ultimate-health';
const AUDIENCE = 'ultimate-health-users';

const baseOptions = {
    issuer: ISSUER,
    audience: AUDIENCE,
    algorithm: 'HS256',
};

const generateJti = () => crypto.randomUUID();

const generateAccessToken = (payload, expiresIn) => {
    const expiry = expiresIn || process.env.JWT_ACCESS_EXPIRY || "15m";
    const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;

    const accessToken = jwt.sign(
        payload,
        secret,
        { expiresIn: expiry }
    );

    return accessToken;
}


const generateRefreshToken = (payload, expiresIn) => {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) {
        throwError(HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.INTERNAL_ERROR, "Something went wrong. Please try again later.");
    }
    const expiry =
        expiresIn ??
        process.env.JWT_REFRESH_EXPIRY ??
        "7d";
    if (!expiry) {
        throwError(HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.INTERNAL_ERROR, "Something went wrong. Please try again later.");

    }

    const refreshTokenPayload = {
        ...payload,
        type: "refresh",
        jti: generateJti(),
    };
    const refreshToken = jwt.sign(
        refreshTokenPayload,
        secret,
        { ...baseOptions, expiresIn: expiry }
    );

    return {refreshToken, jti: refreshTokenPayload.jti};
}

const generateVerificationToken = (payload, expiresIn) => {
    const secret = process.env.JWT_VERIFICATION_SECRET;
    if (!secret) {
        throwError(HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.INTERNAL_ERROR, "Something went wrong. Please try again later.");
    }
    const expiry =
        expiresIn ??
        process.env.JWT_VERIFICATION_EXPIRY ??
        "1h";

    if (!expiry) {
        throwError(HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.INTERNAL_ERROR, "Something went wrong. Please try again later.");

    }

    const verificationPayload = {
        ...payload,
        type: "email_verification",
        jti: generateJti(),
    };


    const verificationToken = jwt.sign(
        verificationPayload,
        secret,
        { ...baseOptions, expiresIn: expiry }
    );

    return { verificationToken, jti: verificationPayload.jti };
}


const verifyAccessToken = (token) => {
    const secret = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret, {
        issuer: ISSUER,
        audience: AUDIENCE,
    });
    return decoded;
}


const verifyRefreshToken = (token) => {
    try {
        const secret = process.env.JWT_REFRESH_SECRET;
        if (!secret) {
            throwError(HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.INTERNAL_ERROR, "Something went wrong. Please try again later.");
        }
        const decoded = jwt.verify(token, secret, {
            issuer: ISSUER,
            audience: AUDIENCE,
            algorithms: ["HS256"]
        });
        if (!decoded || decoded.type !== "refresh") {
            throwError(HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED_ACCESS, 'Invalid or expired verification token');
        }

        return decoded;
    } catch (err) {
        throwError(HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED_ACCESS, "Invalid or expired token");
    }

}


const verifyVerificationToken = (token) => {
    try {
        const secret = process.env.JWT_VERIFICATION_SECRET;
        if (!secret) {
            throwError(HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.INTERNAL_ERROR, "Something went wrong. Please try again later.");
        }
        const decoded = jwt.verify(token, secret, {
            issuer: ISSUER,
            audience: AUDIENCE,
            algorithms: ["HS256"]
        });
        if (!decoded || decoded.type !== "email_verification") {
            throwError(HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED_ACCESS, 'Invalid or expired verification token');
        }
        return decoded;
    } catch (error) {
        throwError(HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED_ACCESS, "Invalid or expired token");

    }

}


const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    return decoded;
}


const hashToken = (token) => {
    const secret = process.env.TOKEN_SECRET || "fallback_default_secret_key_123";
    return crypto
        .createHmac('sha256', secret)
        .update(token)
        .digest('hex');
};

const generateOtp = () => {
    return crypto.randomInt(100000, 1000000).toString(); // 6 digit OTP
}

const verifyOtp = (inputOtp, hashedOtp) => {
    const inputHashed = hashToken(inputOtp);
    return inputHashed === hashedOtp;
}

module.exports = {
    // Generation functions
    generateAccessToken,
    generateRefreshToken,
    generateVerificationToken,
    generateOtp,
    verifyOtp,

    // Verification functions
    verifyAccessToken,
    verifyRefreshToken,
    verifyVerificationToken,

    // Legacy (backward compatibility)
    verifyToken,

    // hash token
    hashToken
}