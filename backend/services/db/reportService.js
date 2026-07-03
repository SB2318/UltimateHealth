const { ReportAction, reportActionEnum } = require("../../models/admin/reportActionSchema");
const User = require("../../models/UserModel");
const Article = require("../../models/Articles");
const Podcast = require("../../models/Podcast");
const Comment = require("../../models/commentSchema");
const Admin = require("../../models/admin/adminModel");
const AdminAggregate = require("../../models/events/adminContributionEvent");
const emailService = require("../../controllers/emailservice");

/**
 * Picks a report for investigation by a moderator.
 * @param {string} reportId 
 * @param {string} adminId 
 */
const adminAction = async (reportId, adminId) => {
    const report = await ReportAction.findById(reportId).populate({
        path: 'reportedBy',
        select: 'user_name email',
    }).populate({
        path: 'reasonId',
        select: 'reason',
    }).exec();

    if (!report) throw new Error('Report not found');

    report.admin_id = adminId;
    report.action_taken = reportActionEnum.INVESTIGATION;
    report.last_action_date = new Date();

    await report.save();

    /** Send Mail to user */
    emailService.sendReportUndertakenEmail(report.reportedBy.email, report._id);
    return report;
};

/**
 * Performs an administrative action on a report.
 * @param {Object} params
 * @param {string} params.reportId
 * @param {string} params.action
 * @param {string} params.adminId
 * @param {string} params.dismissReason
 */
