const { now } = require('moment/moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const readAggregateSchema = new Schema({
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
    dailyReads: {
        type: Number,
        default: 0,
    },
    monthlyReads: {
        type: Number,
        default: 0,
    },
    yearlyReads: {
        type: Number,
        default: 0,
    },
});
// each user activity now track as events. based on there events we prepare analytics.

readAggregateSchema.index({ userId: 1, date: 1 });

const ReadAggregate = mongoose.model('ReadAggregate', readAggregateSchema);
module.exports =  ReadAggregate;
