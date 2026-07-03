const express = require('express')
const router = express.Router()
const path = require('path')
const {
  register,
  login,
  getTokenStatus,
  logout,
  sendOTPForForgotPassword,
  verifyOtpForForgotPassword,
  deleteByUser,
  deleteByAdmin,
  getprofile,
  getProfileImage,
  follow,
  //getFollowers,
  getUserProfile,
  getSocials,
  getUserWithArticles,
  getUserLikeAndSaveArticles,
  //getFollowings,
  checkOtp,
  refreshToken,
  updateProfileImage,
  getUserDetails,
  updateUserPassword,
  updateUserGeneralDetails,
  updateUserContactDetails,
  updateUserProfessionalDetails,
  checkUserHandle,
  updateNotificationPreferences,
  getNotificationPreferences
} = require("../controllers/usersControllers");
const {
    verifyEmail,
    sendVerificationEmail,
    Sendverifymail,
    resendVerificationEmail,
} = require('../controllers/emailservice')
const authenticateToken = require('../middleware/authentcatetoken')
const { authenticate } = require('../middleware/authenticate')
const { authorize } = require('../middleware/authorization')
const { ROLES } = require('../constants/roles')
const {
    validateBody,
    validateParams,
    validateQuery,
} = require('../middleware/validator')
const {
    registerSchema,
    loginSchema,
    profileImageParamSchema,
    userProfileQuerySchema,
    followUnfollowSchema,
    forgotPasswordSchema,
    verifyOtpSchema,
    deleteAccountSchema,
    resendVerificationSchema,
    profileImageUpdateSchema,
    updatePasswordSchema,
    updateGeneralDetailsSchema,
    updateContactDetailsSchema,
    updateProfessionalDetailsSchema,
} = require('../validators/auth.schema')
const {
    registerLimiter,
    loginLimiter,
    forgotPasswordLimiter,
    otpLimiter,
} = require('../middleware/ratelimit')

const enforceMinDuration = (minDuration = 700) => {
    return async (req, res, next) => {
        const start = Date.now()

        const originalJson = res.json.bind(res)
        const originalSend = res.send.bind(res)

        const delayIfNeeded = async () => {
            const elapsed = Date.now() - start

            if (elapsed < minDuration) {
                await new Promise((resolve) =>
                    setTimeout(resolve, minDuration - elapsed)
                )
            }
        }

        res.json = async (...args) => {
            await delayIfNeeded()
            return originalJson(...args)
        }

        res.send = async (...args) => {
            await delayIfNeeded()
            return originalSend(...args)
        }

        next()
    }
}

router.get('/hello', (req, res) => {
    console.log('Hello World Route Executed')
    res.send('Hello World')
})

// router.get("/tokenstatus", getTokenStatus);

router.post(
    '/user/register',
    registerLimiter,
    validateBody(registerSchema),
    register
)

router.post(
    '/user/login',
    enforceMinDuration(700),
    loginLimiter,
    validateBody(loginSchema),
    login
)

/**
 * @deprecated
 */
// commenting out refresh token route as we are not using refresh tokens in the current implementation
// router.post("/user/refreshToken", refreshToken);

router.get(
    '/user/getprofile',
    authenticate,
    authorize(ROLES.USER, ROLES.DOCTOR),
    getprofile
)

router.get(
    '/user/getprofileimage/:userId',
    authenticate,
    authorize(ROLES.USER, ROLES.DOCTOR),
    validateParams(profileImageParamSchema),
    getProfileImage
)

router.get(
    '/user/getuserprofile',
    validateQuery(userProfileQuerySchema),
    getUserProfile
)

router.post(
    '/user/follow',
    authenticate,
    authorize(ROLES.USER, ROLES.DOCTOR),
    validateBody(followUnfollowSchema),
    follow
)

router.post(
    '/user/forgotpassword',
    enforceMinDuration(700),
    forgotPasswordLimiter,
    validateBody(forgotPasswordSchema),
    sendOTPForForgotPassword
)

// verify otp for forgot password is handled by the /verifypassword route.
router.post(
    '/user/verifypassword',
    enforceMinDuration(700),
    otpLimiter,
    validateBody(verifyOtpSchema),
    verifyOtpForForgotPassword
)

router.post(
    '/user/logout',
    authenticate,
    authorize(ROLES.USER, ROLES.DOCTOR),
    logout
)

router.post(
    '/user/delete',
    authenticate,
    authorize(ROLES.USER, ROLES.DOCTOR),
    validateBody(deleteAccountSchema),
    deleteByUser
)

router.get('/user/socials', authenticateToken, getSocials)

router.get('/delete-account', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login-user.html'))
})

/**
 * @deprecated
 */
router.post('/admin/deleteUser', deleteByAdmin)

router.get('/user/verifyEmail', verifyEmail)

// Skipping this route as it dont know where it is used in the frontend.
router.post('/user/verifyEmail', Sendverifymail)

router.post(
    '/user/resend-verification-mail',
    validateBody(resendVerificationSchema),
    resendVerificationEmail
)

router.post(
    '/user/update-profile-image',
    authenticate,
    authorize(ROLES.USER, ROLES.DOCTOR),
    validateBody(profileImageUpdateSchema),
    updateProfileImage
)

router.get(
    '/user/getdetails',
    authenticate,
    authorize(ROLES.USER, ROLES.DOCTOR),
    getUserDetails
)

router.put(
    '/user/update-password',
    authenticate,
    authorize(ROLES.USER, ROLES.DOCTOR),
    validateBody(updatePasswordSchema),
    updateUserPassword
)

router.put(
    '/user/update-general-details',
    authenticate,
    authorize(ROLES.USER, ROLES.DOCTOR),
    validateBody(updateGeneralDetailsSchema),
    updateUserGeneralDetails
)

router.put(
    '/user/update-contact-details',
    authenticate,
    authorize(ROLES.USER, ROLES.DOCTOR),
    validateBody(updateContactDetailsSchema),
    updateUserContactDetails
)

router.put(
    '/user/update-professional-details',
    authenticate,
    authorize(ROLES.DOCTOR),
    validateBody(updateProfessionalDetailsSchema),
    updateUserProfessionalDetails
)

router.post("/user/check-user-handle", checkUserHandle); 

router.put("/user/notification-preferences", authenticateToken, updateNotificationPreferences);
router.get("/user/notification-preferences", authenticateToken, getNotificationPreferences);



/**
 * @later
 */

// Get user with articles
router.get('/user/articles', authenticateToken, getUserWithArticles)

/**
 * @later
 */
// Get user liked and saved articles
router.get(
    '/user/liked-saved-articles',
    authenticateToken,
    getUserLikeAndSaveArticles
)

module.exports = router
