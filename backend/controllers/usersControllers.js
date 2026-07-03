
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const {
  createUnverifiedUser,
  findUserById,
  findUnverifiedUserByEmail,
  findUnverifiedUserByHandle,
  findUserByEmail,
  findUserByHandle,
  checkExistingUser,
  getMyProfile,
  getPublicProfile,
  // isSamePassword,
  updateUserPasswordById,
  updateUserOtp,
  loginUser,
  deleteUserByEmail,
  followUser,
  unfollowUser,
  getUserSocialData,
  getUserArticles,
  getUserLikeAndSaveArticlesData: getUserLikeAndSaveArticlesData,
  checkUserHandleExists,
  checkEmailExists,
  clearOtpUser,
  incrementOtpAttemptsUser,
  updateUserPasswordAndClearOtp,
  logoutUser,
  deleteUserById,
  updateUserProfilePictureById,
  updateUserGeneralDetailsById,
  updateUserContactDetailsById
} = require("../services/db/userService");

const {
  findAdminByEmail,
  findAdminByHandle,
  updateAdminOtp,
  checkExistingAdmin,
  clearOtpAdmin,
  incrementOtpAttemptsAdmin,
  updateAdminPasswordAndClearOtp,
  logoutAdmin
} = require("../services/db/adminService");
const { blackListToken, addTokenToBlacklist } = require("../services/db/dbTokenService");
const {
  findArticleById,
  getArticleContributors,
} = require("../services/db/articleService");

const {
  generateAccessToken,
  verifyToken,
  generateRefreshToken,
  generateOtp,
  hashToken,
} = require("../services/security/tokenService");
const {
  isSamePassword,
  generateHashPassword,
} = require("../services/security/encryptService");

const { sendOtpMail } = require("./emailservice");
const { verifyUser } = require("../middleware/authMiddleware");

const { throwError } = require("../utils/throwError");
const { sendSuccess } = require("../utils/response");
const { HTTP_STATUS, ERROR_CODES } = require("../constants/errorConstants");

const { Types } = require("mongoose");
const { ROLES } = require("../constants/roles");

async function creatingUnverifiedUser(userData) {
  const verificationToken = await createUnverifiedUser({
    user_name: userData.user_name,
    user_handle: userData.user_handle,
    email: userData.email,
    password: userData.password,
    isDoctor: userData.isDoctor,
    qualification: userData.qualification,
    specialization: userData.specialization,
    Years_of_experience: userData.Years_of_experience,
    Profile_image: userData.Profile_image,
    contact_detail: userData.contact_detail,
  });
  console.log("verificationToken", verificationToken);
  if (!verificationToken) {
    throwError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_CODES.INTERNAL_ERROR,
      "Failed to register user",
    );
  }
  // sending verification email to user
  // await sendOtpMail(email, verificationToken);
}

module.exports.register = expressAsyncHandler(async (req, res) => {
  const start = Date.now();
  const minDuration = 700;

  const userData = req.validateBody;

  // if user exist we get true or false value from checkExistingUser and checkExistingAdmin function and if any of them is true then we throw error that user already exist
  const [existingUser, existingAdmin] = await Promise.all([
    checkExistingUser({
      email: userData.email,
      user_handle: userData.user_handle,
    }),
    checkExistingAdmin({ email: userData.email }),
  ]);

  if (!existingUser && !existingAdmin) {
    await creatingUnverifiedUser(userData);
  }

  // simulate delay to prevent timing attacks
  const elapsed = Date.now() - start;
  if (elapsed < minDuration) {
    await new Promise((resolve) => setTimeout(resolve, minDuration - elapsed));
  }
  sendSuccess(
    res,
    HTTP_STATUS.CREATED,
    "If the account can be registered, please verify your email.",
  );
});

