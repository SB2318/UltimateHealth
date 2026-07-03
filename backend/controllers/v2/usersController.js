const expressAsyncHandler = require("express-async-handler");
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
  updateUserPassword,
  updateUserOtp,
  loginUser,
  deleteUserByEmail,
  followUser,
  unfollowUser,
  getUserSocialData,
  getUserArticles,
  getUserLikeAndSaveArticleData,
  checkEmailExists,
  checkUserHandleExists,
} = require("../../services/db/userService");

const {
  findAdminByEmail,
  findAdminByHandle,
  updateAdminOtp,
} = require("../../services/db/adminService");
const { blackListToken } = require("../../services/db/dbTokenService");
const {
  findArticleById,
  getArticleContributors,
} = require("../../services/db/articleService");

const {
  generateAccessToken,
  verifyToken,
  generateOtp,
  hashToken,
} = require("../../services/security/tokenService");
const {
  isSamePassword,
  generateHashPassword,
} = require("../../services/security/encryptService");

const { sendOtpMail } = require("../emailservice");
const { verifyUser } = require("../../middleware/authMiddleware");

const { throwError } = require("../../utils/throwError");
const { sendSuccess } = require("../../utils/response");
const { HTTP_STATUS, ERROR_CODES } = require("../../constants/errorConstants");

module.exports.register = expressAsyncHandler(async (req, res) => {
  const {
    user_name,
    user_handle,
    email,
    isDoctor,
    Profile_image,
    password,
    qualification,
    specialization,
    Years_of_experience,
    contact_detail,
  } = req.body;

  if (!user_name || !user_handle || !email || !password) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "Please provide all required fields",
    );
  }

  const [existingUser, existingAdmin] = await Promise.all([
    await checkExistingUser({
      email: email,
      user_handle: user_handle,
    }),
    await findAdminByEmail(email),
  ]);

  if (existingUser || existingAdmin) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.RESOURCE_ALREADY_EXISTS,
      "Email or user handle already in use",
    );
  }

  // Generate a verification token
  const verificationToken = await createUnverifiedUser({
    user_name,
    user_handle,
    email,
    isDoctor,
    Profile_image,
    password,
    qualification,
    specialization,
    Years_of_experience,
    contact_detail,
  });

  if (verificationToken == null) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.INTERNAL_ERROR,
      "Error creating  user",
    );
  } else {
    sendSuccess(
      res,
      HTTP_STATUS.CREATED,
      "Registration successful. Please verify your email."
    );
  }
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

module.exports.getprofile = expressAsyncHandler(async (req, res) => {
  const user = await getMyProfile(req.userId);
  if (!user) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User not found",
    );
  }
  if (!user.isVerified) {
    throwError(
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.ACCESS_DENIED,
      "Email not verified. Please check your email.",
    );
  }
  sendSuccess(res, HTTP_STATUS.OK, "User profile fetched successfully.", user);
});

module.exports.getUserProfile = expressAsyncHandler(async (req, res) => {
  const userId = req.query.id;
  const userHandle = req.query.handle;

  if (!userHandle && !userId) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "User handle or id is required.",
    );
  }

  let user = await getPublicProfile(userId, userHandle);

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
      "User is blocked or banned",
    );
  }

  sendSuccess(res, HTTP_STATUS.OK, "User profile fetched successfully.", user);
});

module.exports.sendOTPForForgotPassword = expressAsyncHandler(
  async (req, res) => {
    const { email } = req.body;
    const [user, admin] = await Promise.all([
      findUserByEmail(email),
      findAdminByEmail(email),
    ]);

    if (!user && !admin) {
      throwError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.RESOURCE_NOT_FOUND,
        "User with this email does not exist.",
      );
    }

    const otp = generateOtp();
    const hashedOtp = await hashToken(otp);
    const otpExpires = Date.now() + 10 * 60 * 1000;

    if (user) {
      await updateUserOtp(user, hashedOtp, otpExpires);
    } else {
      if (!admin.isVerified) {
        throwError(
          HTTP_STATUS.FORBIDDEN,
          ERROR_CODES.ACCESS_DENIED,
          "Admin is not verified.",
        );
      }
      await updateAdminOtp(admin, hashedOtp, otpExpires);
    }
    const result = await sendOtpMail(email, otp);
    if (result) {
      sendSuccess(res, HTTP_STATUS.OK, "OTP sent to your email.");
    } else {
      throwError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ERROR_CODES.INTERNAL_ERROR,
        "Error sending OTP email.",
      );
    }
  },
);

