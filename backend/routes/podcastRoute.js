const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authentcatetoken');
const {
    getFollowingsPodcasts,
    getMyPlayLists,
    getPodcastsByPlaylistId,
    getPodcastById,
    getPodcastProfile,
    getAllPublishedPodcasts,
    searchPodcast,

    createPodcast,
    savePodcast,
    likePodcast,
    updatePodcastViewCount,

    getPodcastLikeDataForGraphs,
    getPodcastViewDataForGraphs,

    addPodcastToPlaylist,
    createPlaylist,
    removePodcastFromPlaylist,

    // Update
    updatePlaylist,
    updatePodcast,

    // Delete
    deletePodcast,
    deletePlaylist,
    filterPodcast,
    updatePlaylistwithPodcast,
    getUserPendingPodcasts,
    getUserPublishedPodcasts,
    getDiscardedPodcasts
} = require('../controllers/podcastController');

/**
 * @swagger
 * /podcast/profile:
 *   get:
 *     tags:
 *       - Podcasts
 *     summary: Get podcast profile
 *     description: Retrieves the podcast profile of a user, including published standalone podcasts, playlists, and user details.
 *     operationId: getPodcastProfile
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: false
 *         schema:
 *           type: string
 *           example: "64f8b94a12e4b6fabc123456"
 *         description: Optional user ID to fetch profile for. If not provided, fetches the profile of the logged-in user.
 *     responses:
 *       '200':
 *         description: Podcast profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 podcasts:
 *                   type: array
 *                   description: List of published standalone podcasts
 *                   items:
 *                     type: object
 *                     $ref: '#/components/schemas/Podcast'
 *                 playlists:
 *                   type: array
 *                   description: List of user playlists with published podcasts
 *                   items:
 *                     type: object
 *                     $ref: '#/components/schemas/Playlist'
 *                 user:
 *                   type: object
 *                   description: User information
 *                   $ref: "#/components/schemas/User"
 *       '400':
 *         description: User not found or bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 *       '401':
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred
 */

router.get('/podcast/profile', authenticateToken, getPodcastProfile);

router.get('/podcast/followings', authenticateToken, getFollowingsPodcasts);

/**
 * @swagger
 * /podcast/get-my-playlists:
 *   get:
 *     tags:
 *       - Playlists
 *     summary: Get my playlists
 *     description: Retrieve all playlists created by the authenticated user, sorted by most recently updated.
 *     operationId: getMyPlayLists
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of playlists successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Playlist'
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred
 */
router.get('/podcast/get-my-playlists', authenticateToken, getMyPlayLists);

/**
 * @swagger
 * /podcast/playlist-details:
 *   get:
 *     tags:
 *       - Playlists
 *     summary: Get podcasts by playlist ID
 *     description: Returns all published and non-removed podcasts in a given playlist. Protected route.
 *     operationId: getPodcastsByPlaylistId
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: playlist_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the playlist to fetch podcasts from
 *         example: "64f8b94a12e4b6fabc123456"
 *     responses:
 *       '200':
 *         description: List of podcasts in the playlist
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Podcast'
 *       '400':
 *         description: Missing or invalid playlist ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Playlist id is required
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       '404':
 *         description: Playlist not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Playlist not found
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred
 */

router.get('/podcast/playlist-details', authenticateToken, getPodcastsByPlaylistId);

