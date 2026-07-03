const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const reportActionEnum ={
  PENDING : 'Pending',
  RESOLVED : 'Resolve',
  DISMISSED : 'Dismiss',
  WARN_CONVICT : 'Warn Convict',
  REMOVE_CONTENT : 'Remove Content',
  EDIT_CONTENT : 'Request to Edit Content',
  RESTORE_CONTENT : 'Restore the remove content (only applicable if content was removed)',
  BLOCK_CONVICT : 'Block User',
  BAN_CONVICT : 'Ban User',
  ESCALATED : 'Escalate the Report',
  INVESTIGATION : 'Investigation Start',
  IGNORE : 'Ignore Report',
  CONVICT_REQUEST_TO_RESTORE_CONTENT : 'CONVICT_REQUEST_TO_RESTORE_CONTENT',
  CONVICT_REQUEST_DISAPPROVED : 'CONVICT_REQUEST_DISAPPROVED',
};

const reportActionSchema = new Schema({

    admin_id:{
        type: Schema.Types.ObjectId,
        ref: 'admin', 
        default: null
    },
    action_taken:{
        type: String,
        required: true,
        enum: reportActionEnum,
        default: reportActionEnum.PENDING
    },

    articleId:{
        type: Number,
        //required: true,
        ref:'Article',
        default: null
    },
    podcastId:{
        type: Schema.Types.ObjectId,
       // required: true,
        ref:'Podcast',
        default: null,
    },
    commentId:{
       type: Schema.Types.ObjectId,
       default: null,
       ref:'Comment'
    },
    reportedBy:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    convictId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    reasonId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Reason'
    },
    last_action_date:{
      type: Date,
      default: Date.now
    },
    created_at:{
        type: Date,
        default: Date.now
    },
    convict_statement:{
        type: String,
        default: null,
    }
   
});

const ReportAction = mongoose.model('ReportAction', reportActionSchema);

module.exports = {ReportAction, reportActionEnum};