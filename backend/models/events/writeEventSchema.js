const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const writeAggregateSchema = new Schema({
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
    dailyWrites: {
        type: Number,
        default: 0,
    },
    monthlyWrites: {
        type: Number,
        default: 0,
    },
    yearlyWrites: {
        type: Number,
        default: 0,
    },
});

writeAggregateSchema.index({ userId: 1, date: 1 });

const WriteAggregate = mongoose.model('WriteAggregate', writeAggregateSchema);
module.exports =  WriteAggregate;
