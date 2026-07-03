const User = require('../../models/UserModel')
const UnverifiedUser = require('../../models/UnverifiedUserModel')
const {
    generateVerificationToken,
    hashToken,
} = require('../security/tokenService')
const { generateHashPassword } = require('../security/encryptService')
const { ROLES } = require('../../constants/roles')
const { throwError } = require('../../utils/throwError')
const { HTTP_STATUS, ERROR_CODES } = require('../../constants/errorConstants')

const createUser = async ({
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
}) => {
    const newUser = new User({
        user_name: user_name,
        user_handle: user_handle,
        email: email,
        password: password,
        isDoctor: isDoctor,
        specialization: specialization,
        qualification: qualification,
        Years_of_experience: Years_of_experience,
        contact_detail: contact_detail,
        Profile_image: Profile_image,
        isVerified: true,
    })

    await newUser.save()

    if (newUser) {
        return newUser
    }
    return null
}

const createUnverifiedUser = async ({
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
}) => {
    const hashedPassword = await generateHashPassword(password)
    const role = isDoctor ? ROLES.DOCTOR : ROLES.USER
    const { verificationToken, jti } = generateVerificationToken({
        email,
        role,
    })
    const hashedJti = await hashToken(jti)

    const newUser = new UnverifiedUser({
        user_name: user_name,
        user_handle: user_handle,
        email: email,
        password: hashedPassword,
        isDoctor: isDoctor,
        specialization: specialization,
        qualification: qualification,
        Years_of_experience: Years_of_experience,
        contact_detail: contact_detail,
        Profile_image: Profile_image,
        hashedJti: hashedJti,
    })

    await newUser.save()

    if (newUser) {
        return verificationToken
    }
    return null
}

const findUnverifiedUserByEmail = async (email) => {
    const user = await UnverifiedUser.exists({ email: email })
    return user
}

const findUnverifiedUserByHandle = async (user_handle) => {
    const user = await UnverifiedUser.findOne({ user_handle: user_handle })
    if (!user) return null
    return user
}

const findUnverifiedUserById = async (_id) => {
    const user = await UnverifiedUser.findById(_id)

    return user
}

const findUserByEmail = async (email) => {
    return User.findOne({ email }).lean()
}

const findUserByHandle = async (user_handle) => {
    const user = await User.findOne({ user_handle: user_handle })
    if (!user) return null
    return user
}

const findUserById = async (_id) => {
    const user = await User.findById(_id).lean()
    return user
}

const getMyProfile = async (userId) => {
    const ARTICLE_POPULATE = {
        path: 'tags',
        select: '_id name slug',
    }

    const ARTICLE_SELECT = '_id title slug coverImage createdAt tags author'

    return User.findById(userId)
        .select(
            '_id user_id user_name user_handle about email isDoctor specialization qualification Years_of_experience contact_detail Profile_image followers followings followerCount followingCount articles savedArticles repostArticles'
        )
        .populate([
            {
                path: 'articles',
                select: ARTICLE_SELECT,
                populate: ARTICLE_POPULATE,
            },
            {
                path: 'savedArticles',
                select: ARTICLE_SELECT,
                populate: ARTICLE_POPULATE,
            },
            {
                path: 'repostArticles',
                select: ARTICLE_SELECT,
                populate: ARTICLE_POPULATE,
            },
        ])
        .lean()
}

// const getPublicProfile = async (userId, userHandle) => {
//     const ARTICLE_SELECT =
//         '_id title slug coverImage createdAt status tags author'

//     const TAG_POPULATE = {
//         path: 'tags',
//         select: '_id name slug',
//     }

//     const USER_PUBLIC_SELECT = `
//   _id
//   user_id
//   user_name
//   user_handle
//   isDoctor
//   specialization
//   qualification
//   Years_of_experience
//   contact_detail
//   Profile_image
//   followers
//   followings
//   followerCount
//   followingCount
//   articles
//   repostArticles
//   improvements
//   isBlockUser
//   isBannedUser
// `

//     const query = userId
//         ? User.findById(userId)
//         : User.findOne({ user_handle: userHandle })
//     const user = await query
//         .select(USER_PUBLIC_SELECT)
//         .populate([
//             {
//                 path: 'articles',
//                 match: { status: 'published' },
//                 select: ARTICLE_SELECT,
//                 options: { sort: { createdAt: -1 }, limit: 10 },
//                 populate: TAG_POPULATE,
//             },
//             {
//                 path: 'repostArticles',
//                 select: ARTICLE_SELECT,
//                 options: { sort: { createdAt: -1 }, limit: 10 },
//                 populate: TAG_POPULATE,
//             },
//             {
//                 path: 'improvements',
//                 select: ARTICLE_SELECT,
//                 options: { sort: { createdAt: -1 }, limit: 10 },
//                 populate: TAG_POPULATE,
//             },
//         ])
//         .lean()