module.exports.login = expressAsyncHandler(async (req, res) => {
  const { email, password, fcmToken } = req.validateBody;

  const user = await findUserByEmail(email);

  if (!user) {
    throwError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.ACCESS_DENIED,
      "Invalid email or password",
    );
  }

  if (!user.isVerified) {
    throwError(
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.ACCESS_DENIED,
      "Email not verified. Please verify your email first.",
    );
  }

  if (user.isBannedUser || user.isBlockUser) {
    throwError(
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.ACCESS_DENIED,
      "Account access restricted",
    );
  }

  const isPasswordValid = await isSamePassword(password, user.password);

  if (!isPasswordValid) {
    throwError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.ACCESS_DENIED,
      "Invalid email or password",
    );
  }

  if (user.refreshToken && user.refreshToken.hashedRefreshToken) {
    console.log("Blacklisting existing refresh token for user:", user);
    await logoutUser(user._id);
  }

  const { refreshToken, jti } = generateRefreshToken(
    {
      userId: user._id,
      role: user.isDoctor ? "doctor" : "user",
    },
    "7d",
  );

  await loginUser(user._id, refreshToken, jti, fcmToken);

  console.log("Login Request Headers:", req.headers);
  console.log("X-Client-Type received:", req.headers['x-client-type']);

  const userAgent = req.headers['user-agent']?.toLowerCase() || '';
  const isMobile = req.headers['x-client-type']?.toLowerCase() === 'mobile' || 
                   userAgent.includes('okhttp') || 
                   userAgent.includes('dart') ||
                   userAgent.includes('alamofire') ||
                   userAgent.includes('cfnetwork');
                   
  console.log("isMobile evaluated to:", isMobile);

  if (!isMobile) {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.isDoctor ? "doctor" : "user",
  });

  const responsePayload = {
    user: {
      _id: user._id,
      email: user.email,
      user_name: user.user_name,
      isDoctor: user.isDoctor,
      isVerified: user.isVerified,
      user_handle: user.user_handle,
    },
    accessToken
  };

  if (isMobile) {
    responsePayload.refreshToken = refreshToken;
  }

  return sendSuccess(res, HTTP_STATUS.OK, "Login successful", responsePayload);
});

module.exports.getprofile = expressAsyncHandler(async (req, res) => {
  const user = await getMyProfile(req.user.userId);
  if (!user) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User not found",
    );
  }
  sendSuccess(res, HTTP_STATUS.OK, "User profile fetched successfully.", user);
});

module.exports.getUserProfile = expressAsyncHandler(async (req, res) => {
  const userId = req.validateQuery.id;
  const userHandle = req.validateQuery.handle;

  if (userId && !Types.ObjectId.isValid(userId)) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "Invalid user ID",
    );
  }

  if (userHandle && userId) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "Provide either user id or user handle, but not both",
    );
  }

  const user = await getPublicProfile(userId, userHandle);

  if (!user) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User not found",
    );
  }

  sendSuccess(res, HTTP_STATUS.OK, "User profile fetched successfully.", user);
});

module.exports.checkUserHandle = expressAsyncHandler(async (req, res) => {
  const userHandle = req.body.userHandle;

  if (!userHandle) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "User handle is required",
    );
  }

  const [user, unverifiedUser, admin] = await Promise.all([
    findUserByHandle(userHandle),
    findUnverifiedUserByHandle(userHandle),
    findAdminByHandle(userHandle),
  ]);

  if (user || unverifiedUser || admin) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.RESOURCE_ALREADY_EXISTS,
      "User handle already exists",
    );
  }

  sendSuccess(res, HTTP_STATUS.OK, "User handle is available.");
});

