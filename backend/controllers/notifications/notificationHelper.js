
const admin = require('../../config/firebase');
const User = require('../../models/UserModel');
const Notification = require('../../models/notificationSchema');
const Admin = require('../../models/admin/adminModel');
const Article = require('../../models/Articles');
const { sendNewArticleEmail } = require('../emailservice');


/**
 * 
 * @param {
 * } deviceToken 
 * @param {*} message 
 */

const sendPushNotification = (deviceToken, message) => {

    const payload = {
        notification: {
            title: message.title,
            body: message.body,
        },
    };

    // Send the push notification to a specific device token using send()
    admin.messaging()
        .send({
            token: deviceToken,
            notification: payload.notification,
        })
        .then(async (response) => {
            console.log("Successfully sent message:", response);
        })
        .catch((error) => {
            console.log("Error sending message:", error);
        });
};


/**
 * 
 * @param {*} postId  // article id
 * @param {*} message // title: "@author posted",
 * @param {*} authorId  // author id
 */


module.exports.sendPostNotification =
    async (userId, articleId, articleRecordId, podcastId, requestId, title, message, authorTitle, authorMessage) => {

        try {
            const user = await User.findById(userId).populate('followers').exec();
            // (userId, articleId, articleRecordId, type, title, message, read, timestamp)

            if (user) {
                user.followers.forEach(async u => {
                    if (u.fcmToken) {

                        const notification = new Notification({
                            userId: u._id,
                            adminId: null,
                            articleId: articleId,
                            podcastId: podcastId,
                            articleRecordId: articleRecordId,
                            revisonId: requestId,
                            commentId: null,
                            type: podcastId ? 'podcast' : requestId ? 'editRequest' : 'article',
                            title: title,
                            message: message,
                            read: false,
                            timestamp: Date.now()
                        });
                        await notification.save();

                        sendPushNotification(user.fcmToken, {
                            title: title,
                            body: message
                        });
                    }
                });

                if (user.fcmToken) {
                    const notification = new Notification({
                        userId: user._id,
                        adminId: null,
                        articleId: articleId,
                        podcastId: podcastId,
                        articleRecordId: articleRecordId,
                        revisonId: requestId,
                        commentId: null,
                        type: podcastId ? 'podcast' : requestId ? 'editRequest' : 'article',
                        title: authorTitle,
                        message: authorMessage,
                        read: false,
                        timestamp: Date.now()
                    });
                    await notification.save();

                    sendPushNotification(user.fcmToken, {
                        title: authorTitle,
                        body: authorMessage
                    });
                }
            }


        } catch (err) {
            console.log(err);
        }
    }




/**
 * 
 * @param {*} authorId  // author of the article
 * @param {*} message   // title & body:
 *                     // title: "@username like your post"
 */
// Open NotificationScreen -> HomeScreen
module.exports.sendPostLikeNotification =
    async (userId, articleId, podcastId, articleRecordId, title, message) => {
        try {
            const user = await User.findById(userId);
            // (userId, articleId, articleRecordId, type, title, message, read, timestamp)

            // console.log(user);
            if (user && user.fcmToken) {

                //console.log("Push Notification sending");
                const notification = new Notification({
                    userId: user._id,
                    adminId: null,
                    articleId: articleId,
                    podcastId: podcastId,
                    articleRecordId: articleRecordId,
                    revisonId: null,
                    commentId: null,
                    type: podcastId ? 'podcastLike' : 'articleLike',
                    title: title,
                    message: message,
                    read: false,
                    timestamp: Date.now()
                });
                await notification.save();

                sendPushNotification(user.fcmToken, {
                    title: title,
                    body: message
                });
               
            }
            else {
                console.log("No FCM token found");
            }
        } catch (err) {
            console.log(err);
        }
    }

// CommentScreen
/**
 * 
 * @param {*} authorId  // author of the article
 * @param {*} postId   // article id
 * @param {*} message  // title & body : title :"@username commented on your Post"
 *                      // body: "Your comment content here"
 */
module.exports.sendCommentNotification =
    async (articleId, podcastId, commentId, requestId, articleRecordId, userId, adminId, title, message) => {

        try {

            if (!userId && !adminId) return;

            let user;

            if (adminId) {
                user = await Admin.findById(adminId);
            } else {
                user = await User.findById(userId);
            }

            if (user && user.fcmToken) {

                const notification = new Notification({
                    userId: userId ? user._id : null,
                    adminId: adminId ? user._id : null,
                    articleId: articleId,
                    podcastId: podcastId,
                    articleRecordId: articleRecordId,
                    revisonId: requestId,
                    commentId: commentId,
                    type: podcastId ? 'podcastComment' : requestId ? 'editRequestComment' : 'articleComment',
                    title: title,
                    message: message,
                    read: false,
                    timestamp: Date.now()
                });
                await notification.save();

                sendPushNotification(user.fcmToken, {
                    title: title,
                    body: message
                });
            }
        } catch (err) {
            console.error(err);
        }
    }