//     if (!user) return null

//     if (user.isBlockUser || user.isBannedUser) {
//         throwError(
//             HTTP_STATUS.FORBIDDEN,
//             ERROR_CODES.ACCESS_DENIED,
//             'User is blocked or banned'
//         )
//     }

//     if (!user.isDoctor) {
//         delete user.specialization
//         delete user.qualification
//         delete user.Years_of_experience
//     }
//     delete user.isBannedUser
//     delete user.isBlockUser

//     return user
// }

const getPublicProfile = async (userId, userHandle) => {
    const ARTICLE_SELECT = `
        _id
        title
        slug
        coverImage
        createdAt
        status
        tags
        author
        authorId
        mentionedUsers
        likedUsers
    `

    const ARTICLE_POPULATE = [
        {
            path: 'tags',
            select: '_id name slug',
        },
        {
            path: 'mentionedUsers',
            select: 'user_handle user_name Profile_image',
            match: {
                isBlockUser: false,
                isBannedUser: false,
            },
        },
        {
            path: 'likedUsers',
            select: 'Profile_image user_name user_handle',
            match: {
                isBlockUser: false,
                isBannedUser: false,
            },
        },
        {
            path: 'authorId',
            select: 'Profile_image user_name user_handle',
            match: {
                isBlockUser: false,
                isBannedUser: false,
            },
        },
    ]

    const USER_PUBLIC_SELECT = `
        _id
        user_id
        user_name
        user_handle
        isDoctor
        specialization
        qualification
        Years_of_experience
        contact_detail
        Profile_image
        followers
        followings
        followerCount
        followingCount
        articles
        repostArticles
        improvements
        isBlockUser
        isBannedUser
    `

    const query = userId
        ? User.findById(userId)
        : User.findOne({ user_handle: userHandle })

    const user = await query
        .select(USER_PUBLIC_SELECT)
        .populate([
            {
                path: 'articles',
                match: { status: 'published' },
                select: ARTICLE_SELECT,
                options: { sort: { createdAt: -1 }, limit: 10 },
                populate: ARTICLE_POPULATE,
            },
            {
                path: 'repostArticles',
                select: ARTICLE_SELECT,
                options: { sort: { createdAt: -1 }, limit: 10 },
                populate: ARTICLE_POPULATE,
            },
            {
                path: 'improvements',
                select: ARTICLE_SELECT,
                options: { sort: { createdAt: -1 }, limit: 10 },
                populate: ARTICLE_POPULATE,
            },
        ])
        .lean()

    if (!user) return null

    if (user.isBlockUser || user.isBannedUser) {
        throwError(
            HTTP_STATUS.FORBIDDEN,
            ERROR_CODES.ACCESS_DENIED,
            'User is blocked or banned'
        )
    }

    if (!user.isDoctor) {
        delete user.specialization
        delete user.qualification
        delete user.Years_of_experience
    }

    delete user.isBannedUser
    delete user.isBlockUser

    return user
}
const checkExistingUser = async ({ email, user_handle }) => {
    const existingUser = await User.exists({
        $or: [{ email }, { user_handle }],
    })

    const existingUnverifiedUser = await UnverifiedUser.exists({
        $or: [{ email }, { user_handle }],
    })

    return !!(existingUser || existingUnverifiedUser)
}

const updateUserOtp = async (userId, payload) =>
    User.updateOne({ _id: userId }, { $set: payload })

const loginUser = async (userId, refreshToken, jti, fcmToken) => {
    const hashedToken = await hashToken(refreshToken)
    const user = await User.findByIdAndUpdate(
        userId,
        {
            refreshToken: { hashedRefreshToken: hashedToken, jti },
            fcmToken: fcmToken,
        },
        { new: true }
    )
    return user
}

const deleteUserByEmail = async (email) => {
    await User.deleteOne({ email: email })
}

const followUser = async (userId, targetUserId) => {
    const result = await User.updateOne(
        {
            _id: userId,
            followings: { $ne: targetUserId },
        },
        {
            $addToSet: { followings: targetUserId },
            $inc: { followingCount: 1 },
        }
    )

    if (result.modifiedCount === 0) {
        return false
    }

    await User.updateOne(
        {
            _id: targetUserId,
            followers: { $ne: userId },
        },
        {
            $addToSet: { followers: userId },
            $inc: { followerCount: 1 },
        }
    )

    return true
}

const unfollowUser = async (userId, targetUserId) => {
    const result = await User.updateOne(
        {
            _id: userId,
            followings: targetUserId,
        },
        {
            $pull: { followings: targetUserId },
            $inc: { followingCount: -1 },
        }
    )

    if (result.modifiedCount === 0) {
        return false
    }

    await User.updateOne(
        {
            _id: targetUserId,
            followers: userId,
        },
        {
            $pull: { followers: userId },
            $inc: { followerCount: -1 },
        }
    )

    return true
}