module.exports.verifyOtpForForgotPassword = expressAsyncHandler(
  async (req, res) => {
    const { email, newPassword } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      throwError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.RESOURCE_NOT_FOUND,
        "User not found",
      );
    }
    const isPasswordSame = await isSamePassword(user.password, newPassword);

    if (isPasswordSame) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "New password should not be same as old password.",
      );
    }

    await updateUserPassword(user, newPassword);

    sendSuccess(res, HTTP_STATUS.OK, "Password reset successful.");
  },
);

module.exports.checkOtp = expressAsyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  const [user, admin] = await Promise.all([
    findUserByEmail(email),
    findAdminByEmail(email),
  ]);

  if (!user && !admin) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User not found",
    );
  }
  if (user) {
    const hashedInput = await hashToken(otp);
    if (hashedInput !== user.otp || user.otpExpires < Date.now()) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "Invalid or expired OTP.",
      );
    }
  } else {
    const hashedInput = await hashToken(otp);
    if (!admin || hashedInput !== admin.otp || admin.otpExpires < Date.now()) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "Invalid or expired OTP.",
      );
    }
  }
  sendSuccess(res, HTTP_STATUS.OK, "OTP is valid.");
});

module.exports.login = expressAsyncHandler(async (req, res) => {
    const { email, password, fcmToken } = req.body;

    if (!email || !password || !fcmToken) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "Please provide email and password and FCM Token",
      );
    }

    let user = await findUserByEmail(email);

    if (!user) {
      user = await findUnverifiedUserByEmail(email);
      if (!user) {
        throwError(
          HTTP_STATUS.NOT_FOUND,
          ERROR_CODES.RESOURCE_NOT_FOUND,
          "User not found",
        );
      }
      throwError(
        HTTP_STATUS.FORBIDDEN,
        ERROR_CODES.ACCESS_DENIED,
        "Email not verified. Please check your email.",
      );
    }

    if (!user.isVerified) {
      throwError(
        HTTP_STATUS.FORBIDDEN,
        ERROR_CODES.ACCESS_DENIED,
        "Email not verified. Please check your email.",
      );
    }

    if (user.isBannedUser || user.isBlockUser) {
      throwError(
        HTTP_STATUS.FORBIDDEN,
        ERROR_CODES.ACCESS_DENIED,
        "User is banned or blocked",
      );
    }

    const isPasswordValid =  await isSamePassword(password, user.password);
    if (!isPasswordValid) {
      throwError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.ACCESS_DENIED,
        "Invalid password",
      );
    }

    // Blacklist the token
    if (user.refreshToken != null) {
      await blackListToken(user.refreshToken);
    }

    // Generate JWT Access Token
    const accessToken = generateAccessToken(
      { userId: user._id, email: user.email, role: "user" },
      "15m",
    );

    // Generate Refresh Token
    const refreshToken = generateAccessToken(
      { userId: user._id, email: user.email, role: "user" },
      "7d",
    );

    await loginUser(user, refreshToken, fcmToken);

    const userAgent = req.headers['user-agent']?.toLowerCase() || '';
    const isMobile = req.headers['x-client-type']?.toLowerCase() === 'mobile' || 
                     userAgent.includes('okhttp') || 
                     userAgent.includes('dart') ||
                     userAgent.includes('alamofire') ||
                     userAgent.includes('cfnetwork');

    if (!isMobile) {
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    const responsePayload = {
      user: {
        _id: user._id,
        email: user.email,
        user_name: user.user_name,
        isDoctor: user.isDoctor,
        isVerified: user.isVerified,
        user_handle: user.user_handle,
      }
    };

    if (isMobile) {
      responsePayload.refreshToken = refreshToken;
    }

    sendSuccess(res, HTTP_STATUS.OK, "Login Successful", responsePayload);

});

