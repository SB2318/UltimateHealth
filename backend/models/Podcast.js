const ArticleTag = require('../models/ArticleModel');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const podcastSchema = new Schema({

    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    article_id: {
        type: Number,
        ref: 'Article',
        default: null
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    audio_url: {
        type: String,
        required: true
    },

    cover_image:{
        type:String,
        required:true,
    },
    duration: {
        type: Number,
        required: true
    },

    tags: {
        type: [Schema.Types.ObjectId], // Reference to ArticleTag
        ref: 'ArticleTag',
        default: []
    },
    likedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User
        default: []
    }],
    savedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User
        default: []
    }],
    viewUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    discardReason: {
        type: String,
        default: "Discarded by system"
    },
    is_removed: {
        type: Boolean,
        default: false
    },

    mentionedUsers: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    reportId: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "ReportAction"
    },

    status: {
        type: String,
        enum: ['in-progress', 'review-pending', 'published', 'discarded'],
        default: 'review-pending'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    admin_id:{
        type: Schema.Types.ObjectId,
        ref: 'admin',
        default: null
    }

})

const Podcast = mongoose.model('Podcast', podcastSchema);

module.exports = Podcast;