module.exports.sendOTPForForgotPassword = expressAsyncHandler(
  async (req, res) => {
      const { email } = req.validateBody;

      const [user, admin] = await Promise.all([
        findUserByEmail(email),
        findAdminByEmail(email),
      ]);

      const account = user || admin;

      // Always return same message for enumeration protection
      const successMessage =
        "If an account exists, OTP has been sent to your email.";

        console.log("Account found:", account);
      if (!account) {
        return sendSuccess(res, HTTP_STATUS.OK, successMessage);
      }
      if (account.isBlockUser || account.isBannedUser) {
        return sendSuccess(res, HTTP_STATUS.OK, successMessage);
      }

      if (admin && !admin.isVerified) {
        return sendSuccess(res, HTTP_STATUS.OK, successMessage);
      }

      // Rate limit resend (example: 60 sec)
      const cooldownMs = Number(process.env.OTP_RESEND_COOLDOWN_SECONDS) * 1000;
      if (
        account.otpLastSentAt &&
        Date.now() - new Date(account.otpLastSentAt).getTime() < cooldownMs
      ) {
        console.log(`OTP resend requested too soon for ${email}`);
        throwError(
          429,
          "TOO_MANY_REQUESTS",
          "Please wait before requesting a new OTP."
        );
      }

      const otp = generateOtp(); // 6 digit
      const hashedOtp = await hashToken(otp);
      const otpExpires = new Date(
        Date.now() + Number(process.env.OTP_EXPIRY_MINUTES) * 60 * 1000,
      );

      const updatePayload = {
        otp: hashedOtp,
        otpExpires,
        otpLastSentAt: new Date(),
        otpAttempts: 0,
      };

      if (process.env.NODE_ENV === "production") {
        const result = await sendOtpMail(email, otp);

        if (!result) {
          throwError(
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            ERROR_CODES.INTERNAL_ERROR,
            "Failed to send OTP email",
          );
        }
      }

      if (user) {
        await updateUserOtp(user._id, updatePayload);
      } else {
        await updateAdminOtp(admin._id, updatePayload);
      }
      sendSuccess(res, HTTP_STATUS.OK, successMessage);
  },
);

module.exports.verifyOtpForForgotPassword = expressAsyncHandler(
  async (req, res) => {
    const { email, otp, newPassword } = req.validateBody;

    const [user, admin] = await Promise.all([
      findUserByEmail(email),
      findAdminByEmail(email),
    ]);

    const account = user || admin;

    if (!account) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "Invalid or expired OTP",
      );
    }

    if (account.isBlockUser || account.isBannedUser) {
      throwError(
        HTTP_STATUS.FORBIDDEN,
        ERROR_CODES.ACCESS_DENIED,
        "Account access restricted",
      );
    }

    if (!account.otp || !account.otpExpires) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "Invalid or expired OTP",
      );
    }

    const maxAttempts = Number(process.env.OTP_MAX_ATTEMPTS);

    if (account.otpAttempts >= maxAttempts) {
      if (user) {
        await clearOtpUser(account._id);
      } else {
        await clearOtpAdmin(account._id);
      }
      throwError(
        HTTP_STATUS.TOO_MANY_REQUESTS,
        ERROR_CODES.ACCESS_DENIED,
        "Too many invalid OTP attempts. Request a new OTP.",
      );
    }

    const hashedOtp = await hashToken(otp);

    const isOtpInvalid =
      account.otp !== hashedOtp || new Date(account.otpExpires) < new Date();

    if (isOtpInvalid) {
      if (user) {
        await incrementOtpAttemptsUser(account._id);
      } else {
        await incrementOtpAttemptsAdmin(account._id);
      }

      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "Invalid or expired OTP",
      );
    }

    const isPasswordSame = await isSamePassword(newPassword, account.password);

    if (isPasswordSame) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "New password must be different from old password",
      );
    }
    if (user) {
      await updateUserPasswordAndClearOtp(account._id,newPassword);
    } else {
      await updateAdminPasswordAndClearOtp(account._id, newPassword);
    }

    sendSuccess(res, HTTP_STATUS.OK, "Password reset successful");
  },
);

module.exports.logout = expressAsyncHandler(async (req, res) => {
  const { userId, role } = req.user;
  console.log("Logging out userId:", userId, "role:", role);
  if (role === ROLES.DOCTOR || role === ROLES.USER) {
    await logoutUser(userId);
  }
  if(role === ROLES.ADMIN){
    await logoutAdmin(userId);
  }

  // Blacklist the access token on logout
  const accessToken = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];
  if (accessToken) {
    try {
      await blackListToken(accessToken);
    } catch (err) {
      console.error("Error blacklisting token on logout:", err);
    }
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return sendSuccess(
    res,
    HTTP_STATUS.OK,
    "Logged out successfully"
  );
});

