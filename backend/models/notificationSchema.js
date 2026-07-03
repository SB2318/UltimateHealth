const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        default: null,
    },
    articleId: {
        type: Number,
        ref: 'Article',
        default: null
    },
    revisonId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"EditRequest",
        default: null,
    },
    podcastId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Podcast',
        default: null
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        default: null
    },

    articleRecordId: {
        type: String,
        default: null
    },

    type: {
        type: String,
        required: true,
        enum: [
            'articleReview',
            'podcastReview',
            'podcastCommentMention',
            'articleCommentMention',
            'articleRepost',
            'userFollow',
            'commentLike',
            'comment',
            'article',
            'podcast',
            'editRequest',
            'articleLike',
            'podcastLike',
            'articleImprovement',
            'articleComment',
            'podcastComment',
            'editRequestComment',
            'articleCommentLike',
            'podcastCommentLike',
            'articleRevisionReview',
            'articleSubmitToAdmin',
            'revisionSubmitToAdmin'
        ]
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

    read: {
        type: Boolean,
        default: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
