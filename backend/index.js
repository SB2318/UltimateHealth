const express = require('express');

const compression = require('compression');
const cors = require('cors');
const path = require("path");

const cookieParser = require('cookie-parser');
const { articleReviewNotificationsToUser } = require('./controllers/notifications/notificationHelper');
const {sendArticleFeedbackEmail}= require('./controllers/emailservice');
const EditRequest = require('./models/admin/articleEditRequestModel');
const Podcast = require('./models/Podcast');
const statusEnum = require("./utils/StatusEnum");
const mongoSanitize = require('express-mongo-sanitize');
const { xss } = require('express-xss-sanitizer');
const helmet = require('helmet');
const assetLinks = require('./assetlink.json');

const Article = require('./models/Articles');
const User = require('./models/UserModel');
const Comment = require('./models/commentSchema');
const admin = require('./models/admin/adminModel');
const dotenv = require('dotenv');
const db = require("./config/database");
const userRoutes = require("./routes/usersRoutes");
const specializationRoutes = require("./routes/SpecializationsRoutes");
const articleRoutes = require("./routes/articleRoutes");
const glossaryRoutes = require("./routes/glossaryRoutes");
const languageRoutes = require("./routes/languageRoute");
const analyticsRoute = require('./routes/analyticsRoute');
const uploadRoute = require('./routes/uploadRoute');
const notificationRoute = require('./routes/notificationRoute');
const reportRoute = require('./routes/reportRoute');
const adminAuthRoute = require('./routes/adminAuthRoute');
const articleEditRoute = require('./routes/articleEditRequestRoute');
const adminRoute = require('./routes/adminRoute');
const podcastRoute = require('./routes/podcastRoute');
const podcastAdminRoute = require('./routes/podcastReviewRoute');
const commentRoute = require('./routes/commentRoute');
const aiRoute = require('./routes/aiRoute');
const shareRoute = require('./routes/shareRoute');
const contactRoutes = require('./routes/contactRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const {
    sendPostNotification,
    sendPostLikeNotification,
    sendCommentNotification,
    sendCommentLikeNotification,
    repostNotification,
    mentionNotification,
    userFollowNotification,
    articleSubmitNotificationsToAdmin
} = require('./controllers/notifications/notificationHelper');
const {verifyRefreshToken } = require("./services/security/tokenService");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { errorHandler } = require('./middleware/errorHandler');
const { globalLimiter } = require('./middleware/ratelimit');

const app = express();
dotenv.config();
db.dbConnect();

// Prevent process crash on unhandled errors
process.on('uncaughtException', (err) => {
    console.error('CRITICAL: Uncaught Exception:', err);
    // In production, you might want to gracefully shutdown or notify a service
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL: Unhandled Rejection at:', promise, 'reason:', reason);
});

const port = process.env.PORT || 8080;
const url = process.env.PROD_URL;
app.use(express.static('public'));