/**
 * 
 * @param {*} userId  // comment author id
 * @param {*} postId  // article id
 * @param {*} message // title :"@username like your comment"
 */

// Use case
// When a user likes a podcast comment
// When a user likes an article comment

module.exports.sendCommentLikeNotification =
    async (userId, articleId, podcastId, articleRecordId, commentId, title, message) => {

        try {
            const user = await User.findById(userId);

            if (user && user.fcmToken) {

                const notification = new Notification({
                    userId: user._id,
                    articleId: articleId,
                    podcastId: podcastId,
                    articleRecordId: articleRecordId,
                    revisonId: null,
                    commentId: commentId,
                    type: 'commentLike',
                    title: title,
                    message: message,
                    read: false,
                    timestamp: Date.now()
                });
                await notification.save();

                sendPushNotification(user.fcmToken, {
                    title: title,
                    body: message
                });
            }
        } catch (err) {
            console.error(err);
            //sendPushNotification()
        }
    }

/**
 * 
 * @param {*} userId -> user id, whom to be followed you
 * @param {*} message  -> title:"@username followed you since date.now"
 */
module.exports.userFollowNotification = async (userId, message) => {

    try {
        const user = await User.findById(userId);
        // (userId, type, title, message, read, timestamp)
        if (user && user.fcmToken) {

            const notification = new Notification({
                userId: user._id,
                articleId: null,
                podcastId: null,
                articleRecordId: null,
                revisonId: null,
                commentId: null,
                type: 'userFollow',
                title: message.title,
                message: message.message,
                read: false,
                timestamp: Date.now()
            });
            await notification.save();
            sendPushNotification(user.fcmToken, message);
        }
    } catch (err) {
        console.error(err);
    }
}

// Repost Notification
// Use Case
// User repost an article, notify to their followers
// Notify to author of the article

module.exports.repostNotification =
    async (userId, authorId, articleId, articleRecordId, title, message, authorTitle, authorMessage) => {

        try {

            // Notify to all followers
            const user = await User.findById(userId).populate('followers').exec();

            if (user) {
                user.followers.forEach(async u => {
                    if (u.fcmToken) {

                        const notification = new Notification({
                            userId: u._id,
                            articleId: articleId,
                            podcastId: null,
                            articleRecordId: articleRecordId,
                            revisonId: null,
                            commentId: null,
                            type: 'articleRepost',
                            title: title,
                            message: message,
                            read: false,
                            timestamp: Date.now()
                        });
                        await notification.save();
                        sendPushNotification(u.fcmToken, {
                            title: title,
                            body: message
                        });
                    }
                });
            }
            // Notify to author
            const author = await User.findById(authorId);

            if (author && author.fcmToken) {

                const notification = new Notification({
                    userId: author._id,
                    articleId: articleId,
                    podcastId: null,
                    articleRecordId: articleRecordId,
                    revisonId: null,
                    commentId: null,
                    type: 'articleRepost',
                    title: authorTitle,
                    message: authorMessage,
                    read: false,
                    timestamp: Date.now()
                });
                await notification.save();
                sendPushNotification(author.fcmToken, {
                    title: authorTitle,
                    body: authorMessage
                });
            }

        } catch (err) {

            console.error(err);
        }
    }

// Mention Notification
// Use Case
// User mentioned for article comment
// User mentioned for podcast comment

module.exports.mentionNotification =
    async (mentionedUsers, articleId, podcastId, requestId, articleRecordId, commentId, title, message) => {

        try {
            mentionedUsers.forEach(async userId => {
                const user = await User.findById(userId);
                if (user && user.fcmToken) {

                    const notification = new Notification({
                        userId: user._id,
                        articleId: articleId,
                        podcastId: podcastId,
                        articleRecordId: articleRecordId,
                        revisonId: requestId,
                        commentId: commentId,
                        type: podcastId ? 'podcastCommentMention' : 'articleCommentMention',
                        title: title,
                        message: message,
                        read: false,
                        timestamp: Date.now()
                    });
                    await notification.save();

                    sendPushNotification(user.fcmToken, {
                        title: title,
                        body: message
                    });
                }

            });
        } catch (err) {
            console.error(err);

        }
    }