module.exports.logout = expressAsyncHandler(async (req, res) => {
    // Find the user and remove the refresh token
    const user = await findUserById(req.userId);

    if (user) {
      // BlackList the token first
      await blackListToken(user.refreshToken);

      user.refreshToken = null;
      await user.save();
    }

    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    sendSuccess(res, HTTP_STATUS.OK, "Logout successful");
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

    const user = await findUserById(decoded.userId);
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
    const newRefreshToken = generateAccessToken(
      { userId: user._id, email: user.email, role: "user" },
      "7d",
    );

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    sendSuccess(
      res,
      HTTP_STATUS.OK,
      "Refresh token generated successfully",
      { accessToken: newAccessToken }
    );
});

module.exports.deleteByUser = expressAsyncHandler(async (req, res) => {
  let token;
  if (req.cookies && req.cookies["token"]) {
    token = req.cookies["token"];
  } else {
    token = req.headers.authorization?.split(" ")[1];
  }

  if (!token) {
    throwError(
      HTTP_STATUS.UNAUTHORIZED,
      ERROR_CODES.ACCESS_DENIED,
      "Authorization token missing",
    );
  }
    const { password } = req.body;
    const email = await verifyUser(token);
    const user = await findUserByEmail(email);

    if (!user) {
      throwError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.RESOURCE_NOT_FOUND,
        "User not found",
      );
    }

    if (!user.isVerified) {
      throwError(
        HTTP_STATUS.FORBIDDEN,
        ERROR_CODES.ACCESS_DENIED,
        "Email not verified. Please check your email.",
      );
    }
    const isPasswordValid = await isSamePassword(user.password, password);

    if (!isPasswordValid) {
      throwError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.ACCESS_DENIED,
        "Invalid password",
      );
    }
    // console.log("email : ", email + " password  : ", password);
    await deleteUserByEmail(email);
    sendSuccess(res, HTTP_STATUS.OK, "Account has been removed from database");
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
    }
    else {
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
      }
      else {
        const result = await deleteUserByEmail(userEmail);
        sendSuccess(res, HTTP_STATUS.OK, "User deleted successfully", result);
      }
    }
});

// follow a user
module.exports.follow = expressAsyncHandler(async (req, res) => {
    const { articleId, followUserId } = req.body;
    if (!articleId && !followUserId) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "Article id or follow user id are required",
      );
    }
    let article;
    if (articleId) {
      article = await findArticleById(Number(articleId));

      if (!article || article.is_removed) {
        throwError(
          HTTP_STATUS.NOT_FOUND,
          ERROR_CODES.RESOURCE_NOT_FOUND,
          "Article not found",
        );
      }
    }

    if (article && req.userId === article.authorId) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "You cannot follow or unfollow yourself",
      );
    }

    // Find the user who is following
    const user = await findUserById(req.userId);
    if (!user) {
      throwError(
        HTTP_STATUS.NOT_FOUND,
        ERROR_CODES.RESOURCE_NOT_FOUND,
        "User not found",
      );
    }

    // Find the user to be followed
    let userToFollow;
    if (article) {
      userToFollow = await findUserById(article.authorId);
    } else {
      userToFollow = await findUserById(followUserId);
    }

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

    if (user.isBlockUser || user.isBannedUser) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "You are blocked or banned",
      );
    }

    const followerUserset = new Set(
      userToFollow.followers.filter((id) => id).map((id) => id.toString()),
    );
    const followingUserSet = new Set(
      user.followings.filter((id) => id).map((id) => id.toString()),
    );

    if (
      followerUserset.has(req.userId.toString()) ||
      followingUserSet.has(userToFollow._id.toString())
    ) {
      // Unfollow
      await unfollowUser(user._id, userToFollow._id);
      sendSuccess(res, HTTP_STATUS.OK, "Unfollow successfully", { followStatus: false });
    } else {
      // Follow
      await followUser(user._id, userToFollow._id);
      sendSuccess(res, HTTP_STATUS.OK, "Follow successfully", { followStatus: true });
    }
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
  sendSuccess(res, HTTP_STATUS.OK, "Followers fetched successfully", author.followers);
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
  sendSuccess(res, HTTP_STATUS.OK, "Followings fetched successfully", author.followings);
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

    sendSuccess(res, HTTP_STATUS.OK, "Article contributors fetched successfully", article);
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
    sendSuccess(res, HTTP_STATUS.OK, "Followers fetched successfully", author.followers);
  } else if (Number(type) === 2) {
    if (author.followings) {
      author.followings = author.followings.filter((user) => user !== null);
    }
    sendSuccess(res, HTTP_STATUS.OK, "Followings fetched successfully", author.followings);
  } else {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "Invalid type",
    );
  }
});

