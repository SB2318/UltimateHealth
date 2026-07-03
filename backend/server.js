/***
 * 
 *  Deprecated File : 
 * 
 *   15.12.2024
 */

const express = require('express');
const http = require('http');
const compression = require('compression');
const cors = require('cors');
const cookieParser = require('cookie-parser');
//const socketIo = require('socket.io');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const db = require("./config/database");
const userRoutes = require("./routes/usersRoutes");
const specializationRoutes = require("./routes/SpecializationsRoutes");
const articleRoutes = require("./routes/articleRoutes");
const analyticsRoute = require('./routes/analyticsRoute');
const uploadRoute = require('./routes/uploadRoute');
require('./controllers/commentController');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

//////////////////////////////////////////
const Article = require('./models/Articles');
const User = require('./models/UserModel');
const Comment = require('./models/commentSchema');
const expressAsyncHandler = require('express-async-handler');

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);

// Database connection
db.dbConnect(); // Make sure your database connection works properly

// Use middlewares
app.use(cookieParser()); // Parse cookies
app.use(compression()); // Compress response bodies
app.use(express.json()); // Parse incoming JSON requests

// Enable CORS (with appropriate configuration)
app.use(cors({
    origin: '*', // Allow all origins (be careful with this in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Define routes
app.use("/api", userRoutes);
app.use("/api", specializationRoutes);
app.use("/api", articleRoutes);
app.use("/api", uploadRoute);
app.use("/api/analytics", analyticsRoute);

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test route (can be removed later)
app.get("/hello", (req, res) => {
    console.log("Hello World");
    res.send('Hello World');
});


// Initialize Socket.io

const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
});
//const io = socketIo(server, );

// Handle socket events for comments
//handleSocketEvents(io);

io.on('connection', (socket) => {

    console.log('a user connected');

    socket.on('connect', () => {
        console.log('Connected to server');
        socket.emit("connect", "Some thing to show");
    });

    socket.on('add-comment', expressAsyncHandler(
        async (data) => {

            console.log('Add Event called');
            const { userId, articleId, content, parentCommentId } = data;

            if (!userId || !articleId || !content || content.trim() === '') {
                socket.emit('error', 'Missing required fields');
                return;
            }

            try {

                const [user, article] = await Promise.all([
                    User.findById(userId),
                    Article.findById(Number(articleId))
                ]);

                if (!user || !article || article.is_removed) {
                    socket.emit('error', 'User or article not found');
                    return;
                }

                if (user.isBlockUser || user.isBannedUser) {
                    socket.emit('error', { message: 'User is blocked or banned' });
                    return;
                }

                const newComment = new Comment({
                    userId,
                    articleId,
                    parentCommentId: parentCommentId || null,
                    content
                });

                await newComment.save();

                // Now emit event

                if (parentCommentId) {
                    const parentComment = await Comment.findById(parentCommentId);

                    if (!parentComment) {
                        socket.emit('error', { message: 'Parent comment not found' });
                        return;
                    }
                    parentComment.replies.push(newComment._id);
                    await parentComment.save();


                    io.emit('update-parent-comment', {
                        parentCommentId: parentComment._id,
                        parentComment
                    });

                    io.emit('new-reply', {
                        parentCommentId: parentCommentId,
                        reply: newComment,
                        articleId: articleId
                    });

                } else {
                    io.emit('new-comment', {
                        comment: newComment,
                        articleId
                    });
                }

            } catch (err) {

                console.error('Error adding comment:', err);
                socket.emit('error', { message: 'Error adding comment' });
            }
        }
    ))

    socket.on('edit-comment', expressAsyncHandler(
        async (data) => {

            const { commentId, content, articleId } = data;

            if (!commentId || !content || !articleId || content.trim() === '') {
                socket.emit('error', { message: 'Invalid request: Comment ID and non-empty content are required.' });
                return;
            }

            try {
                const [comment, user, article] = await Promise.all([
                    Comment.findById(commentId),
                    User.findById(data.userId),
                    Article.findById(articleId)
                ]);

                if (!comment || !user || !article || article.is_removed) {
                    socket.emit('error', { message: 'Comment or user or article not found' });
                    return;
                }
                if (user.isBlockUser || user.isBannedUser) {
                    socket.emit('error', { message: 'You are blocked or banned' });
                    return;
                }

                if (comment.userId.toString() !== user._id.toString()) {
                    socket.emit('error', { message: 'You are not authorized to edit this comment' });
                    return;
                }

                comment.content = content;
                comment.updatedAt = new Date();
                comment.isEdited = true;
                await comment.save();

                io.emit('edit-comment', comment); // Broadcast the edited comment
            } catch (err) {
                console.error("Error editing comment:", err);
                socket.emit('error', { message: 'Error editing comment' });
            }

        }
    ));

    socket.on('delete-comment', expressAsyncHandler(
        async (data) => {
            const { commentId, articleId } = data;

            if (!commentId || !articleId) {
                socket.emit('error', { message: 'Invalid request: Comment ID and article ID are required.' });
                return;
            }

            try {
                const [comment, user] = await Promise.all([
                    Comment.findById(commentId),
                    User.findById(data.userId)
                ]);

                if (!comment || !user) {
                    socket.emit('error', { message: 'Comment or user not found' });
                    return;
                }

                // Check if the user is authorized to delete the comment
                if (comment.userId.toString() !== data.userId) {
                    socket.emit('error', { message: 'You are not authorized to delete this comment' });
                    return;
                }

                if (user.isBlockUser || user.isBannedUser) {
                    socket.emit('error', { message: 'You are blocked or banned' });
                    return;
                }

                comment.status = 'Deleted';
                comment.updatedAt = new Date();
                await comment.save();

                // If it's a reply, update the parent comment
                if (comment.parentCommentId) {
                    const parentComment = await Comment.findById(comment.parentCommentId);
                    if (parentComment) {
                        parentComment.replies = parentComment.replies.filter(replyId => replyId.toString() !== commentId);
                        await parentComment.save();

                        io.emit('update-parent-comment', {
                            parentCommentId: comment.parentCommentId,
                            parentComment
                        });
                    }
                }

                io.emit('delete-comment', { commentId, articleId });
            } catch (err) {
                console.error('Error deleting comment:', err);
                socket.emit('error', { message: 'Error deleting comment' });
            }
        }
    ));

    socket.on('like-comment', expressAsyncHandler(
        async (data) => {
            const { commentId, articleId, userId } = data;

            if (!commentId || !articleId || !userId) {
                socket.emit('error', { message: "Invalid request: Comment ID, Article ID, and User ID are required." });
                return;
            }

            try {
                const [comment, user] = await Promise.all([
                    Comment.findById(commentId).populate('likedUsers'),
                    User.findById(userId)
                ]);

                if (!comment || !user) {
                    socket.emit('error', { message: 'Comment or user not found' });
                    return;
                }
                if (user.isBlockUser || user.isBannedUser) {
                    socket.emit('error', { message: 'User is blocked or banned' });
                    return;
                }

                const hasLiked = comment.likedUsers.some(like => like._id.toString() === userId);

                if (hasLiked) {
                    // Unlike the comment
                    await Comment.findByIdAndUpdate(commentId, {
                        $pull: { likedUsers: userId }
                    });

                    io.emit('unlike-comment', { commentId, userId, articleId });
                } else {
                    // Like the comment
                    await Comment.findByIdAndUpdate(commentId, {
                        $addToSet: { likedUsers: userId }
                    });

                    io.emit('like-comment', { commentId, userId, articleId });
                }
            } catch (err) {
                console.error('Error liking/unliking comment:', err);
                socket.emit('error', { message: 'Error processing like/unlike' });
            }
        }
    ));


    socket.on('fetch-comments', expressAsyncHandler(
        async (data) => {
            const { articleId } = data;

            console.log("fetch comment called");

            if (!articleId) {
                socket.emit('error', { message: 'Article ID is required.' });
                return;
            }

            try {
                const article = await Article.findById(articleId);
                if (!article || article.is_removed) {
                    socket.emit('error', { message: 'Article not found.' });
                    return;
                }

                // Fetch all active comments related to the article
                const comments = await Comment.find({ articleId: articleId, status: 'Active' })
                    .populate('userId', 'user_handle Profile_image') // Populate user details
                    .populate('replies') // Populate replies for each comment
                    .sort({ createdAt: -1 }); // Sort by most recent first

                // Emit the comments and replies to the client
                socket.emit('comments-loaded', {
                    articleId,
                    comments: comments
                });

            } catch (err) {
                console.error('Error fetching comments:', err);
                socket.emit('error', { message: 'Error fetching comments.' });
            }
        }
    ));

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

});

// Start server
server.listen(PORT, () => {
   // console.log(`Server is running on port ${PORT}`);
    console.log(`Docs: http://localhost:${PORT}/docs`);
});

// Export the app for testing or other purposes
module.exports = app;
