const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authenticateToken = require('../middleware/authentcatetoken');
const adminAuthenticateToken = require('../middleware/adminAuthenticateToken');

/**** For Article Tags */
/**
 * @openapi
 * /articles/tags:
 *   post:
 *     summary: Create a new tag (genre/category) for health-related issues
 *     description: >
 *       This endpoint allows an admin to create a new tag (genre or category) 
 *       for various health-related issues. Tags help categorize articles based on specific topics or areas.
 *       Only admin or moderator can add , update or delete a tag. 
 *     tags:
 *       - Tags
 *     security:
 *       - bearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the new tag (e.g., "Cardiology", "Mental Health", etc.)
 *                 example: "Mental Health"
 *     responses:
 *       '201':
 *         description: Successfully created a new tag
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ArticleTag'
 *       '400':
 *         description: Invalid request, missing required fields or incorrect data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tag name is required"
 *       '401':
 *         description: Unauthorized - User must be authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.post('/articles/tags',adminAuthenticateToken, articleController.addNewTag);

/**
 * @openapi
 * /articles/tags:
 *   get:
 *     summary: Retrieve all tags for health-related issues
 *     description: >
 *       This endpoint retrieves a list of all tags (categories/genres) used for categorizing health-related articles or content.
 *       The tags are sorted by ID in descending order.
 *     tags:
 *       - Tags
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved all tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/ArticleTag'
 *       '401':
 *         description: Unauthorized - User must be authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get('/articles/tags', articleController.getAllTags); // auth removed for guest profile, purpose: user can see available categories in unauthenticated state
/**
 * @openapi
 * /articles/tags/{id}:
 *   put:
 *     summary: Update a specific tag by its ID
 *     description: >
 *       This endpoint allows an admin to update an existing tag by its unique ID.
 *       The request must include the new name for the tag.
 *     tags:
 *       - Tags
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the tag to be updated.
 *         schema:
 *           type: integer
 *           example: 101
 *     security:
 *       - bearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name for the tag.
 *                 example: "Neurology"
 *     responses:
 *       '200':
 *         description: Successfully updated the tag
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/ArticleTag'
 *       '400':
 *         description: Bad request due to invalid data or parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request data"
 *       '404':
 *         description: Tag not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Tag not found"
 *       '401':
 *         description: Unauthorized - User must be authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.put('/articles/tags/:id', adminAuthenticateToken, articleController.updateTagById);


/**
 * @openapi
 * /articles/tags/{id}:
 *   delete:
 *     summary: Delete an article tag by ID
 *     description: >
 *       This endpoint allows an admin  to delete an article tag by its unique ID. 
 *       The tag can only be deleted if it is not used in any article that is not marked as `DISCARDED`.
 *     tags:
 *       - Tags
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique ID of the tag to be deleted.
 *         schema:
 *           type: integer
 *           example: 101
 *     security:
 *       - bearerAuth: []  
 *     responses:
 *       '200':
 *         description: Successfully deleted the tag
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tag deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Unique identifier for the deleted tag
 *                       example: 101
 *                     name:
 *                       type: string
 *                       description: The name of the deleted tag
 *                       example: "Neurology"
 *       '400':
 *         description: The tag is in use in an article and cannot be deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tag is used in an article"
 *       '404':
 *         description: Tag not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tag not found"
 *       '401':
 *         description: Unauthorized - User must be authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.delete('/articles/tags/:id', adminAuthenticateToken, articleController.deleteArticleTagByIds);



/**** For Article *****/