/**
 * @swagger
 * /podcast/published-podcasts:
 *   get:
 *     tags:
 *       - Podcasts
 *     summary: Get all published podcasts
 *     description: Retrieve a paginated list of the most recently published podcasts. This route is protected and requires authentication.
 *     operationId: getAllPublishedPodcasts
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
 *         description: Number of items per page
 *     responses:
 *       '200':
 *         description: List of published podcasts successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allPodcasts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Podcast'
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                   description: Only included on the first page
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       '500':
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
router.get('/podcast/published-podcasts', getAllPublishedPodcasts); // auth removed for guest profile, purpose: user can listen podcasts in unauthenticated state

/**
 * @swagger
 * /podcast/details:
 *   get:
 *     tags:
 *       - Podcasts
 *     summary: Get podcast details by ID
 *     description: Retrieves detailed information for a specific podcast, including user info, tags, mentioned users, and comment count.
 *     operationId: getPodcastById
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: podcast_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the podcast to retrieve
 *         example: "64f8b94a12e4b6fabc123456"
 *     responses:
 *       '200':
 *         description: Podcast details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Podcast'  
 *       '400':
 *         description: Missing podcast ID in request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Podcast id is required
 *       '401':
 *         description: Unauthorized - Invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       '404':
 *         description: Podcast not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Podcast not found
 *       '500':
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
router.get('/podcast/details', getPodcastById);

/**
 * @swagger
 * /podcast/search:
 *   get:
 *     tags:
 *       - Podcasts
 *     summary: Search podcasts
 *     description: Search for podcasts based on a keyword in the podcast title, description, or associated article title. Returns paginated results.
 *     operationId: searchPodcast
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search keyword (matches podcast title, description, or related article title).
 *         example: "AI"
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
 *         description: Number of items per page
 *     responses:
 *       '200':
 *         description: Matching podcasts found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 matchPodcasts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Podcast'
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                   description: Total number of pages (only returned on page 1)
 *       '400':
 *         description: Missing search query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Search query is required
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       '500':
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
router.get('/podcast/search', searchPodcast); // auth removed for guest profile, purpose: user can search podcasts in unauthenticated state

/**
 * @swagger
 * /podcast/filter:
 *   post:
 *     tags:
 *       - Podcasts
 *     summary: Filter podcasts by tags
 *     description: Filter published podcasts by an array of tags. Sort results by most recent or oldest.
 *     operationId: filterPodcast
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tags:
 *                 type: array
 *                 description: Array of tag IDs to filter by
 *                 items:
 *                   type: string
 *                   example: "64f8b94a12e4b6fabc123456"
 *               sortType:
 *                 type: integer
 *                 enum: [0, 1]
 *                 default: 1
 *                 description: 0 for ascending (oldest first), 1 for descending (most recent first)
 *             required:
 *               - tags
 *     responses:
 *       '200':
 *         description: Filtered podcasts returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Podcast'
 *       '400':
 *         description: Invalid or missing tags in request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid tags
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       '500':
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
router.post('/podcast/filter', filterPodcast); // auth removed for guest profile, purpose: user can filter podcast in unauthenticated state

/**
 * @swagger
 * /podcast/view-graph:
 *   get:
 *     tags:
 *       - Podcast Analytics
 *     summary: Get podcast view analytics data for graphs
 *     description: Returns the authenticated user's podcast view stats for the current day, month, and year. Useful for rendering graphs.
 *     operationId: getPodcastViewDataForGraphs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: View analytics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dailyViews:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2025-08-31"
 *                     count:
 *                       type: integer
 *                       example: 25
 *                 monthlyViews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2025-08-15"
 *                       count:
 *                         type: integer
 *                         example: 120
 *                 yearlyViews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         format: date
 *                         example: "2025-06"
 *                       count:
 *                         type: integer
 *                         example: 980
 *       '401':
 *         description: Unauthorized - Missing or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching read data
 */
router.get('/podcast/view-graph', authenticateToken, getPodcastViewDataForGraphs);

/**
 * @swagger
 * /podcast/like-graph:
 *   get:
 *     tags:
 *       - Podcast Analytics
 *     summary: Get podcast like data for graphs
 *     description: Returns like statistics (daily, monthly, yearly) for the authenticated user's podcasts. It is useful for generating graphical insights.
 *     operationId: getPodcastLikeDataForGraphs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Like analytics fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dailyLikes:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       format: date
 *                       example: "2025-08-31"
 *                     count:
 *                       type: integer
 *                       example: 12
 *                 monthlyLikes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2025-08-15"
 *                       count:
 *                         type: integer
 *                         example: 75
 *                 yearlyLikes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         format: date
 *                         example: "2025-06"
 *                       count:
 *                         type: integer
 *                         example: 540
 *       '401':
 *         description: Unauthorized - Missing or invalid authentication token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching read data
 */