const adminTakeAction = async ({ reportId, action, adminId, dismissReason }) => {
    const [report, admin] = await Promise.all([
        ReportAction.findById(reportId).populate('reasonId articleId podcastId commentId').exec(),
        Admin.findById(adminId)
    ]);

    if (!report || !admin) throw new Error('Report or moderator not found');

    // Check if already resolved
    const finalStatuses = [
        reportActionEnum.RESOLVED, reportActionEnum.DISMISSED, reportActionEnum.IGNORE,
        reportActionEnum.WARN_CONVICT, reportActionEnum.REMOVE_CONTENT, reportActionEnum.BLOCK_CONVICT
    ];
    if (finalStatuses.includes(report.action_taken)) {
        throw new Error(`This report (Issue No. ${report.id}) has already been resolved with status: ${report.action_taken}.`);
    }

    const [convict, victim] = await Promise.all([
        User.findById(report.convictId),
        User.findById(report.reportedBy)
    ]);

    if (!convict || !victim) throw new Error('Convict or victim not found');

    // Handle blocked/banned state
    if (convict.isBlockUser || victim.isBlockUser || convict.isBannedUser || victim.isBannedUser) {
        report.action_taken = reportActionEnum.IGNORE;
        report.last_action_date = new Date();
        await report.save();
        throw new Error('Convict or victim is blocked or banned');
    }

    const details = {
        podcastId: report.podcastId ? report.podcastId._id : null,
        articleId: report.articleId ? report.articleId._id : null,
        content: report.commentId ? report.commentId.content : report.articleId ? report.articleId.title : report.podcastId ? report.podcastId.title : null,
        commentId: report.commentId ? report.commentId._id : null,
    };
    const reportType = report.commentId ? 'comment' : 'content';

    switch (action.toString()) {
        case reportActionEnum.RESOLVED:
            report.action_taken = reportActionEnum.RESOLVED;
            convict.activeReportCount = Math.max(0, convict.activeReportCount - 1);
            await emailService.sendResolvedMailToConvict(convict.email, details, reportType);
            await emailService.sendResolvedMailToVictim(victim.email, details, reportType, action);
            break;

        case reportActionEnum.DISMISSED:
            if (!dismissReason) throw new Error('Dismiss reason is required');
            report.action_taken = reportActionEnum.DISMISSED;
            convict.activeReportCount = Math.max(0, convict.activeReportCount - 1);
            victim.reportFeatureMisuse += 1;
            if (victim.reportFeatureMisuse >= 3) {
                victim.isBlockUser = true;
                victim.blockedAt = new Date();
            }
            await emailService.sendWarningMailToVictimOnReportDismissOrIgnore(victim.email, details, reportType, dismissReason, Math.max(victim.reportFeatureMisuse - 1, 0));
            await emailService.sendDismissedOrIgnoreMailToConvict(convict.email, details, reportType);
            break;

        case reportActionEnum.IGNORE:
            report.action_taken = reportActionEnum.IGNORE;
            convict.activeReportCount = Math.max(0, convict.activeReportCount - 1);
            break;

        case reportActionEnum.WARN_CONVICT:
            report.action_taken = reportActionEnum.WARN_CONVICT;
            convict.activeReportCount = Math.max(0, convict.activeReportCount - 1);
            convict.strikeCount += 1;
            if (convict.strikeCount >= 3) convict.isBannedUser = true;
            await removeContent(report);
            await emailService.sendWarningMailToConvict(convict.email, details, reportType, report.reasonId.reason, Math.max(0, convict.strikeCount));
            await emailService.sendResolvedMailToVictim(victim.email, details, reportType, action);
            break;

        case reportActionEnum.REMOVE_CONTENT:
            report.action_taken = reportActionEnum.REMOVE_CONTENT;
            convict.activeReportCount = Math.max(0, convict.activeReportCount - 1);
            await removeContent(report);
            await emailService.sendRemoveContentMailToConvict(convict.email, details, reportType, report.reasonId.reason);
            await emailService.sendResolvedMailToVictim(victim.email, details, reportType, action);
            break;

        case reportActionEnum.BLOCK_CONVICT:
            report.action_taken = reportActionEnum.BLOCK_CONVICT;
            convict.activeReportCount = Math.max(0, convict.activeReportCount - 1); // Fixed from + 1 in original code
            convict.isBlockUser = true;
            convict.blockedAt = new Date();
            await emailService.sendBlockConvictMail(convict.email, details, reportType, report.reasonId.reason);
            await emailService.sendResolvedMailToVictim(victim.email, details, reportType, action);
            break;

        case reportActionEnum.BAN_CONVICT:
            report.action_taken = reportActionEnum.BAN_CONVICT;
            convict.activeReportCount = Math.max(0, convict.activeReportCount - 1);
            convict.isBannedUser = true;
            await emailService.sendBannedUserMail(convict.email, details, reportType, report.reasonId.reason);
            await emailService.sendResolvedMailToVictim(victim.email, details, reportType, action);
            break;

        case reportActionEnum.RESTORE_CONTENT:
            report.action_taken = reportActionEnum.RESTORE_CONTENT;
            await restoreContent(report);
            await emailService.sendRestoreContentMailToUser(convict.email, report.articleId?.title || report.podcastId?.title);
            break;

        case reportActionEnum.CONVICT_REQUEST_DISAPPROVED:
            await emailService.sendRestoreRequestDisapprovedMail(convict.email, report.articleId?.title || report.podcastId?.title);
            break;

        default:
            throw new Error('Invalid action');
    }

    report.last_action_date = new Date();
    await Promise.all([report.save(), convict.save(), victim.save()]);

    // Record contribution
    if (action !== reportActionEnum.IGNORE) {
        await new AdminAggregate({ userId: adminId, contributionType: 3 }).save();
    }

    // Auto unblock if count drops
    if (convict.activeReportCount < 3 && convict.isBlockUser && action !== reportActionEnum.BLOCK_CONVICT) {
        convict.isBlockUser = false;
        convict.blockedAt = null;
        await convict.save();
        await emailService.sendUnblockUserMail(convict.email, convict.user_name);
    }

    return report;
};

const removeContent = async (report) => {
    if (report.commentId) {
        await Comment.findByIdAndUpdate(report.commentId._id, { is_removed: true });
    } else if (report.articleId) {
        await Article.findByIdAndUpdate(report.articleId._id, { is_removed: true, reportId: report._id });
    } else if (report.podcastId) {
        await Podcast.findByIdAndUpdate(report.podcastId._id, { is_removed: true, reportId: report._id });
    }
};

const restoreContent = async (report) => {
    if (report.articleId) {
        await Article.findByIdAndUpdate(report.articleId._id, { is_removed: false, reportId: null });
    } else if (report.podcastId) {
        await Podcast.findByIdAndUpdate(report.podcastId._id, { is_removed: false, reportId: null });
    }
};

module.exports = {
    adminAction,
    adminTakeAction
};
