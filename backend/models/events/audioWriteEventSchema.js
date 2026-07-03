const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audioWriteAggregateSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    monthlyUploads: {
        type: Number,
        default: 0,
    },
    yearlyUploads: {
        type: Number,
        default: 0,
    },
});

audioWriteAggregateSchema.index({ userId: 1, date: 1 });

const AudioWriteAggregate = mongoose.model('AudioWAggregate', audioWriteAggregateSchema);
module.exports =  AudioWriteAggregate;