/**
 * @openapi
 * /articles:
 *   post:
 *     summary: Create a new article
 *     description: >
 *       This endpoint allows an authenticated user to create a new article post. The article will initially be in the `UNASSIGNED` state, awaiting review. If the article remains in an `UNASSIGNED` state for more than 30 days.
 *       it will be automatically discarded by the system, and user will be notified by mail. 
 *       The user submitting the article must be an active and non-blocked contributor.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - title
 *               - authorName
 *               - description
 *               - content
 *               - tags
 *               - imageUtils
 *               - pb_recordId
 *               - allow_podcast
 *               - language
 *             properties:
 *               authorId:
 *                 type: string
 *                 description: The unique ID of the author submitting the article.
 *               title:
 *                 type: string
 *                 description: The title of the article.
 *               authorName:
 *                 type: string
 *                 description: The name of the article's author.
 *               description:
 *                 type: string
 *                 description: A brief description of the article's content.
 *               content:
 *                 type: string
 *                 description: The main content of the article (HTML file url,after uploading it to pocketbase).
 *               tags:
 *                 type: array
 *                 items:
 *                   type: object
 *                   $ref: '#/components/schemas/ArticleTag'
 *                 description: A list of tags for the article (e.g., topics, categories).
 *               language:
 *                 type: string
 *                 description: The language of the article. (e.g., "en-IN" for English, "hi-IN" for Hindi, "ta-IN" for tamil, "bn-IN" for bengali etc.)
 *               isTranslation:
 *                 type: boolean
 *                 description: Whether this article is a translated version of another article.
 *               sourceArticleId:
 *                 type: integer
 *                 description: The source article ID when creating a translation.
 *               sourceArticleRecordId:
 *                 type: string
 *                 description: The Pocketbase record ID of the source article when creating a translation.
 *               sourceLanguage:
 *                 type: string
 *                 description: The source article language when creating a translation.
 *               translationOf:
 *                 type: integer
 *                 description: Alias for sourceArticleId when creating a translation.
 *               imageUtils:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Metadata related to images used in the article.
 *               pb_recordId:
 *                 type: string
 *                 description: The Pocketbase record ID associated with the article.
 *               allow_podcast:
 *                 type: boolean
 *                 description: Whether the article allows a podcast version.
 *     responses:
 *       '201':
 *         description: Article successfully created and under review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article under review"
 *                 newArticle:
 *                   type: object
 *                   $ref: '#/components/schemas/Article'
 *       '400':
 *         description: Missing required fields or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please fill in all fields: authorId, title, authorName, description, content, tags, imageUtils, pb_recordId, allow_podcast"
 *       '401':
 *         description: Unauthorized - User must be authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       '403':
 *         description: User is blocked or banned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User is blocked or banned."
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating article"
 */
router.post('/articles',authenticateToken, articleController.createArticle); 

/**
 * @openapi
 * /articles:
 *   get:
 *     summary: Get all published articles
 *     description: >
 *       This endpoint allows users to fetch all articles that are published (`PUBLISHED` status) and not removed (`is_removed: false`). The articles are paginated by `page` and `limit` parameters. 
 *       The articles will include information about their associated tags, mentioned users, liked users, and the author, excluding blocked or banned users.
 *       The results are sorted by `lastUpdated` in descending order.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve (default is 1).
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 50
 *         description: The number of articles to retrieve per page (default is 50).
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     $ref: '#/components/schemas/Article'
 *       '400':
 *         description: Invalid request or missing parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request or parameters"
 *       '401':
 *         description: Unauthorized - User must be authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error fetching articles"
 */

router.get('/articles', articleController.getAllArticles); // auth removed for guest profile, purpose: user can view articles in unauthenticated state

/**
 * @openapi
 * /articles/{id}/translations:
 *   get:
 *     summary: Get published translations for an article
 *     description: >
 *       Returns published translated article records linked to the source article.
 *       Each translation is a separate article with its own content, metadata, and review lifecycle.
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The source article ID.
 *       - in: query
 *         name: language
 *         required: false
 *         schema:
 *           type: string
 *         description: Optional target language filter, such as "hi-IN".
 *     responses:
 *       '200':
 *         description: Successfully retrieved article translations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 translations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     $ref: '#/components/schemas/Article'
 *       '404':
 *         description: Source article not found or removed
 *       '500':
 *         description: Internal server error
 */
router.get('/articles/:id/translations', articleController.getArticleTranslations);

/**
 * @openapi
 * /articles/{id}:
 *   get:
 *     summary: Get an article by its ID
 *     description: >
 *       This endpoint allows users to fetch an article by its unique ID. It includes associated information such as tags, liked users, contributors, and the author's followers.
 *       The data is filtered to exclude blocked or banned users.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the article.
 *     responses:
 *       '200':
 *         description: Successfully retrieved the article
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 article:
 *                   type: object
 *                   $ref: '#/components/schemas/Article'
 * 
 *       '404':
 *         description: Article not found or removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article not found"
 * 
 *       '401':
 *         description: Unauthorized - User must be authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 * 
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error fetching article"
 */

router.get('/articles/:id', articleController.getArticleById); // auth removed for guest profile, purpose: user can view article in unauthenticated state

/**
 * @deprecated
 */
router.put('/articles/:id',authenticateToken, articleController.updateArticle);

/**
 * @deprecated
 */
router.delete('/articles/:id',authenticateToken, articleController.deleteArticle);


