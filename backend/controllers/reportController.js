
require('dotenv').config();
const expressAsyncHandler = require("express-async-handler");
const { ReportAction, reportActionEnum } = require("../models/admin/reportActionSchema");
const Reason = require("../models/reasonSchema");
const Article = require('../models/Articles');
const Podcast = require('../models/Podcast');
const User = require("../models/UserModel");
const Comment = require('../models/commentSchema');
const Admin = require('../models/admin/adminModel');
const AdminAggregate = require('../models/events/adminContributionEvent');
const reportService = require('../services/db/reportService');
const cron = require('node-cron');



// Add Reason
module.exports.addReason = expressAsyncHandler(

  async (req, res) => {
    const { reason } = req.body;

    if (!reason) {
      return res.status(400).json({ message: "Please add a reason." });
    }

    try {
      //await Reason.create({ reason }); SQL dilemma
      const newReason = new Reason({ reason });
      await newReason.save();
      res.status(201).json({ message: "Reason added successfully." });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to add reason, Internal server error" });
    }
  }
)
// Update Reason
module.exports.updateReason = expressAsyncHandler(
  async (req, res) => {

    const { id, reason } = req.body;

    if (!id || !reason) {
      return res.status(400).json({ message: "Please add a id and reason." });
    }

    try {
      const reasonDb = await Reason.findById(id);
      if (!reasonDb) {
        return res.status(404).json({ message: "Reason not found." });
      }
      reasonDb.reason = reason;
      await reasonDb.save();
      res.status(200).json({ message: "Reason updated successfully." });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to update reason, Internal server error" });
    }
  }
)
// Delete Reason
module.exports.deleteReason = expressAsyncHandler(
  async (req, res) => {

    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "id not found" });
    }

    try {

      const reason = await Reason.findById(id);
      if (!reason) {
        return res.status(404).json({ message: "Reason not found." });
      }

      const existingReport = await ReportAction.findOne({ reasonId: reason._id });

      if (existingReport) {
        return res.status(400).json({ message: "Reason is associated with a report, cannot delete" });
      }

      await Reason.findByIdAndDelete(reason._id);

      res.status(200).json({ message: "Reason deleted successfully.", data: reason });
    }
    catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to delete reason, Internal server error" });
    }
  }
)
// Get all Reasons
module.exports.getAllReasons = expressAsyncHandler(

  async (req, res) => {

    try {
      const reasons = await Reason.find({ status: 'Active' }).sort({ createdAt: -1 });
      res.status(200).json(reasons);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
)
// Submit Report
module.exports.submitReport = expressAsyncHandler(
  async (req, res) => {

    const { podcastId, articleId, commentId, reportedBy, reasonId, authorId } = req.body;

    if (!reportedBy || !reasonId || !authorId) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    if (!articleId && !commentId && !podcastId) {
      return res.status(400).json({ message: "Please provide either articleId, podcastId or commentId." });
    }

    try {

      let article, podcast;

      if (articleId) {
        article = await Article.findById(articleId);
      }

      if (podcastId) {
        podcast = await Podcast.findById(podcastId);
      }

      const [user, reason, author] = await Promise.all(
        [
          User.findById(reportedBy),
          Reason.findById(reasonId),
          User.findById(authorId)
        ]
      );

      let comment;
      if (commentId) {
        comment = await Comment.findById(commentId);

        if (!comment || !comment.is_removed) {
          return res.status(404).json({ message: "Comment not found." });
        }
      }

      if (!author || author.isBannedUser || author.isBlockUser) {
        return res.status(404).json({ message: "Author of the content not found." });
      }
      if (articleId && (!article || article.is_removed)) {
        return res.status(404).json({ message: "Article not found." });
      }

      if (podcastId && (!podcast || podcast.is_removed)) {
        return res.status(404).json({ message: "Podcast not found." });
      }

      if (!user || user.isBannedUser || user.isBlockUser) {
        return res.status(404).json({ message: "User not found." });
      }
      if (!reason) {
        return res.status(404).json({ message: "Please select a valid reason" });
      }


      let reportType = comment ? 'comment' : 'content';
      let details;

      if (comment) {
        details = {
          commentId: comment._id,
          comment: comment.content,
          content: comment.content,
        }

      } else if (article) {
        details = {
          articleId: article._id,
          title: article.title,
          content: article.title,
        }
      } else {
        details = {
          podcastId: podcast._id,
          title: podcast.title,
          content: podcast.audio_url,
        }
      }

      const report = new ReportAction({
        articleId: articleId,
        podcastId: podcastId,
        commentId: commentId,
        reportedBy: reportedBy,
        reasonId: reasonId,
        convictId: authorId
      });
      author.activeReportCount += 1;
      report.last_action_date = new Date();
      await author.save();
      await report.save();

      // send mail to user
      await sendInitialReportMailtoVictim(user.email);

      // send mail to censurable
      if (details) {
        await sendInitialReportMailtoConvict(author.email, details, reportType);

        if (author.activeReportCount >= 3 && !author.isBlockUser) {
          author.isBlockUser = true;
          author.blockedAt = new Date();
          await sendBlockConvictMail(author.email, details, reportType, "3 active reports have been filed against your account.")
        }
      }

      res.status(201).json({ message: "Report submitted successfully" });

    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
)


/** To get all avilable reports */
module.exports.getAllPendingReports = expressAsyncHandler(
  async (req, res) => {

    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * parseInt(limit);

    try {

      const pendingReports = await ReportAction.find(
        {
          action_taken: reportActionEnum.PENDING,
          admin_id: null
        })
        .populate({
          path: 'reportedBy',
          select: 'user_name',
        })
        .populate({
          path: 'convictId',
          select: 'user_name',
        })
        .populate({
          path: 'reasonId',
          select: 'reason',
        }).
        populate({
          path: "articleId",
          select: "title status pb_recordId authorId"
        }).
        populate({
          path: "podcastId",
          select: "title status user_id"
        }).
        populate({
          path: "commentId",
          select: "content"
        })
        .skip(skip)
        .limit(Number(limit))
        .lean()
        .exec();

      if (Number(page) === 1) {
        const totalReports = await ReportAction.countDocuments({
          action_taken: reportActionEnum.PENDING,
          admin_id: null
        });
        const totalPages = Math.ceil(totalReports / Number(limit));
        return res.status(200).json({ pendingReports, totalPages });
      }

      return res.status(200).json({ pendingReports });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching pending reports' });
    }
  }
)

/** To get rest of reports */
module.exports.getAllReportsForModerator = expressAsyncHandler(
  async (req, res) => {

    const { isCompleted, page = 1, limit = 10 } = req.query;
    try {
      const skip = (Number(page) - 1) * parseInt(limit);

      if (isCompleted) {

        const q = {
          admin_id: req.userId,
          action_taken: {
            $in: [
              reportActionEnum.RESOLVED,
              reportActionEnum.DISMISSED,
              reportActionEnum.IGNORE,
              reportActionEnum.WARN_CONVICT,
              reportActionEnum.REMOVE_CONTENT,
              reportActionEnum.BLOCK_CONVICT
            ]
          }
        };
        const reports = await ReportAction.find(q)
          .populate({
            path: 'reportedBy',
            select: 'user_name',
          })
          .populate({
            path: 'convictId',
            select: 'user_name',
          })
          .populate({
            path: 'reasonId',
            select: 'reason',
          }).
          populate({
            path: "articleId",
            select: "title status pb_recordId authorId"
          }).
          populate({
            path: "podcastId",
            select: "title status user_id"
          }).
          populate({
            path: "commentId",
            select: "content"
          })
          .skip(skip)
          .limit(Number(limit))
          .lean()
          .exec();

        if (Number(page) === 1) {
          const totalReports = await ReportAction.countDocuments(q);
          const totalPages = Math.ceil(totalReports / Number(limit));
          return res.status(200).json({ reports, totalPages });
        }

        return res.status(200).json({ reports });

      }
      else {
        const q = {
          admin_id: req.userId,
          action_taken: {
            $nin: [
              reportActionEnum.RESOLVED,
              reportActionEnum.DISMISSED,
              reportActionEnum.IGNORE,
              reportActionEnum.WARN_CONVICT,
              reportActionEnum.REMOVE_CONTENT,
              reportActionEnum.BLOCK_CONVICT
            ]
          }
        };
        const reports = await ReportAction.find(q)
          .populate({
            path: 'reportedBy',
            select: 'user_name',
          })
          .populate({
            path: 'convictId',
            select: 'user_name',
          })
          .populate({
            path: 'reasonId',
            select: 'reason',
          })
          .populate({
            path: "articleId",
            select: "title status pb_recordId authorId"
          })
          .populate({
            path: "podcastId",
            select: "title status user_id"
          }).
          populate({
            path: "commentId",
            select: "content"
          })
          .skip(skip)
          .limit(Number(limit))
          .lean()
          .exec();

        if (Number(page) === 1) {
          const totalReports = await ReportAction.countDocuments(q);
          const totalPages = Math.ceil(totalReports / Number(limit));
          return res.status(200).json({ reports, totalPages });
        }

        return res.status(200).json({ reports });
      }

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching pending reports' });
    }
  }
)

/** To get single report details */
module.exports.getReportDetails = expressAsyncHandler(
  async (req, res) => {

    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: 'Report id is required' });
    }

    try {
      // view article or comment
      const report = await ReportAction.findById(id)
        .populate({
          path: 'reportedBy',
          select: 'user_name',
        })
        .populate({
          path: 'convictId',
          select: 'user_name',
        })
        .populate({
          path: 'reasonId',
          select: 'reason',
        }).
        populate({
          path: "articleId",
          select: "title status pb_recordId authorId"
        }).
        populate({
          path: "podcastId",
          select: "title status user_id"
        }).
        populate({
          path: "commentId",
          select: "content"
        })
        .lean()
        .exec();

      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }

      return res.status(200).json(report);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching report details' });
    }
  }
)

