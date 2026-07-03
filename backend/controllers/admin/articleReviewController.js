const expressAsyncHandler = require('express-async-handler');
const Article = require('../../models/Articles');
const admin = require('../../models/admin/adminModel');
const User = require('../../models/UserModel');
const { articleReviewNotificationsToUser, articleSubmitNotificationsToAdmin, broadcastNewArticlePublished } = require('../notifications/notificationHelper');
const Comment = require('../../models/commentSchema');
const WriteAggregate = require("../../models/events/writeEventSchema");
const { sendArticleFeedbackEmail, sendArticlePublishedEmail, sendArticleDiscardEmail, sendMailArticleDiscardByAdmin, pickArticleMail } = require('../emailservice');
const cron = require('node-cron');
const statusEnum = require('../../utils/StatusEnum');
const { deleteFileFn } = require('../uploadController');
const AdminAggregate = require('../../models/events/adminContributionEvent');

const { deleteArticleRecordFromPocketbase } = require('../../utils/pocketbaseUtil');
// article review section

// getallDraftArticle
module.exports.getAllArticleForReview = expressAsyncHandler(
    async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const skip = (Number(page) - 1) * parseInt(limit);

            let articles = await Article.find({
                status: statusEnum.statusEnum.UNASSIGNED,
                is_removed: false
            })
                .populate('tags')
                .populate({
                    path: 'authorId',
                    select: 'user_name email',
                    match: {
                        isBlockUser: false,
                        isBannedUser: false
                    }
                })
                .skip(skip)
                .limit(Number(limit))
                .exec();

            articles = articles.filter(r => r.authorId !== null);
            if (Number(page) === 1) {
                const totalArticles = await Article.countDocuments({
                    status: statusEnum.statusEnum.UNASSIGNED,
                    is_removed: false
                });
                const totalPages = Math.ceil(totalArticles / Number(limit));
                res.status(200).json({ articles, totalPages });
                return;
            }
            res.status(200).json({ articles });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
)