/**
 * @openapi
 * /articles/saveArticle:
 *   post:
 *     summary: Save or unsave a published article
 *     description: >
 *       This endpoint allows an authenticated user to save or unsave a published article. If the article is already saved, it will be unsaved, and vice versa.
 *       The user must be authenticated and the article must be published. A user can save or unsave an article by providing its ID.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - article_id
 *             properties:
 *               article_id:
 *                 type: string
 *                 description: The unique ID of the article to be saved or unsaved.
 *                 example: "12345"
 *     responses:
 *       '200':
 *         description: Article successfully saved or unsaved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article saved successfully"  # or "Article unsaved"
 *       '400':
 *         description: Invalid input or article not published
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User ID and Article ID are required"  # or "Article is not published"
 *       '401':
 *         description: Unauthorized - User must be authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       '403':
 *         description: User is banned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User is banned"
 *       '404':
 *         description: User or article not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User or article not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error saving article"
 */

router.post('/articles/saveArticle', authenticateToken, articleController.saveArticle); 

/**
 * @openapi
 * /articles/likeArticle:
 *   post:
 *     summary: Like or unlike a published article
 *     description: >
 *       This endpoint allows an authenticated user to like or unlike a published article.  
 *       If the article is already liked by the user, the like will be removed.  
 *       Only active users can perform this action on published articles.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - article_id
 *             properties:
 *               article_id:
 *                 type: string
 *                 example: "12345"
 *     responses:
 *       '200':
 *         description: Article liked or unliked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Article liked successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     article:
 *                       type: object
 *                     likeStatus:
 *                       type: boolean
 *                       example: true
 *       '400':
 *         description: Missing article ID or article is not published
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Article is not published
 *       '401':
 *         description: Unauthorized - JWT missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       '403':
 *         description: User is blocked or banned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User is blocked or banned
 *       '404':
 *         description: Article or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User or Article not found
 *       '500':
 *         description: Server error during like/unlike operation
 */

router.post('/articles/likeArticle', authenticateToken, articleController.likeArticle ); 

/**
 * @openapi
 * /articles/updateViewCount:
 *   post:
 *     summary: Update view count for a published article
 *     description: >
 *       This endpoint allows an authenticated user to increase the view count of a **published** article.  
 *       A user can only contribute **once** to the view count of a specific article.  
 *       The article must be in a `PUBLISHED` state, and the user must not be blocked or banned.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []  # JWT Bearer token required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - article_id
 *             properties:
 *               article_id:
 *                 type: string
 *                 description: The ID of the article to update the view count for.
 *                 example: "64f1b90e1a543a001fcd4567"
 *     responses:
 *       '200':
 *         description: View count updated or article already viewed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Article view count updated
 *                 article:
 *                   type: object
 *                   $ref: '#/components/schemas/Article'
 *                   description: The article object with updated view count
 *       '400':
 *         description: Article is not published
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Article is not published
 *       '401':
 *         description: Unauthorized - JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       '403':
 *         description: Forbidden - User is blocked or banned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User is blocked or banned
 *       '404':
 *         description: Article or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User or Article not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error updating view
 */
router.post('/articles/updateViewCount', authenticateToken, articleController.updateViewCount );


/**
 * @openapi
 * /article/readEvent:
 *   post:
 *     summary: Record a read event for an article
 *     description: >
 *       This endpoint allows the frontend to update a user's read activity for an article.  
 *       It is **conditionally called** by the client when it determines that the user has **read enough of the article**.  
 *       
 *       It aggregates read counts by **day, month, and year** per user.  
 *       If the user has not logged a read today, a new record will be created. Otherwise, it updates the existing one.
 *       
 *       Requires a valid JWT token.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []  # Bearer authentication (JWT token)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - article_id
 *             properties:
 *               article_id:
 *                 type: string
 *                 description: The ID of the article that was read.
 *                 example: "64f1b90e1a543a001fcd4567"
 *     responses:
 *       '201':
 *         description: Read event recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Read Event Saved
 *                 event:
 *                   type: object
 *                   description: The read aggregate record for the user
 *                   $ref: '#/components/schemas/ReadAggregate'
 *       '400':
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Article ID is required
 *       '401':
 *         description: Unauthorized - JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       '500':
 *         description: Server error while saving read event
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.post('/article/readEvent', authenticateToken, articleController.updateReadEvents);

/**
 * @deprecated
 */
router.get('/article/read-status', authenticateToken, articleController.getReadDataForGraphs);

/**
 * @deprecated
 */
router.get('/article/write-status', authenticateToken, articleController.getWriteDataForGraphs );

