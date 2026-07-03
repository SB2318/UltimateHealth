const express = require("express");
const router = express.Router();
const {
    addLanguage,
    getLanguages,
    getLanguageById,
    updateLanguage,
    deleteLanguage
} = require("../controllers/languageController");

/**
 * @swagger
 * /language:
 *   post:
 *     tags:
 *       - Language
 *     summary: Add new language
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *                 example: English
 *               code:
 *                 type: string
 *                 example: en-IN
 *     responses:
 *       201:
 *         description: Language created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 *       400:
 *         description: Name or code missing
 *       500:
 *         description: Server error
 */
router.post("/", addLanguage);

/**
 * @swagger
 * /language:
 *   get:
 *     tags:
 *       - Language
 *     summary: Get all languages
 *     responses:
 *       200:
 *         description: List of languages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Language'
 *       500:
 *         description: Server error
 */
router.get("/", getLanguages);

/**
 * @swagger
 * /language/{id}:
 *   get:
 *     tags:
 *       - Language
 *     summary: Get language by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65d8c8a1e6b8c2d4f1a2b3c4
 *     responses:
 *       200:
 *         description: Language fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 *       404:
 *         description: Language not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getLanguageById);

/**
 * @swagger
 * /language/{id}:
 *   put:
 *     tags:
 *       - Language
 *     summary: Update language
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65d8c8a1e6b8c2d4f1a2b3c4
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Bengali
 *               code:
 *                 type: string
 *                 example: bn-IN
 *     responses:
 *       200:
 *         description: Language updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Language'
 *       404:
 *         description: Language not found
 *       500:
 *         description: Server error
 */
router.put("/:id", updateLanguage);

/**
 * @swagger
 * /language/{id}:
 *   delete:
 *     tags:
 *       - Language
 *     summary: Delete language
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65d8c8a1e6b8c2d4f1a2b3c4
 *     responses:
 *       200:
 *         description: Language deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Language deleted successfully
 *       404:
 *         description: Language not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", deleteLanguage);

module.exports = router;