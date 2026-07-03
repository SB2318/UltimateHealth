const mongoose = require('mongoose');
const { Schema } = mongoose;

const playListSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    podcasts: [{
        type: Schema.Types.ObjectId,
        ref: 'Podcast',
        default: []
    }],
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: Date.now
    }
});

const PlayList = mongoose.model('PlayList', playListSchema);

module.exports = PlayList;