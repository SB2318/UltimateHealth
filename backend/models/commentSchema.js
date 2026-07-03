const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({

    id: {
        type: Schema.Types.ObjectId,
        auto: true,
        unique: true
    },
    articleId: {
        type: Number,
        //required: true,
        ref: 'Article',
        default: null,
    },
    podcastId:{
        type: Schema.Types.ObjectId,
        ref: 'Podcast',
        default: null
    },
    userId: {
        type: Schema.Types.ObjectId,
        //required: true,
        ref: 'User',
        default: null
    },
    adminId: {
        type: Schema.Types.ObjectId,
        ref: "admin",
        default: null
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

    parentCommentId: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: null,
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        default: []
    }],

    likedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User
        default: []
    }],
    status: {
        type: String,
        enum: ['Active', 'Deleted'],
        default: 'Active',
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    isReview: {
        type: Boolean,
        default: false
    },
    isNote: {
        type: Boolean,
        default: false
    },
    is_removed: {
        type: Boolean,
        default: false
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