// Use Case
// When admin submit feedback on article
// When admin submit feedback on an improvement request
module.exports.articleReviewNotificationsToUser = async (userId, articleId, articleRecordId, requestId, title, message) => {

    try {
        const user = await User.findById(userId);
        // Create notification object
        // (userId, articleId, articleRecordId, type, title, message, read, timestamp)


        if (user && user.fcmToken) {

            const notification = new Notification({
                userId: user._id,
                articleId: articleId,
                articleRecordId: articleRecordId,
                revisonId: requestId,
                type: requestId ? 'articleRevisionReview' : 'articleReview',
                title: title,
                message: message,
                read: false,
                timestamp: Date.now()
            });
            await notification.save();

            sendPushNotification(user.fcmToken, {
                title: title,
                body: message
            });
        }
    } catch (err) {
        console.error(err);
        //sendPushNotification()
    }
}

// Use case
// When user submit a podcast for review
// when admin take any action on podcast
module.exports.podcastReviewNotificationsToUser = async (userId, podcastId, title, message) => {

    try {
        const user = await User.findById(userId);
        // Create notification object
        // (userId, articleId, articleRecordId, type, title, message, read, timestamp)

        if (user && user.fcmToken) {

            const notification = new Notification({
                userId: user._id,
                articleId: null,
                articleRecordId: null,
                revisonId: null,
                podcastId: podcastId,
                type: 'podcastReview',
                title: title,
                message: message,
                read: false,
                timestamp: Date.now()
            });
            await notification.save();

            sendPushNotification(user.fcmToken, {
                title: title,
                body: message
            });
        }
    } catch (err) {
        console.error(err);
        //sendPushNotification()
    }
}

// Use Case
// When user submit article for review
// When user submit improvement for review
module.exports.articleSubmitNotificationsToAdmin =
    async (adminId, articleId, articleRecordId, requestId, title, message) => {

        try {
            const admin = await Admin.findById(adminId);
            // Create notification object
            // (userId, articleId, articleRecordId, type, title, message, read, timestamp)
            if (admin && admin.fcmToken) {

                const notification = new Notification({
                    adminId: admin._id,
                    articleId: articleId,
                    articleRecordId: articleRecordId,
                    revisonId: requestId,
                    type: requestId ? 'revisionSubmitToAdmin' : 'articleSubmitToAdmin',
                    title: title,
                    message: message,
                    read: false,
                    timestamp: Date.now()
                });
                await notification.save();

                sendPushNotification(admin.fcmToken, {
                    title: title,
                    body: message
                });
            }
        } catch (err) {
            console.error(err);
            //sendPushNotification()
        }
    }


// Task left
// Notification URL set up (done)
// Podcast notification with notification url (done)
// Auth middleware change for admin and user (done)

module.exports.broadcastNewArticlePublished = async (articleId) => {
    try {
        const article = await Article.findById(articleId).populate('tags authorId').exec();
        if (!article || article.is_removed) return;

        const isHealthCategory = article.tags.some(tag => tag.name.toLowerCase() === 'health');

        let usersToNotify = [];
        if (isHealthCategory) {
            usersToNotify = await User.find({ isBlockUser: false, isBannedUser: false });
        } else {
            usersToNotify = await User.find({
                isBlockUser: false,
                isBannedUser: false,
                $or: [
                    { _id: { $in: article.authorId.followers } },
                    { 'notificationPreferences.contentClusters': { $in: article.tags.map(t => t._id) } }
                ]
            });
        }

        const articleLink = `https://uhsocial.in/api/share/blog/${article.pb_recordId}`;

        // Asynchronously dispatch notifications
        usersToNotify.forEach(async (user) => {
            try {
                // Send email
                if (user.email) {
                    sendNewArticleEmail(user.email, article.title, article.authorId.user_name, articleLink);
                }

                // Send push notification
                if (user.fcmToken) {
                    const notification = new Notification({
                        userId: user._id,
                        adminId: null,
                        articleId: article._id,
                        podcastId: null,
                        articleRecordId: article.pb_recordId,
                        revisonId: null,
                        commentId: null,
                        type: 'article',
                        title: `New Article by ${article.authorId.user_name}`,
                        message: article.title,
                        read: false,
                        timestamp: Date.now()
                    });
                    await notification.save();

                    sendPushNotification(user.fcmToken, {
                        title: `New Article by ${article.authorId.user_name}`,
                        body: article.title
                    });
                }
            } catch (err) {
                console.error(`Error notifying user ${user._id} for article ${article._id}:`, err);
            }
        });

    } catch (error) {
        console.error('Error in broadcastNewArticlePublished:', error);
    }
};