module.exports.refreshToken = expressAsyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "Refresh token required",
    );
  }
  // Verify the refresh token
  const decoded = verifyToken(refreshToken);

  const user = await User.findById(decoded.userId);
  if (!user) {
    throwError(
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.ACCESS_DENIED,
      "Invalid refresh token",
    );
  }

  const newAccessToken = generateAccessToken(
    { userId: user._id, email: user.email, role: "user" },
    "15m",
  );
  const { refreshToken: newRefreshToken, jti } = generateRefreshToken(
    { userId: user._id, email: user.email, role: "user" },
    "7d",
  );

  const hashedRefreshToken = await hashToken(newRefreshToken);
  user.refreshToken = { hashedRefreshToken, jti };
  await user.save();

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    maxAge: 900000,
  }); // 15 minutes
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    maxAge: 604800000,
  }); // 7 days

  sendSuccess(res, HTTP_STATUS.OK, "Refresh token generated successfully", {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
});

module.exports.deleteByUser = expressAsyncHandler(async (req, res) => {
  const { password } = req.validateBody;
  const { userId, role } = req.user;

  const user = await findUserById(userId);

  if (!user) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User not found"
    );
  }

  const isPasswordValid = await isSamePassword(
    password,
    user.password
  );

  if (!isPasswordValid) {
    throwError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.ACCESS_DENIED,
      "Invalid password"
    );
  }

  await deleteUserById(userId);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return sendSuccess(
    res,
    HTTP_STATUS.OK,
    "Account deleted successfully"
  );
});

module.exports.deleteByAdmin = expressAsyncHandler(async (req, res) => {
  const { adminEmail, adminPassword, userEmail } = req.body;
  const admin = await findAdminByEmail(adminEmail);
  if (!admin) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "Admin not found",
    );
  } else {
    // console.log(admin);
    const validAdimin = await isSamePassword(
      adminPassword,
      admin.adminPassword,
    );
    if (!validAdimin) {
      throwError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.ACCESS_DENIED,
        "Invalid password",
      );
    } else {
      const result = await deleteUserByEmail(userEmail);
      sendSuccess(res, HTTP_STATUS.OK, "User deleted successfully", result);
    }
  }
});

// follow a user
module.exports.follow = expressAsyncHandler(async (req, res) => {
  const { articleId, followUserId } = req.validateBody;
  const currentUserId = req.user.userId;

  const user = await findUserById(currentUserId);

  if (!user) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User not found",
    );
  }

  if (user.isBlockUser || user.isBannedUser) {
    throwError(
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.ACCESS_DENIED,
      "You are blocked or banned",
    );
  }

  let targetUserId;

  if (articleId) {
    const article = await findArticleById(articleId);

    if (!article || article.is_removed) {
      throwError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.RESOURCE_NOT_FOUND,
        "Article not found",
      );
    }

    targetUserId = article.authorId;
  } else {
    targetUserId = followUserId;
  }

  if (currentUserId === targetUserId) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "You cannot follow or unfollow yourself",
    );
  }

  const userToFollow = await findUserById(targetUserId);

  if (!userToFollow) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User to follow not found",
    );
  }

  if (userToFollow.isBlockUser || userToFollow.isBannedUser) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "User to follow is blocked or banned",
    );
  }

  const isAlreadyFollowing = user.followings
    ?.map((id) => id.toString())
    .includes(userToFollow._id.toString());

  if (isAlreadyFollowing) {
    await unfollowUser(user._id, userToFollow._id);

    return sendSuccess(res, HTTP_STATUS.OK, "Unfollow successfully", {
      followStatus: false,
    });
  }

  await followUser(user._id, userToFollow._id);

  return sendSuccess(res, HTTP_STATUS.OK, "Follow successfully", {
    followStatus: true,
  });
});
// Get Follower
module.exports.getFollowers = expressAsyncHandler(async (req, res) => {
  const userId = req.userId;
  const author = await getUserSocialData(userId);

  if (!author) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "Author not found",
    );
  }
  if (author.followers) {
    author.followers = author.followers.filter((user) => user !== null);
  }
  sendSuccess(
    res,
    HTTP_STATUS.OK,
    "Followers fetched successfully",
    author.followers,
  );
});
// GET followings
module.exports.getFollowings = expressAsyncHandler(async (req, res) => {
  const userId = req.userId;
  const author = await getUserSocialData(userId);

  if (!author) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "Author not found",
    );
  }
  if (author.followings) {
    author.followings = author.followings.filter((user) => user !== null);
  }
  sendSuccess(
    res,
    HTTP_STATUS.OK,
    "Followings fetched successfully",
    author.followings,
  );
});