router.get('/podcast/like-graph', authenticateToken, getPodcastLikeDataForGraphs);

/**
 * @swagger
 * /podcast/create:
 *   post:
 *     tags:
 *       - Podcasts
 *     summary: Create a new podcast
 *     description: >
 *       Allows an authenticated user to create a new podcast.  
 *       Audio and cover image must be uploaded to AWS before calling this endpoint.  
 *       The podcast will be created in **review-pending** state and must be approved by an admin.
 *     operationId: createPodcast
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - tags
 *               - audio_url
 *               - duration
 *               - cover_image
 *             properties:
 *               title:
 *                 type: string
 *                 example: "How AI Is Changing the World"
 *               description:
 *                 type: string
 *                 example: "This episode dives into real-world applications of AI."
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["64f8b94a12e4b6fabc123456", "64f8c12d98e0ba0012a45f9e"]
 *               article_id:
 *                 type: string
 *                 nullable: true
 *                 example: "64f8d12d98e0ba0012a45abc"
 *               audio_url:
 *                 type: string
 *                 example: "https://your-bucket.s3.amazonaws.com/audio/ai-episode-1.mp3"
 *               duration:
 *                 type: number
 *                 example: 185
 *               cover_image:
 *                 type: string
 *                 example: "https://your-bucket.s3.amazonaws.com/images/cover123.jpg"
 *     responses:
 *       '201':
 *         description: Podcast created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Podcast created successfully.
 *                 podcast:
 *                   $ref: '#/components/schemas/Podcast'
 *       '400':
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All fields are required. title, description, tags, audio_url, duration, cover_image
 *       '401':
 *         description: Unauthorized - Token missing or invalid
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
 *                   example: User is blocked or banned.
 *       '500':
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
router.post('/podcast/create', authenticateToken, createPodcast);

/**
 * @swagger
 * /podcasts/like:
 *   post:
 *     tags:
 *       - Podcasts
 *     summary: Like or unlike a podcast
 *     description: |
 *       Allows an authenticated user to like or unlike a **published podcast**.
 *       - If the podcast is already liked, it will be unliked.
 *       - If not, it will be liked and the podcast's like contribution is increased.
 *       - Podcast must be published and not removed.
 *     operationId: likePodcast
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - podcast_id
 *             properties:
 *               podcast_id:
 *                 type: string
 *                 description: ID of the podcast to like or unlike
 *                 example: "64f8b94a12e4b6fabc123456"
 *     responses:
 *       '200':
 *         description: Podcast liked or unliked
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Podcast liked successfully
 *                 likeStatus:
 *                   type: boolean
 *                   description: true if liked, false if unliked
 *                   example: true
 *       '400':
 *         description: Bad request due to invalid input or state
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Podcast is not published
 *       '401':
 *         description: Unauthorized - Missing or invalid token
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
 *         description: Podcast or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User or podcast not found
 *       '500':
 *         description: Internal server error during processing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error liking podcast
 *                 details:
 *                   type: string
 *                   example: Cast to ObjectId failed for value "123" at path "_id"
 */
router.post('/podcast/like', authenticateToken, likePodcast);

/**
 * 
 * @deprecated
 */
router.post('/podcast/save', authenticateToken, savePodcast);