/** Pick report or assign moderator */
module.exports.adminAction = expressAsyncHandler(
  async (req, res) => {
    const { reportId } = req.body;

    if (!reportId) {
      return res.status(400).json({ message: 'Report id is required' });
    }

    try {
      await reportService.adminAction(reportId, req.userId);
      return res.status(200).json({ message: 'Report picked successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message || 'Error picking report' });
    }
  }
)

/** Take action */
module.exports.adminTakeAction = expressAsyncHandler(
  async (req, res) => {
    const { reportId, action, admin_id, dismissReason } = req.body;

    if (!reportId || !action || !admin_id) {
      return res.status(400).json({ message: 'Missing required field: Report id, action and admin id' });
    }

    try {
      await reportService.adminTakeAction({ reportId, action, adminId: admin_id, dismissReason });
      return res.status(200).json({ message: "Action performed" });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message || 'Error taking action on report' });
    }
  }
)

/** Submit request to restore content */
module.exports.convictRequestToRestoreContent = expressAsyncHandler(
  async (req, res) => {
    const { convict_id, convict_statement, report_id } = req.body;

    if (!convict_id || !convict_statement || !report_id) {
      return res.status(400).json({ message: "Convict id, convict statement and report id are required" });
    }

    try {


      const convict = await User.findOne({ _id: convict_id });
      const report = await ReportAction.findOne({ _id: report_id });

      if (!convict || !report) {
        return res.status(400).json({ message: "Convict or report not found" });
      }

      if (report.convictId !== convict.id) {
        return res.status(400).json({ message: "Convict does not match report" });
      }
      if (report.commentId) {
        return res.status(400).json({ message: "Comment is already resolved" });
      }

      const article = await Article.findOne({ _id: report.articleId });
      if (!article) {
        return res.status(400).json({ message: "Article not found" });
      }
      report.action_taken = reportActionEnum.CONVICT_REQUEST_TO_RESTORE_CONTENT;
      report.convict_statement = convict_statement;
      report.last_action_date = new Date();
      await report.save();

      // Send email to user to inform them of the request to restore content
      await sendRestoreRequestReceivedMail(convict.email, article.title);

      return res.status(200).json({ message: "Request sent" });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error convicting user' });
    }

  }
)

