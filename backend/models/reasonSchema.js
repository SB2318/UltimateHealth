const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reasonSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
        unique:true,
    },
    reason: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['Active','Archive'],
        default: 'Active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    },

})

const Reason = mongoose.model('Reason', reasonSchema);
module.exports = Reason;