const getUserSocialData = async (userId) => {
    const user = await User.findById(userId)
        .populate({
            path: 'followings',
            select: 'user_id user_name followers Profile_image',
            match: {
                isBannedUser: false,
                isBlockUser: false,
            },
        })
        .populate({
            path: 'followers',
            select: 'user_id user_name followers Profile_image',
            match: {
                isBannedUser: false,
                isBlockUser: false,
            },
        })
        .exec()

    return user
}

const getUserArticles = async (userId) => {
    const user = await User.findById(userId).populate('articles').exec()

    if (!user) {
        return null
    }
    if (user.isBannedUser || user.isBlockUser) {
        return null
    }
    return user
}

const getUserLikeAndSaveArticlesData = async (userId) => {
    const user = await User.findById(userId)
        .populate({
            path: 'likedArticles',
            populate: {
                path: 'authorId',
                match: {
                    isBlockUser: false,
                    isBannedUser: false,
                },
            },
        })
        .populate({
            path: 'savedArticles',
            populate: {
                path: 'authorId',
                match: {
                    isBlockUser: false,
                    isBannedUser: false,
                },
            },
        })

    return user
}

const checkUserHandleExists = async (user_id, user_handle) => {
    return User.exists({
        user_handle: user_handle,
        _id: { $ne: user_id },
    })
}

const checkEmailExists = async (email, userId) => {
    return User.exists({
        contact_detail: { email: email },
        email: email,
        _id: { $ne: userId },
    })
}

const incrementOtpAttemptsUser = (userId) => {
    return User.updateOne({ _id: userId }, { $inc: { otpAttempts: 1 } })
}

const clearOtpUser = (userId) => {
    return User.updateOne(
        { _id: userId },
        {
            $unset: {
                otp: '',
                otpExpires: '',
                otpAttempts: '',
                otpLastSentAt: '',
            },
        }
    )
}

const updateUserPasswordAndClearOtp = async (userId, password) => {
    const hashedPassword = await generateHashPassword(password)
    return User.updateOne(
        { _id: userId },
        {
            $set: {
                password: hashedPassword,
            },
            $unset: {
                otp: '',
                otpExpires: '',
                otpAttempts: '',
                otpLastSentAt: '',
            },
        }
    )
}

const logoutUser = async (userId) => {
    const isUpdated = await User.updateOne(
        { _id: userId },
        {
            $unset: {
                'refreshToken.hashedRefreshToken': 1,
                'refreshToken.jti': 1,
            },
        }
    )
    console.log('Logout User - DB Update Result:', isUpdated)
    return isUpdated
}

const deleteUserById = async (userId) => {
    return User.deleteOne({ _id: userId })
}

const updateUserProfilePictureById = async (userId, profilePictureUrl) => {
    return User.findByIdAndUpdate(userId, { Profile_image: profilePictureUrl })
}

const updateUserPasswordById = async (userId, newPassword) => {
    const hashedPassword = await generateHashPassword(newPassword)
    return User.findByIdAndUpdate(userId, {
        $set: {
            password: hashedPassword,
        },
    })
}

const updateUserGeneralDetailsById = async (
  userId,
  { user_name, user_handle, about }
) => {
  return User.findByIdAndUpdate(
    userId,
    {
      $set: {
        user_name,
        user_handle,
        about,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
};

const updateUserContactDetailsById = async (
  userId,
  { contact_detail }
) => {
  return User.findByIdAndUpdate(
    userId,
    {
      $set: {
        contact_detail,
      },
    },
    {
      new: true,
      runValidators: true,
     }
  );
}

module.exports = {
    createUser,
    createUnverifiedUser,
    findUnverifiedUserByEmail,
    findUnverifiedUserByHandle,
    findUnverifiedUserById,
    findUserByEmail,
    findUserByHandle,
    findUserById,
    checkExistingUser,
    getMyProfile,
    getPublicProfile,
    updateUserOtp,
    loginUser,
    deleteUserByEmail,
    followUser,
    unfollowUser,
    getUserSocialData,
    getUserArticles,
    getUserLikeAndSaveArticlesData,
    checkUserHandleExists,
    checkEmailExists,
    incrementOtpAttemptsUser,
    clearOtpUser,
    updateUserPasswordAndClearOtp,
    logoutUser,
    deleteUserById,
    updateUserProfilePictureById,
    updateUserPasswordById,
    updateUserGeneralDetailsById,
    updateUserContactDetailsById,
}
// Left
// 1. Update User
// 2. Delete User
// 3. Delete Unverified User
