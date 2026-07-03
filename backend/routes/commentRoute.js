// routes/review.routes.js

const express = require("express");
const router = express.Router();
const { loadReviewComments } = require("../controllers/commentController");

/**
 * @swagger
 * /api/review/load:
 *   get:
 *     summary: Load review comments for articles or improvement requests
 *     description: >
 *       This API handles user-admin interaction during article submission and revision.
 *     tags:
 *       - Review & Discussions
 *     parameters:
 *       - in: query
 *         name: articleId
 *         required: false
 *         schema:
 *           type: integer
 *       - in: query
 *         name: requestId
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Loaded comments successfully
 *       400:
 *         description: Missing or invalid request
 *       500:
 *         description: Server error
 */
router.get("/load", loadReviewComments);

module.exports = router;