/** GET ALL REPORTS AGAINST CONVICT */
module.exports.getAllReportsAgainstConvict = expressAsyncHandler(
  async (req, res) => {

    try {

      const reports = await ReportAction.find({
        convictId: req.userId, status: {
          $in: [reportActionEnum.RESOLVED,
          reportActionEnum.DISMISSED,
          reportActionEnum.IGNORE,
          reportActionEnum.WARN_CONVICT,
          reportActionEnum.REMOVE_CONTENT,
          reportActionEnum.BLOCK_CONVICT]
        }
      }).populate({
        path: 'reasonId',
        select: 'reason',
      }).
        populate({
          path: "articleId",
          select: "title status pb_recordId authorId"
        }).
        populate({
          path: "podcastId",
          select: "title status user_id"
        }).
        populate({
          path: "commentId",
          select: "content"
        }).
        lean();

      return res.status(200).json(reports);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error fetching reports' });
    }
  }

)

async function unBlockUser() {

  try {

    const users =
      await User.find({
        isBlockUser: true,
        blockedAt: {
          $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago in milliseconds
          $lte: new Date() // Current date
        }
      });

    for (const user of users) {

      if (user) {
        user.isBlockUser = false;
        user.blockedAt = null;
        await sendUnblockUserMail(user.email, user.user_name);
      }
    }

  } catch (err) {
    console.error(err);

  }
}

cron.schedule('0 0 * * *', async () => {

  console.log('running cron job discard article...');
  await unBlockUser();
});