app.use(cookieParser()); 
app.use(compression()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(xss());
app.use(helmet({
    
}));
app.set('trust proxy', 1);
app.use(globalLimiter); // Apply global rate limiter
app.use(cors({
    origin: ["http://uhsocial.in", "https://uhsocial.in"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

// Define routes
app.use("/api", userRoutes);
app.use("/api", specializationRoutes);
app.use("/api", articleRoutes);
app.use("/api/glossary", glossaryRoutes);
app.use("/api", uploadRoute);
app.use("/api/analytics", analyticsRoute);
app.use("/api", notificationRoute);
app.use("/api", reportRoute);
app.use("/api", adminAuthRoute);
app.use("/api", adminRoute);
app.use("/api", articleEditRoute);
app.use("/api", podcastRoute);
app.use("/api", podcastAdminRoute);
app.use("/api/review", commentRoute);
app.use("/api/language", languageRoutes);
app.use("/api/gemini", aiRoute);
app.use("/api", shareRoute );
app.use("/api", contactRoutes);
app.use("/api", newsletterRoutes);

// Swagger
//app.use('/docs/swagger.json', express.static('./swagger.json'));
/*
app.use('/docs', swaggerUi.serve, swaggerUi.setup(null, {
  swaggerOptions: {
    url: '/docs/swagger.json' // important
  }
}));
*/



app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



// Test route (can be removed later)
app.get("/hello", (req, res) => {
    console.log("Hello World");
    res.send('Hello World');
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get('/.well-known/assetlinks.json', (req, res) => {
  res.status(200).json(assetLinks);
});



const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Docs: ${url}/docs`);
})

let io = require('socket.io')(server, {
    cors: {
        origin: ["http://uhsocial.in", "https://uhsocial.in"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Optional Authentication Middleware
io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (token) {
        try {
            // Verify JWT token

            const decoded = verifyRefreshToken(token);
            socket.userId = decoded.userId || decoded.id;
            socket.isAuthenticated = true;
            console.log(` Authenticated user connected: ${socket.userId} (Socket: ${socket.id})`);
        } catch (err) {
            // Invalid token - log but still allow connection (backward compatible)
            console.log(`  Invalid token provided, proceeding without authentication (Socket: ${socket.id})`);
            socket.isAuthenticated = false;
        }
    } else {
        // No token - allow connection as of now
        socket.isAuthenticated = false;
        console.log(`ℹ  Unauthenticated connection allowed (Socket: ${socket.id})`);
    }

    // as of now
    next();
});


io.on('connection', (socket) => {

    console.log('a user connected');

  
    if (socket.isAuthenticated) {
        console.log(`🔐 Authenticated socket: ${socket.id} | User ID: ${socket.userId}`);
    }

   
    const isAuthenticated = () => socket.isAuthenticated === true;


    const logSecurityEvent = (action, userId, details = {}) => {
        const timestamp = new Date().toISOString();
        const authStatus = socket.isAuthenticated ? '✅ AUTH' : '⚠️  UNAUTH';
        console.log(`[${timestamp}] ${authStatus} | Socket: ${socket.id} | User: ${userId || 'anonymous'} | Action: ${action}`, details);
    };

    // Room management helper functions
    const getRoomName = (articleId, podcastId) => {
        if (articleId) return `article:${articleId}`;
        if (podcastId) return `podcast:${podcastId}`;
        return null;
    };

    const joinRoom = (articleId, podcastId) => {
        const roomName = getRoomName(articleId, podcastId);
        if (roomName) {
            socket.join(roomName);
            console.log(`Socket ${socket.id} joined room: ${roomName}`);
        }
        return roomName;
    };

    const broadcastToRoom = (roomName, event, data) => {
        if (roomName) {
            // Broadcast to room (other users in the same article/podcast)
            socket.to(roomName).emit(event, data);
        }
    };

    /*
    socket.on('new-user', (username, userId)=>{
       addNewUser({userId, username, socketId: socket.id});
    })
       */

    socket.on("notification", (data) => {
        // Save notification to database AND broadcast to user's notification room

        if (data.type === 'openPost') {
            console.log('open post notification');
            sendPostNotification(data.userId, data.articleId,
                data.articleRecordId, data.podcastId,
                data.requestId, data.title, data.message, data.authorTitle, data.authorMessage);

            // Real-time broadcast to target user
            if (data.targetUserId) {
                io.to(`user:${data.targetUserId}`).emit('notification', {
                    type: 'openPost',
                    title: data.title,
                    message: data.message,
                    articleId: data.articleId,
                    podcastId: data.podcastId
                });
            }
        }
        else if (data.type === 'likePost') {
            console.log('like post notification');
            sendPostLikeNotification(data.userId, data.articleId, data.podcastId, data.articleRecordId, data.title, data.message);

            // Real-time broadcast to target user
            if (data.targetUserId) {
                io.to(`user:${data.targetUserId}`).emit('notification', {
                    type: 'likePost',
                    title: data.title,
                    message: data.message,
                    articleId: data.articleId,
                    podcastId: data.podcastId
                });
            }
        }
        else if (data.type === 'commentPost') {
            console.log('comment post notification');
            sendCommentNotification(
                data.articleId,
                data.podcastId,
                data.commentId,
                null,
                data.articleRecordId,
                data.userId,
                data.adminId,
                data.title,
                data.message
            );

            // Real-time broadcast to target user
            if (data.targetUserId) {
                io.to(`user:${data.targetUserId}`).emit('notification', {
                    type: 'commentPost',
                    title: data.title,
                    message: data.message,
                    articleId: data.articleId,
                    podcastId: data.podcastId,
                    commentId: data.commentId
                });
            }
        }
        else if (data.type === 'commentLikePost') {
            console.log('comment like post notification');
            sendCommentLikeNotification(data.userId, data.articleId,
                data.podcastId, data.articleRecordId, data.commentId, data.title, data.message);

            // Real-time broadcast to target user
            if (data.targetUserId) {
                io.to(`user:${data.targetUserId}`).emit('notification', {
                    type: 'commentLikePost',
                    title: data.title,
                    message: data.message,
                    articleId: data.articleId,
                    commentId: data.commentId
                });
            }
        }
        else if (data.type === 'userFollow') {
            console.log('user follow notification');
            userFollowNotification(data.userId, data.message);

            // Real-time broadcast to target user
            if (data.targetUserId) {
                io.to(`user:${data.targetUserId}`).emit('notification', {
                    type: 'userFollow',
                    message: data.message,
                    fromUserId: data.userId
                });
            }
        }
        else if (data.type === "repost") {
            console.log("repost notification");

            repostNotification(
                data.userId,
                data.authorId,
                data.postId,
                data.articleRecordId,
                data.message.title,
                data.message.message,
                data.authorMessage.title,
                data.authorMessage.message
            );

            // Real-time broadcast to author and original poster
            if (data.authorId) {
                io.to(`user:${data.authorId}`).emit('notification', {
                    type: 'repost',
                    title: data.authorMessage.title,
                    message: data.authorMessage.message,
                    postId: data.postId,
                    fromUserId: data.userId
                });
            }
        }
    })
    socket.on('comment', async (data) => {

            socket.emit("comment-processing", true);

            // console.log('Add Event called');
            const { podcastId, userId, articleId, content, parentCommentId, mentionedUsers } = data;

            // Security logging
            logSecurityEvent('COMMENT_CREATE', userId, {
                articleId,
                podcastId,
                isReply: !!parentCommentId,
                authenticated: isAuthenticated()
            });

            if (!userId || !content || content.trim() === '') {
                socket.emit("comment-processing", false);
                socket.emit('error', { message: "Missing required fields: userId, content" });
                return;
            }

            if (!podcastId && !articleId) {
                socket.emit("comment-processing", false);
                socket.emit('error', { message: "either podcast id or article id is required" });
                return;
            }

            try {
                let article, podcast;
                const user = await User.findById(userId);

                if (articleId) {
                    article = await Article.findById(articleId);
                }

                if (podcastId) {
                    podcast = await Podcast.findById(podcastId);
                }
                if (!user || (articleId && (!article || article.is_removed)) || (podcastId && (!podcast || podcast.is_removed))) {
                    socket.emit('error', { message: "user or article or podcast not found" });
                    socket.emit("comment-processing", false);
                    return;
                }

                if (user.isBlockUser || user.isBannedUser) {
                    socket.emit('error', { message: 'User is blocked or banned' });
                    return;
                }
                /** If a new user comment on the article, the id will automatically stored */

                let hasCommentedBefore;

                if (articleId) {
                    hasCommentedBefore = article.mentionedUsers.some(userid => userid.toString() === userId);
                    if (!hasCommentedBefore) {
                        article.mentionedUsers.push(userId);
                        await article.save();
                    }
                }
                else if (podcastId) {
                    hasCommentedBefore = podcast.mentionedUsers.some(userid => userid.toString() === userId);
                    if (!hasCommentedBefore) {
                        podcast.mentionedUsers.push(userId);
                        await podcast.save();
                    }
                }

                const newComment = new Comment({
                    userId,
                    articleId,
                    podcastId,
                    parentCommentId: parentCommentId || null,
                    content,
                    //username,
                    //userprofile
                });

                await newComment.save();

                // Now emit event

                if (parentCommentId) {
                    const parentComment = await Comment.findById(parentCommentId);

                    if (!parentComment || parentComment.is_removed) {
                        socket.emit("comment-processing", false);
                        socket.emit('error', { message: 'Parent comment not found' });
                        return;
                    }
                    parentComment.replies.push(newComment._id);
                    await parentComment.save();

                    const updateData = {
                        parentCommentId: parentComment._id,
                        parentComment
                    };
                    socket.emit('update-parent-comment', updateData);

                    // Broadcast to room (other users)
                    const roomName = getRoomName(articleId, podcastId);
                    broadcastToRoom(roomName, 'update-parent-comment', updateData);

                    // reply

                    const populatedComment = await Comment.findById(newComment._id)
                        .populate('userId', 'user_handle Profile_image')
                        .populate('replies')
                        .exec();

                    socket.emit("comment-processing", false);

                    const commentData = {
                        parentCommentId: parentCommentId,
                        reply: populatedComment,
                        articleId: articleId,
                        podcastId: podcastId
                    };
                    socket.emit('comment', commentData);

                    // Broadcast to room (other users)
                    broadcastToRoom(roomName, 'comment', commentData);

                    if (article && articleId) {

                        sendCommentNotification(
                            null,
                            podcastId,
                            parentComment._id,
                            null,
                            article.pb_recordId,
                            parentComment.userId,
                            null,
                            `${user.user_handle} replied to your comment`,
                            content
                        );

                        // Real-time notification to parent comment owner
                        io.to(`user:${parentComment.userId}`).emit('notification', {
                            type: 'commentReply',
                            title: 'New Reply',
                            message: `${user.user_handle} replied to your comment`,
                            articleId: articleId,
                            commentId: parentComment._id,
                            replyId: populatedComment._id
                        });
                    }
                    else if (podcastId) {
                        sendCommentNotification(
                            null,
                            podcastId,
                            parentComment._id,
                            null,
                            null,
                            parentComment.userId,
                            null,
                            `${user.user_handle} replied to your comment`,
                            content
                        );

                        // Real-time notification to parent comment owner
                        io.to(`user:${parentComment.userId}`).emit('notification', {
                            type: 'commentReply',
                            title: 'New Reply',
                            message: `${user.user_handle} replied to your comment`,
                            podcastId: podcastId,
                            commentId: parentComment._id,
                            replyId: populatedComment._id
                        });
                    }

                } else {

                    const populatedComment = await Comment.findById(newComment._id)
                        .populate('userId', 'user_handle Profile_image')
                        .populate('replies')
                        .exec();

                    socket.emit("comment-processing", false);

                    const commentData = {
                        comment: populatedComment,
                        articleId,
                        podcastId
                    };
                    socket.emit('comment', commentData);

                    // Broadcast to room (other users)
                    const roomName = getRoomName(articleId, podcastId);
                    broadcastToRoom(roomName, 'comment', commentData);

                    /** Send Mention Notification */
                    if (mentionedUsers && Array.isArray(mentionedUsers) && mentionedUsers.length > 0) {


                        mentionNotification(
                            mentionedUsers,
                            articleId,
                            podcastId,
                            null,
                            null,
                            populatedComment._id,
                            `${user.user_handle} mentioned you in a comment`,
                            content
                        );
                    }
                    //  console.log("Mentioned Users", mentionedUsers);

                    if (article && articleId) {

                        sendCommentNotification(
                            article._id,
                            null,
                            populatedComment._id,
                            null,
                            article.pb_recordId,
                            article.authorId,
                            null,
                            `${user.user_handle} commented on your post`,
                            content
                        );

                        // Real-time notification to article author
                        io.to(`user:${article.authorId}`).emit('notification', {
                            type: 'newComment',
                            title: 'New Comment',
                            message: `${user.user_handle} commented on your post`,
                            articleId: article._id,
                            commentId: populatedComment._id
                        });

                    } else if (podcast && podcastId) {
                        sendCommentNotification(
                            null,
                            podcastId,
                            populatedComment._id,
                            null,
                            null,
                            podcast.user_id,
                            null,
                            `${user.user_handle} commented on your podcast`,
                            content
                        );

                        // Real-time notification to podcast author
                        io.to(`user:${podcast.user_id}`).emit('notification', {
                            type: 'newComment',
                            title: 'New Comment',
                            message: `${user.user_handle} commented on your podcast`,
                            podcastId: podcastId,
                            commentId: populatedComment._id
                        });
                    }
                }

            } catch (err) {

                console.error('Error adding comment:', err);
                socket.emit('error', { message: 'Error adding comment' });
                socket.emit("comment-processing", false);
            }
    });

    socket.on('edit-comment', async (data) => {

            socket.emit("edit-comment-processing", true);
            const { podcastId, commentId, content, articleId, userId } = data;

            // Security logging
            logSecurityEvent('COMMENT_EDIT', userId, {
                commentId,
                articleId,
                podcastId,
                authenticated: isAuthenticated()
            });

            // console.log("Comment Id", commentId);
            //  console.log("Content", content);
            //  console.log("Article Id", articleId);
            //  console.log("User Id", userId);
            if (!commentId || !content || content.trim() === '' || !userId) {
                socket.emit("edit-comment-processing", false);
                socket.emit('error', { message: 'Invalid request: Comment ID, User Id and non-empty content are required.' });
                return;
            }

            if (!articleId && !podcastId) {
                socket.emit("edit-comment-processing", false);
                socket.emit('error', { message: 'Invalid request: either podcast id or article id required' });
                return;
            }

            try {

                let article, podcast;

                if (articleId) {
                    article = await Article.findById(articleId);
                }

                if (podcastId) {
                    podcast = await Podcast.findById(podcastId);
                }
                const [comment, user] = await Promise.all([
                    Comment.findById(commentId),
                    User.findById(userId),
                ]);

                if (!comment || !user ||
                    (articleId && (!article || article.is_removed))
                    || comment.is_removed
                    || (podcastId && (!podcast || podcast.is_removed))) {

                    socket.emit("edit-comment-processing", false);
                    socket.emit('error', { message: 'Comment or user or article or podcast not found' });
                    return;
                }

                if (user.isBlockUser || user.isBannedUser) {
                    socket.emit('error', { message: 'User is blocked or banned' });
                    return;
                }


                if (comment.userId.toString() !== user._id.toString()) {
                    socket.emit("edit-comment-processing", false);
                    socket.emit('error', { message: 'You are not authorized to edit this comment' });
                    return;
                }

                comment.content = content;
                comment.updatedAt = new Date();
                comment.isEdited = true;
                await comment.save();

                const populatedComment = await Comment.findById(comment._id)
                    .populate('userId', 'user_handle Profile_image')
                    .populate('replies')
                    .exec();

                socket.emit("edit-comment-processing", false);
                socket.emit('edit-comment', populatedComment);

                // Broadcast to room (other users)
                const roomName = getRoomName(articleId, podcastId);
                broadcastToRoom(roomName, 'edit-comment', populatedComment);
            } catch (err) {
                console.error("Error editing comment:", err);
                socket.emit("edit-comment-processing", false);
                socket.emit('error', { message: 'Error editing comment' });
            }
    });

    socket.on('delete-comment', async (data) => {

            socket.emit("delete-comment-processing", true);
            const { commentId, podcastId, articleId, userId } = data;

            // Security logging
            logSecurityEvent('COMMENT_DELETE', userId, {
                commentId,
                articleId,
                podcastId,
                authenticated: isAuthenticated()
            });

            if (!commentId || !userId) {
                socket.emit("delete-comment-processing", false);
                socket.emit('error', { message: 'Invalid request: Comment ID and user ID are required.' });
                return;
            }

            if (!podcastId && !articleId) {
                socket.emit("delete-comment-processing", false);
                socket.emit('error', { message: 'Invalid request: Podcast ID or article ID is required.' });
                return;
            }

            try {
                const [comment, user] = await Promise.all([
                    Comment.findById(commentId),
                    User.findById(userId)
                ]);

                if (!comment || !user || comment.is_removed) {
                    socket.emit("delete-comment-processing", false);
                    socket.emit('error', { message: 'Comment or user not found.' });
                    return;
                }

                if (user.isBlockUser || user.isBannedUser) {
                    socket.emit("delete-comment-processing", false);
                    socket.emit('error', { message: 'You are blocked or banned.' });
                }

                // Check if the user is authorized to delete the comment
                if (comment.userId.toString() !== userId) {
                    socket.emit("delete-comment-processing", false);
                    socket.emit('error', { message: 'You are not authorized to delete this comment' });
                    return;
                }

                comment.status = 'Deleted';
                comment.updatedAt = new Date();
                await comment.save();

                // If it's a reply, update the parent comment
                const roomName = getRoomName(articleId, podcastId);
                if (comment.parentCommentId) {
                    const parentComment = await Comment.findById(comment.parentCommentId);
                    if (parentComment && !parentComment.is_removed) {
                        parentComment.replies = parentComment.replies.filter(replyId => replyId.toString() !== commentId);
                        await parentComment.save();

                        socket.emit("delete-comment-processing", false);
                        const parentData = {
                            parentCommentId: comment.parentCommentId,
                            parentComment
                        };
                        socket.emit('delete-parent-comment', parentData);

                        // Broadcast to room (other users)
                        broadcastToRoom(roomName, 'delete-parent-comment', parentData);
                    }
                }
                socket.emit("delete-comment-processing", false);
                const deleteData = { commentId, articleId, podcastId };
                socket.emit('delete-comment', deleteData);

                // Broadcast to room (other users)
                broadcastToRoom(roomName, 'delete-comment', deleteData);
            } catch (err) {
                console.error('Error deleting comment:', err);
                socket.emit("delete-comment-processing", false);
                socket.emit('error', { message: 'Error deleting comment' });
            }
    });

    socket.on('like-comment', async (data) => {
            const { commentId, articleId, podcastId, userId } = data;

            socket.emit("like-comment-processing", true);
            if (!commentId || !userId) {
                socket.emit('error', { message: "Invalid request: Comment ID and User ID are required." });
                socket.emit("like-comment-processing", false);
                return;
            }

            if (!articleId && !podcastId) {
                socket.emit('error', { message: "Invalid request: Article ID or Podcast ID is required ." });
                socket.emit("like-comment-processing", false);
                return;
            }

            try {

                let article, podcast;

                if (articleId) {
                    article = await Article.findById(articleId);
                }

                if (podcastId) {
                    podcast = await Podcast.findById(podcastId);
                }
                const [comment, user] = await Promise.all([
                    Comment.findById(commentId).populate('likedUsers').exec(),
                    User.findById(userId)
                ]);

                if (
                    !comment || !user ||
                    (articleId && (!article || article.is_removed))
                    || (podcastId && (!podcast || podcast.is_removed))
                    || comment.is_removed
                ) {
                    socket.emit('error', { message: 'Comment, article, podcast or user not found' });
                    socket.emit("like-comment-processing", false);
                    return;
                }

                if (user.isBlockUser || user.isBannedUser) {
                    socket.emit('error', { message: 'You are blocked or banned' });
                    return;
                }

                const hasLiked = comment.likedUsers.some(like => like._id.toString() === userId);

                if (hasLiked) {
                    // Unlike the comment
                    await Comment.findByIdAndUpdate(commentId, {
                        $pull: { likedUsers: userId }
                    });

                } else {
                    // Like the comment
                    await Comment.findByIdAndUpdate(commentId, {
                        $addToSet: { likedUsers: userId }
                    });


                    //  socket.emit('like-comment', { commentId, userId, articleId });
                }

                const populatedComment = await Comment.findById(commentId)
                    .populate('userId', 'user_handle Profile_image')
                    .populate('replies')
                    .exec();

                if (!hasLiked) {

                    if (articleId) {

                        sendCommentLikeNotification(
                            populatedComment.userId,
                            articleId,
                            null,
                            article.pb_recordId,
                            populatedComment._id,
                            `${user.user_handle} liked your comment`,
                            `${populatedComment.content}`
                        );

                        // Real-time notification to comment owner
                        if (populatedComment.userId && populatedComment.userId._id) {
                            io.to(`user:${populatedComment.userId._id}`).emit('notification', {
                                type: 'commentLike',
                                title: 'Comment Liked',
                                message: `${user.user_handle} liked your comment`,
                                articleId: articleId,
                                commentId: populatedComment._id
                            });
                        }
                    } else if (podcastId) {

                        sendCommentLikeNotification(
                            populatedComment.userId,
                            null,
                            podcastId,
                            null,
                            populatedComment._id,
                            `${user.user_handle} liked your comment`,
                            `${populatedComment.content}`
                        );

                        // Real-time notification to comment owner
                        if (populatedComment.userId && populatedComment.userId._id) {
                            io.to(`user:${populatedComment.userId._id}`).emit('notification', {
                                type: 'commentLike',
                                title: 'Comment Liked',
                                message: `${user.user_handle} liked your comment`,
                                podcastId: podcastId,
                                commentId: populatedComment._id
                            });
                        }
                    }

                }
                socket.emit("like-comment-processing", false);
                socket.emit('like-comment', populatedComment);

                // Broadcast to room (other users)
                const roomName = getRoomName(articleId, podcastId);
                broadcastToRoom(roomName, 'like-comment', populatedComment);
            } catch (err) {
                console.error('Error liking/unliking comment:', err);
                socket.emit("like-comment-processing", false);
                socket.emit('error', { message: 'Error processing like/unlike' });
            }
    });


    socket.on('fetch-comments', async (data) => {
            const { articleId, podcastId } = data;
            socket.emit("fetch-comment-processing", true);
            ///console.log("fetch comment called", articleId);

            if (!articleId && !podcastId) {
                socket.emit('error', { message: 'articleId or podcastId is required.' });
                socket.emit("fetch-comment-processing", false);
                return;
            }

            try {

                // Join the room for this article/podcast

                let article, podcast;

                if (articleId) {

                    article = await Article.findById(articleId);
                    if (!article || article.is_removed) {
                        socket.emit('error', { message: 'Article not found.' });
                        socket.emit("fetch-comment-processing", false);
                        return;
                    }
                }
                else if (podcastId) {
                    podcast = await Podcast.findById(podcastId);

                    if (!podcast || podcast.is_removed) {
                        socket.emit('error', { message: 'Podcast not found.' });
                        socket.emit("fetch-comment-processing", false);
                        return;
                    }
                }

                // Fetch all active comments related to the article
                let comments;
                if (articleId) {

                    comments = await Comment.find({ articleId: Number(articleId), status: 'Active', is_removed: false })
                        // .populate('userId', 'user_handle Profile_image')
                        .populate({
                            path: 'userId',
                            select: 'user_handle Profile_image',
                            match: {
                                isBlockUser: false,
                                isBannedUser: false
                            }
                        })
                        .populate('replies')
                        .sort({ createdAt: -1 })
                        .exec();
                }
                else if (podcastId) {

                    comments = await Comment.find({ podcastId: podcastId, status: 'Active', is_removed: false })
                        // .populate('userId', 'user_handle Profile_image')
                        .populate({
                            path: 'userId',
                            select: 'user_handle Profile_image',
                            match: {
                                isBlockUser: false,
                                isBannedUser: false
                            }
                        })
                        .populate('replies')
                        .sort({ createdAt: -1 })
                        .exec();
                }


                if (comments) {
                    comments = comments.filter(comment => comment.userId !== null);
                    socket.emit("fetch-comment-processing", false);
                    socket.emit('fetch-comments', {
                        articleId,
                        podcastId,
                        comments: comments
                    });
                }

            } catch (err) {
                console.error('Error fetching comments:', err);
                socket.emit("fetch-comment-processing", false);
                socket.emit('error', { message: 'Error fetching comments.' });
            }
    });

    // add-review-comment (only article specific)
    socket.on('add-review-comment', async (data) => {
            const { articleId, reviewer_id, feedback, isReview, isNote, requestId } = data;

            if (!reviewer_id || !feedback) {
                socket.emit('error', { error: 'Please fill all fields: reviewer_id, reviewContent' });
                return;
            }
            if (!articleId && !requestId) {
                socket.emit('error', { error: 'Please provide either article id or improvement request id' });
                return;
            }

            if (!isReview && !isNote) {
                // res.status(400).json({ message: 'Please select either isReview or isNote'});
                socket.emit('error', { error: 'Please select a category: Review or Note' });
                return;
            }

            try {


                if (articleId) {
                    const [article, reviewer] = await Promise.all([

                        Article.findById(articleId)
                            .select('authorId reviewer_id is_removed review_comments pb_recordId title')
                            .populate('authorId', 'email _id')
                            .exec(),
                        admin.findById(reviewer_id),
                    ]);

                    if (!article || !reviewer || article.is_removed) {
                        socket.emit('error', { message: 'Article or Moderator not found' });
                        return;
                    }

                    if (!article.authorId) {
                        socket.emit('error', { message: 'Article author is blocked or banned' });
                        return;
                    }

                    if (article.reviewer_id.toString() !== reviewer._id.toString()) {
                        socket.emit('error', { message: 'You are not authorized to access this article' });
                        return;
                    }

                    if (isReview) {
                        const comment = new Comment({
                            adminId: reviewer._id,
                            articleId: article._id,
                            // parentCommentId: parentCommentId || null,
                            content: feedback,
                            isReview: true,
                            isNote: false
                        });

                        await comment.save();
                        article.review_comments.push(comment._id);

                        article.status = statusEnum.statusEnum.AWAITING_USER;
                        article.lastUpdated = new Date();

                        await article.save();

                        const newRes = await Comment.findById(comment._id).populate([
                            {
                                path: "userId",
                                select: "user_handle Profile_image",
                                match: {
                                    isBlockUser: false,
                                    isBannedUser: false
                                }
                            },
                            {
                                path: "adminId",
                                select: "user_handle Profile_avtar"
                            }
                        ]);


                        socket.emit('new-feedback', newRes);
                        // userId, articleId, articleRecordId, title, message
                        articleReviewNotificationsToUser(article.authorId._id, article._id,
                            article.pb_recordId,
                            null,
                            "New feedback on your article: ",
                            article.title,
                        );
                        // send mail
                        sendArticleFeedbackEmail(article.authorId.email, feedback, article.title);

                    } else if (isNote) {

                        const comment = new Comment({
                            userId: article.authorId._id,
                            articleId: article._id,
                            parentCommentId: null,
                            content: feedback,
                            isNote: true,
                            isReview: false
                        });
                        await comment.save();

                        article.review_comments.push(comment._id);

                        await article.save();

                        //socket.emit('new-feedback', comment);


                        articleSubmitNotificationsToAdmin(
                            article.reviewer_id,
                            article._id,
                            article.pb_recordId,
                            null,
                            `New Additional Note from Author`,
                            `An author has added a new note to the article titled ${article.title}.`
                        );

                        const newRes = await Comment.findById(comment._id).populate([
                            {
                                path: "userId",
                                select: "user_handle Profile_image",
                                match: {
                                    isBlockUser: false,
                                    isBannedUser: false
                                }
                            },
                            {
                                path: "adminId",
                                select: "user_handle Profile_avtar"
                            }
                        ]);

                        socket.emit('new-feedback', newRes);
                    }
                } else if (requestId) {

                    const [editRequest, reviewer] = await Promise.all([

                        EditRequest.findById(requestId)
                            .populate('article')
                            .populate('user_id')
                            .exec(),
                        admin.findById(reviewer_id),
                    ]);

                    if (!editRequest || !reviewer) {
                        socket.emit('error', { message: 'Request or Moderator not found' });
                        return;
                    }

                    if (!editRequest.user_id || !editRequest.article) {
                        socket.emit('error', { message: 'Edit request user or article not found' });
                        return;
                    }

                    if (editRequest.reviewer_id.toString() !== reviewer._id.toString()) {
                        socket.emit('error', { message: 'You are not authorized to access this article' });
                        return;
                    }

                    if (isReview) {
                        const comment = new Comment({
                            adminId: reviewer._id,
                            articleId: editRequest.article._id,
                            parentCommentId: null,
                            content: feedback,
                            isReview: true,
                            isNote: false
                        });

                        await comment.save();
                        editRequest.editComments.push(comment._id);

                        editRequest.status = statusEnum.statusEnum.AWAITING_USER;
                        editRequest.last_updated = new Date();

                        await editRequest.save();

                        const newRes = await Comment.findById(comment._id).populate([
                            {
                                path: "userId",
                                select: "user_handle Profile_image",
                                match: {
                                    isBlockUser: false,
                                    isBannedUser: false
                                }
                            },
                            {
                                path: "adminId",
                                select: "user_handle Profile_avtar"
                            }
                        ]);


                        socket.emit('new-feedback', newRes);

                        // userId, articleId, articleRecordId, title, message
                        articleReviewNotificationsToUser(editRequest.user_id._id, editRequest.article._id,
                            editRequest.pb_recordId,
                            editRequest._id,
                            "New feedback on your improvement: ",
                            editRequest.title,
                        );

                        // send mail
                        sendArticleFeedbackEmail(editRequest.user_id.email, feedback, editRequest.article.title);

                    } else if (isNote) {

                        const comment = new Comment({
                            userId: editRequest.user_id._id,
                            articleId: editRequest.article._id,
                            parentCommentId: null,
                            content: feedback,
                            isNote: true,
                            isReview: false
                        });
                        await comment.save();

                        editRequest.editComments.push(comment._id);

                        await editRequest.save();


                        const newRes = await Comment.findById(comment._id).populate([
                            {
                                path: "userId",
                                select: "user_handle Profile_image",
                                match: {
                                    isBlockUser: false,
                                    isBannedUser: false
                                }
                            },
                            {
                                path: "adminId",
                                select: "user_handle Profile_avtar"
                            }
                        ]);


                        socket.emit('new-feedback', newRes);

                        articleSubmitNotificationsToAdmin(
                            editRequest.reviewer_id,
                            editRequest.article._id,
                            editRequest.pb_recordId,
                            editRequest._id,
                            `New Additional Note from Author`,
                            `An author has added a new note to the article titled ${editRequest.article.title}.`
                        );

                    }
                }

            } catch (err) {
                console.log(err);
                socket.emit('error', { message: err.message });
            }
    });
    // load-review-comments (only article specific)

    socket.on('load-review-comments',

        async (data) => {

            const { articleId, requestId } = data;

            if (!articleId && !requestId) {
                socket.emit('error', { message: "Either Article Id or improvement request id required" });
                return;
            }

            try {

                if (articleId) {
                    // const article = await Article.findById(Number(articleId))
                    //     .populate({
                    //         path: 'review_comments',
                    //         options: { sort: { createdAt: -1 } }
                    //     })
                    //     .exec();

                    const article = await Article.findById(Number(articleId))
                        .populate({
                            path: 'review_comments',
                            match: { is_removed: false },
                            options: { sort: { createdAt: -1 } },
                            populate: [
                                {
                                    path: 'userId',
                                    select: 'user_handle Profile_image',
                                    match: {
                                        isBlockUser: false,
                                        isBannedUser: false,
                                    },
                                },
                                {
                                    path: 'adminId',
                                    select: 'user_handle Profile_avtar',
                                },
                            ],
                        })
                        .exec();

                    if (article && article.review_comments && !article.is_removed) {

                        article.review_comments = article.review_comments.filter(comment => !comment.is_removed);
                        socket.emit('review-comments', article.review_comments);
                    }
                    else {
                        socket.emit('error', { message: "Article not found" });
                    }
                } else if (requestId) {

                    // const requests = await EditRequest.findById(requestId).populate({
                    //     path: 'editComments',
                    //     options: { sort: { createdAt: -1 } }
                    // }).exec();

                    const requests = await EditRequest.findById(requestId)
                        .populate({
                            path: 'editComments',
                            match: { is_removed: false },
                            options: { sort: { createdAt: -1 } },
                            populate: [
                                {
                                    path: 'userId',
                                    select: 'user_handle Profile_image',
                                    match: {
                                        isBlockUser: false,
                                        isBannedUser: false,
                                    },
                                },
                                {
                                    path: 'adminId',
                                    select: 'user_handle Profile_avtar',
                                },
                            ],
                        })
                        .exec();

                    if (requests && requests.editComments) {
                        requests.editComments = requests.editComments.filter(comment => !comment.is_removed);
                        socket.emit('review-comments', requests.editComments);
                    }
                    else {
                        socket.emit('error', { message: "Improvement request not found" });
                    }
                }

            } catch (err) {
                console.log(err);
                socket.emit('error', { message: err.message });
            }
        }

    );

    // User notification room - join when user connects
    socket.on('join-user-notifications', (data) => {
        const { userId } = data;
        if (userId) {
            const userRoom = `user:${userId}`;
            socket.join(userRoom);
            console.log(`Socket ${socket.id} joined notification room: ${userRoom}`);
            socket.emit('notification-room-joined', { room: userRoom, userId });
        }
    });

    // Manual join room listener (optional - for explicit room joining)
    socket.on('join-room', (data) => {
        const { articleId, podcastId } = data;
        const roomName = joinRoom(articleId, podcastId);
        if (roomName) {
            socket.emit('room-joined', { room: roomName });
        }
    });

    // Manual leave room listener
    socket.on('leave-room', (data) => {
        const { articleId, podcastId } = data;
        const roomName = getRoomName(articleId, podcastId);
        if (roomName) {
            socket.leave(roomName);
            console.log(`Socket ${socket.id} left room: ${roomName}`);
            socket.emit('room-left', { room: roomName });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        // Socket.IO automatically removes user from all rooms on disconnect
        // removeUser(socket.id);
    });

});

// Uncomment when v2 is going to live
// Error handling middleware
app.use(errorHandler);
module.exports = app;

