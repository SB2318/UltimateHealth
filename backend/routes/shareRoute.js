const express = require("express");
const router = express.Router();
const { shareArticle, sharePodcast, generateBlogPage } = require("../controllers/shareController");

/**
 * @swagger
 * /share/article:
 *   get:
 *     summary: Generate share preview page for an article
 *     tags: [Share]
 *     parameters:
 *       - in: query
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the article
 *       - in: query
 *         name: authorId
 *         schema:
 *           type: string
 *       - in: query
 *         name: recordId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: HTML preview page generated
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       400:
 *         description: Missing required parameters
 *       404:
 *         description: Article not found
 */

router.get("/share/article", shareArticle);

/**
 * @swagger
 * /share/podcast:
 *   get:
 *     summary: Generate share preview page for a podcast
 *     tags: [Share]
 *     parameters:
 *       - in: query
 *         name: trackId
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the podcast
 *       - in: query
 *         name: audioUrl
 *         schema:
 *           type: string
 *         description: URL of the podcast audio file
 *     responses:
 *       200:
 *         description: HTML preview page generated
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *       400:
 *         description: Missing required parameters
 *       404:
 *         description: Podcast not found
 */
router.get("/share/podcast", sharePodcast);
router.get("/share/blog/:slug", generateBlogPage);

module.exports = router;