/**
 * @swagger
 * /podcast/update-view-count:
 *   post:
 *     summary: Update podcast view count for a published podcast
 *     description: Updates the view count of a published podcast by a unique user. Each user can only increment the view count once.
 *     tags:
 *       - Podcasts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - podcast_id
 *             properties:
 *               podcast_id:
 *                 type: string
 *                 example: "6123abc456def78901234567"
 *     responses:
 *       200:
 *         description: View count updated successfully or already viewed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Podcast view count updated"
 *                 data:
 *                   $ref: '#/components/schemas/Podcast'
 *       400:
 *         description: Podcast is not published
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Podcast is not published"
 *       401:
 *         description: Unauthorized – user token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: User is blocked or banned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User is blocked or banned"
 *       404:
 *         description: User or Podcast not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User or Podcast not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error updating view"
 *                 details:
 *                   type: string
 *                   example: "Detailed error message here"
 */
router.post('/podcast/update-view-count', authenticateToken, updatePodcastViewCount);

/**
 * @swagger
 * /podcast/create-playlist:
 *   post:
 *     summary: Create a new playlist
 *     description: Allows an authenticated user to create a playlist with a list of podcasts.
 *     tags:
 *       - Playlists
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
 *               - podcast_ids
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My Favorite Podcasts"
 *               podcast_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["6123abc456def78901234567", "6123abc456def78901234568"]
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Playlist created"
 *                 data:
 *                   $ref: '#/components/schemas/Playlist'
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request: name, description, and podcast_ids are required"
 *       401:
 *         description: Unauthorized – JWT missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error creating playlist"
 *                 details:
 *                   type: string
 *                   example: "Detailed error message"
 */
router.post('/podcast/create-playlist', authenticateToken, createPlaylist);

/**
 * @swagger
 * /podcast/add-podcast-form-playlist:
 *   post:
 *     summary: Add a podcast to an existing playlist
 *     description: Allows an authenticated user to add a podcast to one of their playlists.
 *     tags:
 *       - Playlists
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - podcast_id
 *               - playlist_id
 *             properties:
 *               podcast_id:
 *                 type: string
 *                 example: "6123abc456def78901234567"
 *               playlist_id:
 *                 type: string
 *                 example: "7123abc456def78901234567"
 *     responses:
 *       200:
 *         description: Podcast added to playlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Podcast added to playlist"
 *                 data:
 *                   $ref: '#/components/schemas/Playlist'
 *       400:
 *         description: Missing podcast or playlist ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Podcast and Playlist IDs are required"
 *       401:
 *         description: Unauthorized – JWT missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Podcast or Playlist not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Podcast or Playlist not found"
 *       500:
 *         description: Server error while adding podcast to playlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error adding podcast to playlist"
 *                 details:
 *                   type: string
 *                   example: "Detailed error message"
 */
router.post('/podcast/add-podcast-form-playlist', authenticateToken, addPodcastToPlaylist);

/**
 * @swagger
 * /podcast/remove-podcast-to-playlist:
 *   post:
 *     summary: Remove a podcast from a playlist
 *     description: Removes a podcast from the specified playlist for the authenticated user.
 *     tags:
 *       - Playlists
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - podcast_id
 *               - playlist_id
 *             properties:
 *               podcast_id:
 *                 type: string
 *                 example: "6123abc456def78901234567"
 *               playlist_id:
 *                 type: string
 *                 example: "7123abc456def78901234567"
 *     responses:
 *       200:
 *         description: Podcast removed from playlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Podcast removed from playlist"
 *                 data:
 *                   $ref: '#/components/schemas/Playlist'
 *       400:
 *         description: Missing podcast or playlist ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Podcast and Playlist IDs are required"
 *       401:
 *         description: Unauthorized – JWT missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Podcast or Playlist not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Podcast or Playlist not found"
 *       500:
 *         description: Server error during removal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error removing podcast from playlist"
 *                 details:
 *                   type: string
 *                   example: "Detailed error message"
 */
router.post('/podcast/remove-podcast-to-playlist', authenticateToken, removePodcastFromPlaylist);