module.exports.getProfileImage = expressAsyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const author = await findUserById(userId);

  if (!author) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "Author not found",
    );
  }

  sendSuccess(res, HTTP_STATUS.OK, "Profile image fetched successfully", author.Profile_image);
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
      const user = await getUserLikeAndSaveArticleData(req.userId);

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

      sendSuccess(res, HTTP_STATUS.OK, "Like and Save Articles fetched successfully", user);
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

    let user = await findUserById(req.userId);

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
    user.Profile_image = profileImageUrl;
    await user.save();

    sendSuccess(res, HTTP_STATUS.OK, "Profile image updated successfully", profileImageUrl);
});

// get user details
module.exports.getUserDetails = expressAsyncHandler(async (req, res) => {
    const user = await getPublicProfile(req.userId);

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

    sendSuccess(res, HTTP_STATUS.OK, "User details fetched successfully", user);
});

// update user general details
module.exports.updateUserGeneralDetails = expressAsyncHandler(
  async (req, res) => {
      const userId = req?.userId;
      const { username, userHandle, email, about } = req.body;
      // Validate input fields
      if (!username || !userHandle || !email || !about) {
        throwError(
          HTTP_STATUS.BAD_REQUEST,
          ERROR_CODES.VALIDATION_ERROR,
          "Please provide all required fields",
        );
      }

      const emailExists = await checkEmailExists(email, userId);
      if (emailExists) {
        throwError(
          HTTP_STATUS.BAD_REQUEST,
          ERROR_CODES.VALIDATION_ERROR,
          "Email already in use",
        );
      }

      const userHandleExists = await checkUserHandleExists(userHandle, userId);

      if (userHandleExists) {
        throwError(
          HTTP_STATUS.BAD_REQUEST,
          ERROR_CODES.VALIDATION_ERROR,
          "User handle already in use",
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
      user.user_name = username;
      user.user_handle = userHandle;
      user.email = email;
      user.about = about;
      await user.save();

      sendSuccess(res, HTTP_STATUS.OK, "User details updated successfully", user);
  },
);
// update user contact details
module.exports.updateUserContactDetails = expressAsyncHandler(
  async (req, res) => {
      const { phone, email } = req.body;

      // Validate input fields
      if (!email || !phone) {
        throwError(
          HTTP_STATUS.BAD_REQUEST,
          ERROR_CODES.VALIDATION_ERROR,
          "Please provide all required fields",
        );
      }

      const emailExists = await checkEmailExists(email, req.userId);

      if (emailExists) {
        throwError(
          HTTP_STATUS.BAD_REQUEST,
          ERROR_CODES.VALIDATION_ERROR,
          "Email already in use",
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
      user.contact_detail.email_id = email;
      user.contact_detail.phone_no = phone;
      await user.save();
      // Respond with success
      sendSuccess(res, HTTP_STATUS.OK, "User contact updated successfully", user);
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
    const { old_password, new_password, userId } = req.body;

    // Check if both old and new passwords are provided
    if (!old_password || !new_password || !userId) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "Please provide all required fields",
      );
    }

    // Check if the new password is long enough
    if (new_password.length < 6) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "Password too short",
      );
    }

    // Find the user by ID
    const user = await findUserById(userId);
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
    const isOldPasswordValid = await isSamePassword(
      old_password,
      user.password,
    );
    if (!isOldPasswordValid) {
      throwError(
        HTTP_STATUS.UNAUTHORIZED,
        ERROR_CODES.INVALID_CREDENTIALS,
        "Invalid old password",
      );
    }

    // Ensure the new password is not the same as the old password
    const isSameAsOldPassword = await isSamePassword(
      new_password,
      user.password,
    );
    if (isSameAsOldPassword) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.VALIDATION_ERROR,
        "Same as old password",
      );
    }

    const newHashedPassword = await generateHashPassword(new_password);

    // Update the user's password
    user.password = newHashedPassword;
    await user.save();

    sendSuccess(res, HTTP_STATUS.OK, "Password updated successfully", user);
});