// GET socials
// type : 1 for followers, 2 for followings, 3 for contributors
module.exports.getSocials = expressAsyncHandler(async (req, res) => {
  const { type, articleId, social_user_id } = req.query;

  if (articleId) {
    const article = await getArticleContributors(Number(articleId));

    if (!article) {
      throwError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.RESOURCE_NOT_FOUND,
        "Article not found",
      );
    }

    sendSuccess(
      res,
      HTTP_STATUS.OK,
      "Article contributors fetched successfully",
      article,
    );
  }
  let id = social_user_id ? social_user_id : req.userId;

  const author = getUserSocialData(id);
  if (!author) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "Author not found",
    );
  }

  if (Number(type) === 1) {
    if (author.followers) {
      author.followers = author.followers.filter((user) => user !== null);
    }
    sendSuccess(
      res,
      HTTP_STATUS.OK,
      "Followers fetched successfully",
      author.followers,
    );
  } else if (Number(type) === 2) {
    if (author.followings) {
      author.followings = author.followings.filter((user) => user !== null);
    }
    sendSuccess(
      res,
      HTTP_STATUS.OK,
      "Followings fetched successfully",
      author.followings,
    );
  } else {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "Invalid type",
    );
  }
});

module.exports.getProfileImage = expressAsyncHandler(async (req, res) => {
  const userId = req.validateParams.userId;
  if (!Types.ObjectId.isValid(userId)) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "Invalid user id",
    );
  }
  const user = await findUserById(userId);

  if (!user) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User not found",
    );
  }

  sendSuccess(res, HTTP_STATUS.OK, "Profile image fetched successfully", {
    profileImage: user.Profile_image,
  });
});

// get User Articles,
module.exports.getUserWithArticles = expressAsyncHandler(async (req, res) => {
  const user = await getUserArticles(req.userId); // Populate  articles

  if (!user) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User not found",
    );
  }
  sendSuccess(res, HTTP_STATUS.OK, "Articles fetched successfully", user);
});

// get user like and save articles
module.exports.getUserLikeAndSaveArticles = expressAsyncHandler(
  async (req, res) => {
    const user = await getUserLikeAndSaveArticlesData(req.userId);

    if (!user) {
      throwError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.RESOURCE_NOT_FOUND,
        "User not found",
      );
    }

    if (user.likedArticles) {
      user.likedArticles = user.likedArticles.filter(
        (article) => article && article.authorId !== null,
      );
    }

    if (user.savedArticles) {
      user.savedArticles = user.savedArticles.filter(
        (article) => article && article.authorId !== null,
      );
    }

    sendSuccess(
      res,
      HTTP_STATUS.OK,
      "Like and Save Articles fetched successfully",
      user,
    );
  },
);

module.exports.updateProfileImage = expressAsyncHandler(async (req, res) => {
  const { profileImageUrl } = req.body;

  if (!profileImageUrl) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "Profile image URL is required",
    );
  }

  const user = await findUserById(req.user.userId);

  if (!user) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User not found",
    );
  }

  if (user.isBannedUser || user.isBlockUser) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "User is banned or blocked",
    );
  }

  // Update the profile image URL
  const updatedUser = await updateUserProfilePictureById(user._id, profileImageUrl);

  if (!updatedUser) {
    throwError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_CODES.INTERNAL_ERROR,
      "Failed to update profile image",
    );
  };

  sendSuccess(
    res,
    HTTP_STATUS.OK,
    "Profile image updated successfully",
    profileImageUrl,
  );
});

// get user details
module.exports.getUserDetails = expressAsyncHandler(async (req, res) => {

  const user = await getPublicProfile(req.user.userId);

  if (!user) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User not found",
    );
  }

  sendSuccess(res, HTTP_STATUS.OK, "User details fetched successfully", user);
});

