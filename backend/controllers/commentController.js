const expressAsyncHandler = require('express-async-handler');
const EditRequest = require('../models/admin/articleEditRequestModel');
const Article = require('../models/Articles');

module.exports.loadReviewComments = expressAsyncHandler(async (req, res) => {
    const { articleId, requestId } = req.query;

    if (!articleId && !requestId) {
        return res.status(400).json({
            message: "Either Article Id or improvement request id is required"
        });
    }

    try {
        // ------------------------ ARTICLE COMMENTS ------------------------
        if (articleId) {
            const article = await Article.findById(Number(articleId))
                .populate({
                    path: "review_comments",
                    options: { sort: { createdAt: -1 } },
                    populate: [
                        {
                            path: "userId",
                            select: "user_handle Profile_image",
                            match: {
                                isBlockUser: false,
                                isBannedUser: false
                            }
                        },
                        {
                            path: "adminId",
                            select: "user_handle Profile_avtar"
                        }
                    ]
                });

            if (!article || article.is_removed) {
                return res.status(400).json({ message: "Article not found" });
            }

            const filtered = (article.review_comments || []).filter(
                c => !c.is_removed
            );

            return res.status(200).json(filtered);
        }

        // ------------------- IMPROVEMENT REQUEST COMMENTS -------------------
        if (requestId) {
            const request = await EditRequest.findById(requestId)
                .populate({
                    path: "editComments",
                    options: { sort: { createdAt: -1 } },
                    populate: [
                        {
                            path: "userId",
                            select: "user_handle Profile_image",
                            match: {
                                isBlockUser: false,
                                isBannedUser: false
                            }
                        },
                        {
                            path: "adminId",
                            select: "user_handle Profile_avtar"
                        }
                    ]
                });

            if (!request) {
                return res.status(400).json({ message: "Improvement request not found" });
            }

            const filtered = (request.editComments || []).filter(
                c => !c.is_removed
            );

            return res.status(200).json(filtered);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
