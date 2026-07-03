const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audioLikeAggregateSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, // author of the audio
        required: true,
        ref: 'User',
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    dailyLikes: {
        type: Number,
        default: 0,
    },
    monthlyLikes: {
        type: Number,
        default: 0,
    },
    yearlyLikes: {
        type: Number,
        default: 0,
    },
});

audioLikeAggregateSchema.index({ userId: 1, date: 1 });

const AudioLikeAggregate = mongoose.model('AudioLikeAggregate', audioLikeAggregateSchema);
module.exports =  AudioLikeAggregate;