/**
 * @openapi
 * /article/repost:
 *   post:
 *     summary: Repost a published article
 *     description: |
 *       Allows an authenticated user to repost a published article.
 *       If already reposted, the article is moved to the top of the user's repost list.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - articleId
 *             properties:
 *               articleId:
 *                 type: integer
 *                 example: 123
 *     responses:
 *       200:
 *         description: Article reposted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Article reposted successfully
 *       400:
 *         description: Bad request - missing or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Article ID is required.
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden - user is blocked or banned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: You are blocked or banned.
 *       404:
 *         description: Not found - article or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Article or user not found.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/article/repost', authenticateToken, articleController.repostArticle);

/**
 * @openapi
 * /article/improvements:
 *   get:
 *     summary: Get all improvements (edit requests) for the authenticated user
 *     description: |
 *       Returns a paginated list of improvements (edit requests) for the logged-in user, filtered by status.
 *       - `status=1`: Published
 *       - `status=2`: In Progress / Review Pending / Awaiting User / Unassigned
 *       - `status=3`: Discarded
 *       If `visit=1` and `page=1`, it also returns counts for each status.
 *     tags:
 *       - ArticlesEditRequest
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *           default: 1
 *           enum: [1, 2, 3]
 *         description: Status filter (1 = Published, 2 = In Progress, 3 = Discarded)
 *       - in: query
 *         name: visit
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Include status counters (only on page 1)
 *     responses:
 *       200:
 *         description: List of improvements
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Edit request object with populated article and tags
 *                     $ref: '#/components/schemas/EditRequest'
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 publishedCount:
 *                   type: integer
 *                   example: 20
 *                 progressCount:
 *                   type: integer
 *                   example: 10
 *                 discardCount:
 *                   type: integer
 *                   example: 5
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       400:
 *         description: Missing user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User ID is required.
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.get('/article/improvements', authenticateToken, articleController.getAllImprovementsForUser);

/**
 * @openapi
 * /user-articles:
 *   get:
 *     summary: Get all articles for the authenticated user
 *     description: |
 *       Returns a paginated list of articles created by the logged-in user.
 *       The articles can be filtered by status:
 *         - `status=1`: Published
 *         - `status=2`: In Progress / Review Pending / Awaiting User / Unassigned
 *         - `status=3`: Discarded
 *       If `visit=1` and `page=1`, it also returns total counts for each status.
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of articles per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *           default: 1
 *           enum: [1, 2, 3]
 *         description: |
 *           Article status filter:
 *             - 1 = Published
 *             - 2 = In Progress / Awaiting User / Review Pending / Unassigned
 *             - 3 = Discarded
 *       - in: query
 *         name: visit
 *         schema:
 *           type: integer
 *           default: 1
 *         description: If set to 1 and page is 1, returns total status counts
 *     responses:
 *       200:
 *         description: List of articles with optional status counts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Article object with populated tags, mentionedUsers, and likedUsers
 *                     $ref: '#/components/schemas/Article'
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 publishedCount:
 *                   type: integer
 *                   example: 10
 *                 progressCount:
 *                   type: integer
 *                   example: 5
 *                 discardCount:
 *                   type: integer
 *                   example: 2
 *       401:
 *         description: Unauthorized - JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error fetching articles
 *                 details:
 *                   type: string
 *                   example: Unexpected database error
 */

router.get('/user-articles',authenticateToken,articleController.getAllArticlesForUser);

/**
 * @openapi
 * /get-improvement/{reqid}:
 *   get:
 *     summary: Get improvement request by ID
 *     description: |
 *       Retrieves a specific improvement (edit request) by its ID for an authenticated user.
 *       Returns the associated article with populated tags.
 *     tags:
 *       - ArticlesEditRequest
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reqid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the improvement request (EditRequest)
 *     responses:
 *       200:
 *         description: Improvement request found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Edit request object with article and tags
 *               $ref: '#/components/schemas/EditRequest'
 *       400:
 *         description: Request ID is missing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Request ID is required
 *       401:
 *         description: Unauthorized - missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Article not found (e.g., removed)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Article not found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.get('/get-improvement/:reqid', authenticateToken, articleController.getImprovementById);


/**
 * @openapi
 * /articles/trust:
 *   post:
 *     summary: Trust or untrust an article
 *     tags:
 *       - Articles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - article_id
 *             properties:
 *               article_id:
 *                 type: number
 *                 description: ID of the article to trust/untrust
 *     responses:
 *       '200':
 *         description: Successfully trusted/untrusted
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Article or user not found
 *       '500':
 *         description: Internal server error
 */
router.post('/articles/trust', authenticateToken, articleController.trustArticle);

/**
 * @openapi
 * /articles/trusted-users:
 *   get:
 *     summary: Get users who trusted an article
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: query
 *         name: article_id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID of the article
 *     responses:
 *       '200':
 *         description: Successfully retrieved trusted users
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Article not found
 *       '500':
 *         description: Internal server error
 */
router.get('/articles/trusted-users', articleController.getTrustedUsers);

module.exports = router;