// update user general details
module.exports.updateUserGeneralDetails = expressAsyncHandler(
  async (req, res) => {
    const userId = req.user.userId;
    const { username, userHandle, about } = req.validateBody;

    const userHandleExists = await checkUserHandleExists(userId, userHandle);
    if (userHandleExists) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "User handle already in use",
      );
    }
    const updatedUserGeneralDetailsById = await updateUserGeneralDetailsById(userId, {
      user_name: username,
      user_handle: userHandle,
      about: about,
    });
    if (!updatedUserGeneralDetailsById) {
      throwError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ERROR_CODES.INTERNAL_ERROR,
        "Failed to update user details",
      );
    }
    sendSuccess(res, HTTP_STATUS.OK, "User details updated successfully");
  },
);
// update user contact details
module.exports.updateUserContactDetails = expressAsyncHandler(
  async (req, res) => {
    const { phone, email } = req.body;

    const emailExists = await checkEmailExists(email, req.userId);

    if (emailExists) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "Email already in use",
      );
    }

    const updatedUserContactDetailsById = await updateUserContactDetailsById(req.user.userId, {
      contact_detail: {
        email_id: email,
        phone_no: phone,
      },
    });
    
    if (!updatedUserContactDetailsById) {

      throwError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ERROR_CODES.INTERNAL_ERROR,
        "Failed to update user contact details",
      );
    }
    // Respond with success
    sendSuccess(res, HTTP_STATUS.OK, "User contact updated successfully");
  },
);

// update user Professional details
module.exports.updateUserProfessionalDetails = expressAsyncHandler(
  async (req, res) => {
    const { specialization, qualification, experience } = req.body;

    // Validate input fields
    if (!specialization || !qualification || !experience) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "Please provide all required fields",
      );
    }

    // Find the user by ID
    const user = await findUserById(req.userId);
    if (!user) {
      throwError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.RESOURCE_NOT_FOUND,
        "User not found",
      );
    }

    if (user.isBannedUser || user.isBlockUser) {
      throwError(
        HTTP_STATUS.FORBIDDEN,
        ERROR_CODES.ACCESS_DENIED,
        "User is banned or blocked",
      );
    }
    // Update user details
    user.specialization = specialization;
    user.qualification = qualification;
    user.Years_of_experience = experience;
    await user.save();

    // Respond with success
    sendSuccess(res, HTTP_STATUS.OK, "User details updated successfully", user);
  },
);

// update user password
module.exports.updateUserPassword = expressAsyncHandler(async (req, res) => {
  const { old_password, new_password } = req.validateBody;

  // Check if the new password is long enough
  if (new_password.length < 6) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "Password too short",
    );
  }

  // Find the user by ID
  const user = await findUserById(req.user.userId);
  if (!user) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User not found",
    );
  }

  if (user.isBannedUser || user.isBlockUser) {
    throwError(
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.ACCESS_DENIED,
      "User is banned or blocked",
    );
  }

  // Check if the old password matches the stored password
  const isOldPasswordValid = await isSamePassword(old_password, user.password);
  if (!isOldPasswordValid) {
    throwError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.INVALID_CREDENTIALS,
      "Invalid old password",
    );
  }

  // Ensure the new password is not the same as the old password
  const isSameAsOldPassword = await isSamePassword(new_password, user.password);
  if (isSameAsOldPassword) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "Same as old password",
    );
  }
  const updatedUserPassword = await updateUserPasswordById(user._id, new_password);

  if (!updatedUserPassword) {
    throwError(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      ERROR_CODES.INTERNAL_ERROR,
      "Failed to update password",
    );
  }

  sendSuccess(res, HTTP_STATUS.OK, "Password updated successfully");
});

// update notification preferences
module.exports.updateNotificationPreferences = expressAsyncHandler(
  async (req, res) => {
    try {
      const { contentClusters } = req.body;

      if (!Array.isArray(contentClusters)) {
        return res.status(400).json({ error: "contentClusters must be an array" });
      }

      const user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ error: "User not found" });

      if (!user.notificationPreferences) {
        user.notificationPreferences = { contentClusters: [] };
      }

      user.notificationPreferences.contentClusters = contentClusters;
      await user.save();

      res.status(200).json({ message: "Notification preferences updated successfully", preferences: user.notificationPreferences });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// get notification preferences
module.exports.getNotificationPreferences = expressAsyncHandler(
  async (req, res) => {
    try {
      const user = await User.findById(req.userId).populate('notificationPreferences.contentClusters');
      if (!user) return res.status(404).json({ error: "User not found" });

      res.status(200).json({ preferences: user.notificationPreferences || { contentClusters: [] } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

