// Report Event Contribution
// Existing Article edit request contribution
// Report User Contribution


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// All contribution will collect monthly and yearly basis
const adminAggregateSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'admin',
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
   
    contributionType:{
        type: Number, 
        required: true //  1 -> Article Publish Event Contribution, 2 -> Existing Article Edit Request Contribution, 3 -> Report User Contribution, 4 -> Podcast Contribution
    },

    day:{
        type: String,
        required: true,
        default: ()=> new Date().toISOString().slice(0, 10) // YYYY-MM-DD
    },

    month:{
        type: String,
        required: true, 
        default: ()=> {
            const d = new Date();
            return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2, '0')}`;
        }
    }
   
});

adminAggregateSchema.index({ userId: 1, date: 1 });

const AdminAggregate = mongoose.model('AdminAggregate', adminAggregateSchema);
module.exports =  AdminAggregate;
