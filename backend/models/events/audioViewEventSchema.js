const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audioViewAggregateSchema = new Schema({
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
    dailyViews: {
        type: Number,
        default: 0,
    },
    monthlyViews: {
        type: Number,
        default: 0,
    },
    yearlyViews: {
        type: Number,
        default: 0,
    },
});

audioViewAggregateSchema.index({ userId: 1, date: 1 });

const AudioViewAggregate = mongoose.model('AudioViewAggregate', audioViewAggregateSchema);
module.exports =  AudioViewAggregate;