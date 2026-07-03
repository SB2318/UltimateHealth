// moderator registration
// moderator verification
// moderator and admin login
// moderator and admin logout
// moderator account deletion
const bcrypt = require("bcrypt");
const expressAsyncHandler = require("express-async-handler");
const admin = require('../../models/admin/adminModel')
const BlacklistedToken = require('../../models/blackListedToken');
const User = require("../../models/UserModel");
const UnverifiedUser = require('../../models/UnverifiedUserModel');
const { deleteFileFn } = require('../uploadController');
const {
  generateRefreshToken,
  generateVerificationToken
} = require("../../services/security/tokenService");


module.exports.register = expressAsyncHandler(
  async (req, res) => {
    try {
      const {
        user_name,
        user_handle,
        email,
        Profile_avtar,
        password,
      } = req.body;

      // Check for required fields
      if (!user_name || !user_handle || !email || !password) {
        return res
          .status(400)
          .json({ error: "Please provide all required fields" });
      }

      // Check if user already exists in User or UnverifiedUser collections

      const [existingAdmin, existingUserHandle, existingUser, existingUnverifiedUser] =
        await Promise.all([
          await admin.findOne({ email }),
          await admin.findOne({ user_handle }),
          await User.findOne({ email }),
          await UnverifiedUser.findOne({ email })
        ])

      if (existingUser || existingAdmin || existingUserHandle || existingUnverifiedUser) {
        return res.status(400).json({ error: "Email already in use" });
      }

      if (existingUserHandle) {
        return res.status(400).json({ error: "User Handle already in use" });
      }


      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Generate a verification token
      const verificationToken = generateVerificationToken({ email });

      // Create new unverified user
      const adminuser = new admin({
        user_name,
        user_handle,
        email,
        password: hashedPassword,
        Profile_avtar,
        verificationToken,
      });

      await adminuser.save();

      // Send verification email
      // sendVerificationEmail(email, verificationToken);

      res.status(201).json({
        message: "Registration successful. Please verify your email."
      });

    } catch (error) {
      console.error("Error during registration:", error);

      // Handle validation errors
      if (error.name === "ValidationError") {
        const validationErrors = Object.values(error.errors).map(
          (val) => val.message
        );
        return res.status(400).json({ error: validationErrors });
      }

      // Handle duplicate email/user handle error
      if (error.code === 11000) {
        return res
          .status(409)
          .json({ error: "Email or user handle already exists" });
      }

      // Handle general server errors
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports.login = expressAsyncHandler(
  async (req, res) => {
    try {
      const { email, password, fcmToken } = req.body;

      if (!email || !password || !fcmToken) {
        return res
          .status(400)
          .json({ error: "Please provide email and password and FCM Token" });
      }

      let user = await admin.findOne({ email });


      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.isVerified === false || !user.signature_url || user.signature_url === "") {
        return res
          .status(403)
          .json({ error: "Email not verified. Please check your email." });
      }


      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }

      // Blacklist the token
      if (user.refreshToken != null) {
        const blacklistedToken = new BlacklistedToken({ token: user.refreshToken });
        await blacklistedToken.save();
      }
    
      // Generate Refresh Token
      const refreshToken = generateRefreshToken({
        userId: user._id,
        email: user.email,
        role: 'admin'
      });

      // Store refresh token in the database
      user.refreshToken = refreshToken;
      user.fcmToken = fcmToken;
      await user.save();

      // Set cookies for tokens
      // res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 900000 }); // 15 minutes
      
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "Login Successful",
        user: {
          _id: user._id,
          email: user.email,
          user_name: user.user_name,
          user_handle: user.user_handle,
          isVerified: user.isVerified,
        }
      });
    } catch (error) {
      console.log("Login Error", error);

      if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message }); // Validation errors
      } else {
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  }
);

module.exports.logout = expressAsyncHandler(
  async (req, res) => {
    try {
      // Find the admin and remove the refresh token
      const user = await admin.findById(req.userId);

      if (user) {
        // Get access token from request (used for authentication)
        const accessToken = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];

        // Blacklist both access and refresh tokens
        const tokensToBlacklist = [];

        if (accessToken) {
          tokensToBlacklist.push({ token: accessToken });
        }

        if (user.refreshToken) {
          tokensToBlacklist.push({ token: user.refreshToken });
        }

        // Bulk insert blacklisted tokens
        if (tokensToBlacklist.length > 0) {
          await BlacklistedToken.insertMany(tokensToBlacklist);
        }

        // Clear refresh token from admin document
        user.refreshToken = null;
        await user.save();
      }

      // Clear cookies
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Admin Logout Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports.getprofile = expressAsyncHandler(
  async (req, res) => {
    try {
      const user = await admin.findById(req.userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      if (!user.isVerified) {
        return res
          .status(403)
          .json({ error: "Email not verified. Please check your email." });
      }

      //const articleContributed = await Article.countDocuments({ reviewer_id: user._id, status: statusEnum.statusEnum.PUBLISHED });


      return res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }

  }
);

// update user password
module.exports.updateAdminPassword = expressAsyncHandler(
  async (req, res) => {
    try {
      //const userId = req?.userId;
      const { new_password, email } = req.body;

      // Check if both old and new passwords are provided
      if (!new_password || !email) {
        return res.status(400).json({ error: "Missing passwords and email" });
      }

      // Check if the new password is long enough
      if (new_password.length < 6) {
        return res.status(400).json({ error: "Password too short" });
      }

      // Find the user by ID
      const user = await admin.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }


      // Ensure the new password is not the same as the old password
      const isSameAsOldPassword = await bcrypt.compare(
        new_password,
        user.password
      );
      if (isSameAsOldPassword) {
        return res.status(400).json({ error: "Same as old password" });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(new_password, salt);

      // Update the user's password
      user.password = newHashedPassword;
      await user.save();
      res.json({ status: true, message: "Password updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Edit profile: user_name, user_handle, password, profile_avtar

module.exports.editProfile = expressAsyncHandler(
  async (req, res) => {

    const { user_name, user_handle, password, profile_avtar } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {

      const user = await admin.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.user_name = user_name || user.user_name;
      user.user_handle = user_handle || user.user_handle;
      user.profile_avtar = profile_avtar || user.profile_avtar;
      // encrypt password
      const isSameAsOldPassword = await bcrypt.compare(
        password,
        user.password
      );
      if (isSameAsOldPassword) {
        return res.status(400).json({ error: "Same as old password" });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      const newHashedPassword = await bcrypt.hash(password, salt);

      // Update the user's password
      user.password = newHashedPassword;
      await user.save();

      res.status(200).json({ status: true, message: "Profile updated" });

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// Duplicate logout function removed - using expressAsyncHandler version above

module.exports.deleteAdmin = expressAsyncHandler(
  async (req, res) => {

    try {
      const { password } = req.body;
      const user = await admin.findById(req.userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!user.isVerified) {
        return res
          .status(403)
          .json({ error: "Email not verified. Please check your email." });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
      }
      // delete profile image from aws
      const avatar = user?.Profile_avtar;
      if (
        typeof avatar === "string" &&
        avatar.trim() !== "" &&
        !avatar.startsWith("http://") &&
        !avatar.startsWith("https://") &&
        !avatar.startsWith("//") &&
        !avatar.startsWith("data:")
      ) {
        await deleteFileFn(avatar);
      }

      await admin.deleteOne({ email: user.email });

      res.json({
        status: true,
        message: "account has been removed from database",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