module.exports.getAllInProgressArticles = expressAsyncHandler(
    async (req, res) => {
        const { reviewer_id } = req.params;

        const { page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * parseInt(limit);

        if (!reviewer_id) {
            return res.status(400).json({ message: 'Reviewer ID is required.' });
        }
        try {
            let articles = await Article.find({
                reviewer_id: reviewer_id,
                is_removed: false,
                status: {
                    $in: [statusEnum.statusEnum.IN_PROGRESS, statusEnum.statusEnum.AWAITING_USER, statusEnum.statusEnum.REVIEW_PENDING]
                }
            }).populate('tags')
                .populate({
                    path: 'authorId',
                    select: 'user_name email',
                    match: {
                        isBlockUser: false,
                        isBannedUser: false
                    }
                })
                .skip(skip)
                .limit(Number(limit))
                .exec();

            articles = articles.filter(r => r.authorId !== null);

            if (Number(page) === 1) {
                const totalArticles = await Article.countDocuments({
                    reviewer_id: reviewer_id,
                    is_removed: false,
                    status: {
                        $in: [statusEnum.statusEnum.IN_PROGRESS, statusEnum.statusEnum.AWAITING_USER, statusEnum.statusEnum.REVIEW_PENDING]
                    }
                });
                const totalPages = Math.ceil(totalArticles / Number(limit));
                res.status(200).json({ articles, totalPages });
                return;
            }
            res.status(200).json({ articles });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
)

module.exports.getAllReviewCompletedArticles = expressAsyncHandler(
    async (req, res) => {
        const { reviewer_id } = req.params;

        const { page = 1, limit = 10 } = req.query;
        const skip = (Number(page) - 1) * parseInt(limit);

        if (!reviewer_id) {
            return res.status(400).json({ message: 'Reviewer ID is required.' });
        }
        try {
            let articles = await Article.find({
                reviewer_id: reviewer_id,
                is_removed: false,
                status: {
                    $in: [statusEnum.statusEnum.PUBLISHED, statusEnum.statusEnum.DISCARDED]
                }
            })
                .populate('tags')
                .sort({ lastUpdated: -1 })
                .skip(skip)
                .limit(Number(limit))
                .exec();

            if (Number(page) === 1) {
                
                const totalArticles = await Article.countDocuments({
                    reviewer_id: reviewer_id,
                    is_removed: false,
                    status: {
                        $in: [statusEnum.statusEnum.PUBLISHED, statusEnum.statusEnum.DISCARDED]
                    }
                });
                const totalPages = Math.ceil(totalArticles / Number(limit));
                res.status(200).json({ articles, totalPages });
                return;
            }

            res.status(200).json({articles});
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
)
// assignModerator or startReview
module.exports.assignModerator = expressAsyncHandler(

    async (req, res) => {

        const { articleId, moderatorId } = req.body;

        if (!articleId || !moderatorId) {
            res.status(400).json({ message: 'Please provide articleId and moderatorId' });
            return;
        }

        try {

            const [article, moderator] = await Promise.all(
                [
                    Article.findById(Number(articleId)).populate({
                        path: 'authorId',
                        select: 'user_name email',
                        match: {
                            isBlockUser: false,
                            isBannedUser: false
                        }
                    }).exec(),
                    admin.findById(moderatorId),
                ]
            );

            if (!article || !moderator || article.is_removed) {
                res.status(404).json({ message: 'Article or Moderator not found' });
                return;
            }

            if (article.authorId === null) {
                res.status(400).json({ message: 'Article author either block or banned' });
                return;
            }

            if (article.status !== statusEnum.statusEnum.UNASSIGNED) {
                res.status(400).json({ message: 'Article is already assigned to a moderator' });
                return;
            }

            // Update article status and assign reviewer
            article.status = statusEnum.statusEnum.IN_PROGRESS;
            article.reviewer_id = moderator._id;
            article.assigned_at = new Date();
            article.lastUpdated = new Date();

            await article.save();

            pickArticleMail(article.authorId.email, article.title);

            articleReviewNotificationsToUser(article.authorId._id, article._id, article.pb_recordId, null,
                `Congrats!Your Article : ${article.title} is Under Review`,
                "Our team has started reviewing your article. Stay tuned!"
            );
           
            res.status(200).json({ message: "Article status updated" });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
)


// submitReview
module.exports.submitReview = expressAsyncHandler(

    async (req, res) => {
        const { articleId, reviewer_id, feedback } = req.body;

        if (!articleId || !reviewer_id || !feedback) {
            res.status(400).json({ message: 'Please fill all fields: articleId, reviewer_id, reviewContent' });
            return;
        }

        try {

            const [article, reviewer] = await Promise.all([

                Article.findById(Number(articleId))
                    .populate('authorId')
                    .exec(),
                admin.findById(reviewer_id),
            ]);

            if (!article || !reviewer || article.is_removed) {
                res.status(404).json({ message: 'Article or Moderator not found' });
                return;
            }

            if (article.reviewer_id.toString() !== reviewer._id.toString()) {
                res.status(403).json({ message: 'You are not authorized to access this article' });
            }


            const comment = new Comment({
                adminId: reviewer._id,
                articleId: article._id,
                parentCommentId: null,
                content: feedback,
                isReview: true
            });

            await comment.save();
            article.review_comments.push(comment._id);

            article.status = statusEnum.statusEnum.AWAITING_USER;
            article.lastUpdated = new Date();

            await article.save();

            articleReviewNotificationsToUser(article.authorId._id, article._id, article.pb_recordId, null,
                "New feedback received on your Article : ",
                feedback
            );

            // send mail
            sendArticleFeedbackEmail(article.authorId.email, feedback, article.title);

            res.status(200).json({ message: "Review submitted" });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
)

// submitSuggestedChanges
module.exports.submitSuggestedChanges = expressAsyncHandler(
    async (req, res) => {

        const { userId, articleId, content, title, description, tags, authorName, imageUtils } = req.body;

        if (!userId || !articleId || !content || !title || !imageUtils || !description || !tags || !authorName) {
            res.status(400).json({ message: "Missing required fields: userId, articleId, content, title, imageUtils, description,tags, authorName" });
            return;
        }

        try {

            const [article, user] = await Promise.all([
                Article.findById(Number(articleId)),
                User.findById(userId)
            ]
            );

            if (!article || !user || article.is_removed) {
                res.status(404).json({ message: "Article not found" });
                return;
            }

            if (user.isBlockUser || user.isBannedUser) {
                res.status(403).json({ message: "User is blocked or banned" });
                return;
            }

            //console.log("Author Id", article.authorId);
            //console.log("User Id", userId);

            /*
            if (article.authorId.toString() !== userId.toString()) {
                res.status(403).json({ message: "You are not the author of this article" });
                return;
            }
                */

            article.content = content;
            article.title = title;
            article.imageUtils = imageUtils;
            if (article.status !== statusEnum.statusEnum.UNASSIGNED) {
                article.status = statusEnum.statusEnum.REVIEW_PENDING;
            }
            article.lastUpdated = new Date();
            article.description = description;
            article.tags = tags;
            article.authorName = authorName;

            await article.save();


            // notify reviewer
            if (article.reviewer_id) {

                articleSubmitNotificationsToAdmin(
                    article.reviewer_id, article._id, article.pb_recordId, null,
                    `New changes from author on : ${article.title}`,
                    "Please review the changes made by the author."
                );

            }

            res.status(200).json({ message: "Article submitted" });

        } catch (err) {

            console.log(err);
            res.status(500).json({ message: err.message });
        }
    }
)

// publish article
module.exports.publishArticle = expressAsyncHandler(
    async (req, res) => {
        const { articleId, reviewer_id } = req.body;

        if (!articleId || !reviewer_id) {
            return res.status(400).json({ message: "Article ID and Reviewer ID are required" });
        }

        try {
            const [article, reviewer] = await Promise.all([
                Article.findById(Number(articleId))
                    .populate({
                        path: 'authorId',
                        select: 'user_name email',
                        match: {
                            isBlockUser: false,
                            isBannedUser: false
                        }
                    }).exec(),
                admin.findById(reviewer_id)
            ]);

            if (!article || !reviewer || article.is_removed) {
                return res.status(404).json({ message: "Article or Reviewer not found" });
            }

            if (article.authorId === null) {
                return res.status(404).json({ message: "Article author either block or banned" });
            }

            /*
            if (article.reviewer_id !== reviewer_id) {
                return res.status(403).json({ message: "Article is not assigned to this reviewer" });
            }
                */
            //const user = await User.findById(article.authorId);
            //if (!user) {
            // return res.status(404).json({ message: "Author not found" });
            //}

            article.status = statusEnum.statusEnum.PUBLISHED;
            article.publishedDate = new Date();
            article.lastUpdated = new Date();
            article.reviewer_id = reviewer_id;

            await article.save();
            // user.articles.push(article._id);

            await updateWriteEvents(article._id, article.authorId._id);
            // Update admin contribution for publish new article
            const aggregate = new AdminAggregate({
                userId: article.reviewer_id || reviewer_id,
                contributionType: 1,
            });

            await aggregate.save();
            
            const dynamicLink = `https://uhsocial.in/api/share/article?articleId=${article._id}&recordId=${article.pb_recordId}&authorId=${article.authorId._id}`;
             
            const blogLink = `https://uhsocial.in/api/share/blog/${article.pb_recordId}`;
            // send mail to user
            sendArticlePublishedEmail(article.authorId.email, blogLink, article.title);

            articleReviewNotificationsToUser(
                article.authorId._id,
                article._id,
                article.pb_recordId,
                null,
                `Congrats! Your Article : ${article.title} is Live now!`,
                "Keep contributing! We encourage you to keep sharing valuable content with us."
            );
            // send notification
            broadcastNewArticlePublished(article._id);

            res.status(200).json({ message: "Article Published" });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }
)

// Future scope: User can reach out to super admin if they think article is wrongly discarded, then super admin can review the article and can publish if found it relevant.

module.exports.discardChanges = expressAsyncHandler(
    async (req, res) => {

        const { articleId, discardReason } = req.body;

        if (!articleId || !discardReason) {
            return res.status(400).json({ message: "Invalid request, please provide discard reason and article id" });
        }

        try {

            const article = await Article.findById(Number(articleId));

            if (!article || article.is_removed) {
                return res.status(404).json({ message: "Article not found" });
            }

            const user = await User.findById(article.authorId);

            article.reviewer_id = req.userId;
            article.assigned_at = null;
            article.status = statusEnum.statusEnum.DISCARDED;
            article.lastUpdated = new Date();

            // delete record from pb
            await deleteArticleRecordFromPocketbase(article.pb_recordId);

            for (const url of article.imageUtils) {
                // delete image from aws
                const parts = url.split('/api/getFile/');
                if (parts.length >= 2) {
                    await deleteFileFn(parts[1]);
                }
            }

            await article.save();
            if (user) {

                sendMailArticleDiscardByAdmin(user.email, article.title, discardReason);
            }

            return res.status(200).json({ message: "Article Discarded" });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }
)

module.exports.unassignModerator = expressAsyncHandler(

    async (req, res) => {
        const { articleId } = req.body;

        if (!articleId) {
            return res.status(400).json({ message: "Article id required" });
        }

        try {

            const article = await Article.findById(Number(articleId));

            if (!article || article.is_removed) {
                return res.status(404).json({ message: "Article not found" });
            }
            if (article.status === statusEnum.statusEnum.PUBLISHED) {
                return res.status(403).json({ message: "Article already published" });
            }


            article.reviewer_id = null;
            article.assigned_at = null;
            article.status = statusEnum.statusEnum.UNASSIGNED;
            article.lastUpdated = new Date();

            await article.save();

            await articleReviewNotificationsToUser(
                article.authorId, article._id, article.pb_recordId, null,
                article.title, "Your article has been unassigned from moderation."
            );

            res.status(200).json({ message: "Article unassigned" });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
)
// Update Write Event Tasks (Once article published)

async function updateWriteEvents(articleId, userId) {

    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));

    try {

        // Check for existing event entry
        const writeEvent = await WriteAggregate.findOne({ userId: userId, date: today });

        if (!writeEvent) {
            // New Write Event Entry
            const newWriteEvent = new WriteAggregate({ userId: userId, date: today });
            newWriteEvent.dailyWrites = 1;
            newWriteEvent.monthlyWrites = 1;
            newWriteEvent.yearlyWrites = 1;

            await newWriteEvent.save();
        } else {

            writeEvent.dailyWrites += 1;
            writeEvent.monthlyWrites += 1;
            writeEvent.yearlyWrites += 1;

            await writeEvent.save();
        }
    } catch (err) {
        console.log('Article Write Event Update Error', err);
    }
}
// cron job for article crounassigned
async function unassignArticle() {

    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const articles = await Article.find({
            status: {
                $in: [statusEnum.statusEnum.IN_PROGRESS]
            },
            lastUpdated: {
                $lte: thirtyDaysAgo
            },
            is_removed: false,
        });

        articles.forEach(async (article) => {

            article.reviewer_id = null;
            article.assigned_at = null;
            article.status = statusEnum.statusEnum.UNASSIGNED;
            article.lastUpdated = new Date();

            await article.save();

            await articleReviewNotificationsToUser(
                article.authorId, article._id, article.pb_recordId, null,
                article.title, "Your article has been unassigned from moderation."
            );


        });

    } catch (err) {

        console.error(err);

    }
}

// discarded article will not be clickable

async function discardArticle() {

    try {
        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

        const articles = await Article.find({
            status: {
                $in: [statusEnum.statusEnum.UNASSIGNED, statusEnum.statusEnum.REVIEW_PENDING]
            },
            lastUpdated: {

                $lte: sixtyDaysAgo

            },
            is_removed: false,
        }).populate('authorId').exec();

        articles.forEach(async (article) => {

            article.reviewer_id = null;
            article.assigned_at = null;
            article.status = statusEnum.statusEnum.DISCARDED;

            await deleteArticleRecordFromPocketbase(article.pb_recordId);
            for (const url of article.imageUtils) {
                // delete image from aws
                const parts = url.split('/api/getFile/');
                if (parts.length >= 2) {
                    await deleteFileFn(parts[1]);
                }
            }
            await article.save();

            if (article.authorId?.email && article.title) {

                await articleReviewNotificationsToUser(
                    article.authorId._id, article._id, article.pb_recordId, null,
                    "Article discarded",
                    "Your article with title " + article.title + " has been discarded by system"
                );

                sendArticleDiscardEmail(article.authorId.email, article.status, article.title, "");
            }


        });
    } catch (err) {
        console.error(err);
    }
}



cron.schedule('0 0 * * *', async () => {


    await unassignArticle();
});

cron.schedule('0 0 * * *', async () => {


    await discardArticle();
});