/**
 * @swagger
 * /podcast/update-playlist:
 *   post:
 *     summary: Add or remove a podcast from multiple playlists, or create a new playlist with it
 *     description: Updates multiple playlists by adding or removing a podcast, and optionally creates a new playlist.
 *     tags:
 *       - Playlists
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - addPlaylistIds
 *               - removePlaylistIds
 *               - podcast_id
 *             properties:
 *               podcast_id:
 *                 type: string
 *                 example: "6123abc456def78901234567"
 *               addPlaylistIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["7123abc456def78901234567", "8123abc456def78901234567"]
 *               removePlaylistIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["9123abc456def78901234567"]
 *               playlist_name:
 *                 type: string
 *                 example: "New Favorites"
 *     responses:
 *       200:
 *         description: Podcast added/removed from playlists successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Podcast added to playlist"
 *       201:
 *         description: New playlist created with the podcast
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Playlist created"
 *                 data:
 *                   $ref: '#/components/schemas/Playlist'
 *       400:
 *         description: Missing or invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Playlistids add or remove along with podcast id required"
 *       401:
 *         description: Unauthorized – JWT missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Podcast or Playlist not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Podcast or Playlist not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 *                 details:
 *                   type: string
 *                   example: "Detailed error message"
 */
router.post('/podcast/update-playlist', authenticateToken, updatePlaylistwithPodcast);

/**
 * 
 * @deprecated
 */
router.put('/podcast/update', authenticateToken, updatePodcast);

/**
 * 
 * @deprecated
 */
router.put('/podcast/update-playlist', authenticateToken, updatePlaylist);

/**
 * 
 * @deprecated
 */
router.delete('/podcast/delete', authenticateToken, deletePodcast);

/**
 * @swagger
 * /podcast/delete-playlist:
 *   delete:
 *     summary: Delete a playlist
 *     description: Deletes a playlist by its ID. Only accessible to authenticated users.
 *     tags:
 *       - Playlists
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - playlistId
 *             properties:
 *               playlistId:
 *                 type: string
 *                 example: "6123abc456def78901234567"
 *     responses:
 *       200:
 *         description: Playlist deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Playlist deleted successfully"
 *       400:
 *         description: Missing playlist ID in request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request: playlistId is required"
 *       401:
 *         description: Unauthorized – JWT missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       404:
 *         description: Playlist not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Playlist not found"
 *       500:
 *         description: Server error during playlist deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while deleting playlist"
 */
router.delete('/podcast/delete-playlist', authenticateToken, deletePlaylist);

// workspace
/**
 * @swagger
 * /podcast/discarded:
 *   get:
 *     summary: Get user's discarded podcasts
 *     description: Retrieves all podcasts marked as discarded by the moderator with pagination support.
 *     tags:
 *       - Podcasts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of discarded podcasts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 discardedPodcasts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Podcast'
 *                 totalPages:
 *                   type: integer
 *                   example: 2
 *       401:
 *         description: Unauthorized – JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: Please login to access this resource"
 *       500:
 *         description: Server error during data retrieval
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch discarded podcasts due to server error"
 */
router.get('/podcast/discarded', authenticateToken, getDiscardedPodcasts);

/**
 * @swagger
 * /podcast/user-pending:
 *   get:
 *     summary: Get user's pending podcasts
 *     description: Retrieves podcasts created by the authenticated user that are either in-progress or under review.
 *     tags:
 *       - Podcasts
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
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of pending podcasts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pendingPodcasts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Podcast'
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *       401:
 *         description: Unauthorized – JWT token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: Access token is missing or invalid"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unexpected error while fetching pending podcasts"
 */
router.get('/podcast/user-pending', authenticateToken, getUserPendingPodcasts);

/**
 * @swagger
 * /podcast/user-published:
 *   get:
 *     summary: Get user's published podcasts
 *     description: Retrieves all published podcasts of the authenticated user with pagination.
 *     tags:
 *       - Podcasts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of published podcasts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 publishedPodcasts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Podcast'
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *       401:
 *         description: Unauthorized – JWT token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: Invalid or expired token"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong while retrieving published podcasts"
 */
router.get('/podcast/user-published', authenticateToken, getUserPublishedPodcasts);


module.exports = router;