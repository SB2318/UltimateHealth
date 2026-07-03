const express = require("express");
const authenticateToken = require("../middleware/authentcatetoken");
const adminAuthenticateToken = require("../middleware/adminAuthenticateToken");
const controller = require("../controllers/analyticsController")
const router = express.Router();

/**
 * @openapi
 * /analytics/user-stats/{userId}:
 *   get:
 *     summary: Get total likes and views received by a user
 *     description: |
 *       Returns the total number of likes and views received across all articles
 *       authored by the given user (excluding removed articles). Also includes
 *       normalized progress values for likes and views, relative to target thresholds.
 *       🔒 This is a protected route and requires authentication.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose stats are being retrieved
 *     responses:
 *       201:
 *         description: Stats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalLikes:
 *                   type: integer
 *                   example: 42
 *                 totalViews:
 *                   type: integer
 *                   example: 318
 *                 likeProgress:
 *                   type: number
 *                   format: float
 *                   example: 0.23
 *                   description: Normalized progress toward target likes (0.01 to 1)
 *                 viewProgress:
 *                   type: number
 *                   format: float
 *                   example: 0.87
 *                   description: Normalized progress toward target views (0.01 to 1)
 *       400:
 *         description: Missing user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user id is required
 *       401:
 *         description: Unauthorized - User must be authenticated
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
 *                 message:
 *                   type: string
 */

router.get('/user-stats/:userId', authenticateToken, controller.getTotalLikeAndViewReceivedByUser);

/**
 * @openapi
 * /analytics/total-reads/{userId}:
 *   get:
 *     summary: Get total read count and progress for a user
 *     description: |
 *       Returns the total read count for all days recorded for a user, based on ReadAggregate data.
 *       Also returns a normalized progress value (0.01 to 1), relative to a target read count.
 *       🔒 This is a protected route and requires authentication.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose read stats are being retrieved
 *     responses:
 *       201:
 *         description: Read count and progress retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalReads:
 *                   type: integer
 *                   example: 276
 *                 progress:
 *                   type: number
 *                   format: float
 *                   description: Normalized progress toward target read count (0.01 to 1)
 *                   example: 0.58
 *       400:
 *         description: Missing user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user id is required
 *       401:
 *         description: Unauthorized - User must be authenticated
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
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.get('/total-reads/:userId', authenticateToken, controller.getTotalReadCountOfUser);


/**
 * @openapi
 * /analytics/total-writes/{userId}:
 *   get:
 *     summary: Get total write count and progress for a user
 *     description: |
 *       Returns the total number of article writes by a user based on their WriteAggregate records.
 *       Also includes a normalized progress value (between 0.01 and 1) toward a predefined write goal.
 *       🔒 This is a protected route and requires authentication.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose write stats are being retrieved
 *     responses:
 *       201:
 *         description: Write count and progress retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalWrites:
 *                   type: integer
 *                   example: 63
 *                 progress:
 *                   type: number
 *                   format: float
 *                   description: Normalized progress toward target write count (0.01 to 1)
 *                   example: 0.42
 *       400:
 *         description: Missing user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user id is required
 *       401:
 *         description: Unauthorized - User must be authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error while fetching write data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.get('/total-writes/:userId', authenticateToken,  controller.getTotalWriteCountOfUser);

/**
 * @openapi
 * /analytics/mostly-viewed/{userId}:
 *   get:
 *     summary: Get top 5 most viewed articles of a user
 *     description: |
 *       Returns the top 5 articles authored by the user, sorted by number of views in descending order.
 *       Useful for analyzing popular content and performance per user.
 *        🔒 This is a protected route and requires authentication.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose most viewed articles are being retrieved
 *     responses:
 *       200:
 *         description: Top 5 most viewed articles returned
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 ref: '#/components/schemas/Article'
 *       400:
 *         description: Missing user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user id is required
 *       401:
 *         description: Unauthorized - User must be authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error while fetching articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.get('/mostly-viewed/:userId', authenticateToken,  controller.getMostViewedArticles);

/**
 * @openapi
 * /analytics/daily-reads:
 *   get:
 *     summary: Get average articles read by a user on a specific day of the week
 *     description: |
 *       Returns the average number of articles **read by a user** on a specific day of the week
 *       (e.g., all Tuesdays) during the current month.
 *       
 *       This is useful for identifying which days a user is most active in reading content.
 *       For example, you can analyze if a user reads more on weekends or weekdays.
 *       🔒 This is a protected route and requires authentication.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose read activity is being analyzed
 *       - name: specificDay
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 0
 *           maximum: 6
 *         description: Day of the week (0 for Sunday, 6 for Saturday)
 *     responses:
 *       200:
 *         description: Successfully calculated average reads for the given day
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averageReads:
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: integer
 *                       example: 2
 *                       description: Day of the week (e.g., 2 = Tuesday)
 *                     value:
 *                       type: number
 *                       format: float
 *                       example: 13.67
 *                       description: Average number of reads for the specified day in the current month
 *       400:
 *         description: Missing or invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Id and day is required
 *                 error:
 *                   type: string
 *                   example: Invalid specificDay parameter. It should be between 0 (Sunday) and 6 (Saturday).
 *       500:
 *         description: Server error while calculating read data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching read data
 * 
 *       401:
 *         description: Unauthorized - User must be authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */

router.get('/daily-reads',authenticateToken, controller.getDailyReadDataForGraphs);


/**
 * @openapi
 * /analytics/monthly-reads:
 *   get:
 *     summary: Get user's daily read activity for a specific month
 *     description: |
 *       Returns an array of objects representing the number of articles read by the user
 *       for each day in the specified month. If a day has no read data, the value will be 0.
 *       
 *       This is used to display reading trends in graphs or heatmaps.
 *       🔒 This is a protected route and requires authentication.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose read data is being retrieved
 *       - name: month
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 0
 *           maximum: 11
 *         description: |
 *           Month index (0 for January to 11 for December). Defaults to current month if not provided.
 *     responses:
 *       200:
 *         description: Daily read data fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 monthlyReads:
 *                   type: array
 *                   description: Array containing number of reads per day for the month
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2025-08-15"
 *                       value:
 *                         type: integer
 *                         example: 5
 *                         description: Number of articles read by the user on that date
 *       400:
 *         description: Missing or invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Id and month are required
 *                 error:
 *                   type: string
 *                   example: Invalid month parameter. It should be between 0 (January) and 11 (December).
 *       500:
 *         description: Server error while fetching read data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching read data
 *       401:
 *         description: Unauthorized - User must be authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */

router.get('/monthly-reads', authenticateToken, controller.getMonthlyReadDataForGraphs);

/**
 * @openapi
 * /analytics/yearly-reads:
 *   get:
 *     summary: Get user's monthly read activity for a specific year
 *     description: |
 *       Returns an array showing how many articles a user read in each month of the specified year.
 *       
 *       If the user didn't read anything in a month, the value for that month will be 0.
 *       This is useful for displaying annual reading trends.
 *       🔒 This is a protected route and requires authentication.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose yearly read stats are being fetched
 *       - name: year
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 2000
 *         description: |
 *           Year for which to retrieve data (e.g., 2025). Defaults to current year if not provided.
 *     responses:
 *       200:
 *         description: Monthly read data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 yearlyReads:
 *                   type: array
 *                   description: Array of read counts per month
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         example: "2025-08"
 *                         description: Month in YYYY-MM format
 *                       value:
 *                         type: integer
 *                         example: 120
 *                         description: Number of articles read in that month
 *       400:
 *         description: Missing or invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User ID and year are required
 *                 error:
 *                   type: string
 *                   example: Invalid year parameter. It should be a number between 2000 and the current year.
 *       500:
 *         description: Server error while fetching data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching read data
 */

router.get('/yearly-reads', authenticateToken, controller.getYearlyReadDataForGraphs);

/**
 * @openapi
 * /analytics/daily-writes:
 *   get:
 *     summary: Get average articles written by a user on a specific day of the week.
 *     description: |
 *       Returns the average number of articles **written by a user** on a specific day of the week
 *       (e.g., all Fridays) during the current month.
 *       
 *       This is helpful for identifying which days a user is most active in writing.
 *       🔒 This is a protected route and requires authentication.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose write data is being analyzed
 *       - name: specificDay
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 0
 *           maximum: 6
 *         description: Day of the week (0 for Sunday, 6 for Saturday)
 *     responses:
 *       200:
 *         description: Successfully calculated average writes for the given weekday
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averageReads:   
 *                   type: object
 *                   properties:
 *                     day:
 *                       type: integer
 *                       example: 2
 *                       description: Day of the week (e.g., 2 = Tuesday)
 *                     value:
 *                       type: number
 *                       format: float
 *                       example: 1.5
 *                       description: Average number of articles written on that day across the current month
 *       400:
 *         description: Missing or invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Id and day is required
 *                 error:
 *                   type: string
 *                   example: Invalid specificDay parameter. It should be between 0 (Sunday) and 6 (Saturday).
 *       500:
 *         description: Server error while fetching write data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching read data
 * 
 *       401:
 *         description: Unauthorized - User must be authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 */

router.get('/daily-writes',authenticateToken, controller.getDailyWriteDataForGraphs);

/**
 * @openapi
 * /analytics/monthly-writes:
 *   get:
 *     summary: Get user's daily write stats for a specific month
 *     description: |
 *       Returns how many articles a user wrote on each day of the specified month.
 *       
 *       This is useful for rendering daily bar graphs to visualize writing consistency.
 *       🔒 This is a protected route and requires authentication.
 *       
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose monthly write data is being fetched
 *       - name: month
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 0
 *           maximum: 11
 *         description: |
 *           Target month (0 = January, 11 = December). Defaults to current month if not provided.
 *     responses:
 *       200:
 *         description: Successfully retrieved daily write data for the specified month
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 monthlyWrites:
 *                   type: array
 *                   description: List of daily write activity
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2025-08-28"
 *                       value:
 *                         type: integer
 *                         example: 3
 *                         description: Number of articles written on that day
 *       400:
 *         description: Missing or invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Id and month is required
 *                 error:
 *                   type: string
 *                   example: Invalid month parameter. It should be between 0 (January) and 11 (December).
 *       401:
 *         description: Unauthorized - User must be authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error while fetching write data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching write data
 */

router.get('/monthly-writes', authenticateToken, controller.getMonthlyWriteDataForGraphs);

/**
 * @openapi
 * /analytics/yearly-writes:
 *   get:
 *     summary: Get user's monthly write stats for a specific year
 *     description: |
 *       Returns the number of articles written by a user in each month of the specified year.
 *       
 *       This is useful for plotting long-term writing activity (e.g., for line graphs or monthly bars).
 *       
 *       🔒 This is a protected route and requires authentication.
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose yearly write data is being retrieved
 *       - name: year
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           example: 2025
 *         description: |
 *           Target year (e.g., 2025). Defaults to current year if not provided.
 *     responses:
 *       200:
 *         description: Successfully retrieved monthly write data for the specified year
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 yearlyWrites:
 *                   type: array
 *                   description: Number of articles written per month
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         example: "2025-07"
 *                       value:
 *                         type: integer
 *                         example: 8
 *                         description: Total articles written during that month
 *       400:
 *         description: Missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User ID and year are required
 *                 error:
 *                   type: string
 *                   example: Invalid year parameter. It should be a number between 2000 and the current year.
 *       401:
 *         description: Unauthorized - Authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error while fetching write data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching read data
 */

router.get('/yearly-writes', authenticateToken, controller.getYearlyWriteDataForGraphs);


/**
 * @openapi
 * /analytics/admin/get-yearly-contribution:
 *   get:
 *     summary: Get monthly breakdown of admin contributions for a given year
 *     description: |
 *       Returns the number of admin contributions (review, publish, etc.) made per month for the specified year and contribution type.
 *       
 *       Used for plotting bar graphs or activity trends in the admin dashboard.
 *       
 *       🔒 This is a protected route and requires admin authentication.
 *     tags:
 *       - Admin Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: year
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "2025"
 *         description: Target year in YYYY format (e.g., "2024")
 *       - name: cType
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           enum: [1, 2, 3, 4]
 *           example: 1
 *         description: |
 *           Contribution type:
 *           - 1: Review
 *           - 2: Publish
 *           - 3: Discard
 *           - 4: Unassign
 *     responses:
 *       200:
 *         description: Monthly breakdown of contributions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   label:
 *                     type: integer
 *                     example: 1
 *                     description: Month number (1 = January, 12 = December)
 *                   value:
 *                     type: integer
 *                     example: 5
 *                     description: Number of contributions in that month
 *       400:
 *         description: Missing or invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing year or contribution type
 *       401:
 *         description: Unauthorized - Admin authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error while processing the request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */


router.get('/admin/get-yearly-contribution', adminAuthenticateToken, controller.getMonthlyBreakDownByYear);

/**
 * @openapi
 * /analytics/admin/get-monthly-contribution:
 *   get:
 *     summary: Get daily contribution breakdown for a specific month
 *     description: |
 *       Returns the number of admin contributions made each day of a specified month and year, filtered by contribution type.
 *       This helps visualize contribution activity across the month.
 *
 *       **Contribution Types:**
 *       - 1: Article Published
 *       - 2: Article Reviewed
 *       - 3: Comments Moderated
 *       - 4: Suggestions Resolved
 *
 *     tags:
 *       - Admin Analytics
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *           example: "2025"
 *         required: true
 *         description: Year to get data for (4-digit format)
 *       - in: query
 *         name: month
 *         schema:
 *           type: string
 *           example: "08"
 *         required: true
 *         description: Month to get data for (1–12)
 *       - in: query
 *         name: cType
 *         schema:
 *           type: integer
 *           enum: [1, 2, 3, 4]
 *           example: 1
 *         required: true
 *         description: Contribution type (1 = Publish, 2 = Review, 3 = Moderation, 4 = Suggestion)
 *     responses:
 *       200:
 *         description: Daily breakdown of contributions for the month
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   label:
 *                     type: integer
 *                     example: 15
 *                     description: Day of the month
 *                   value:
 *                     type: integer
 *                     example: 5
 *                     description: Number of contributions on that day
 *       400:
 *         description: Missing or invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Missing year or contribution type
 *       401:
 *         description: Unauthorized - Admin authentication required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error while processing the request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
*/

router.get('/admin/get-monthly-contribution', adminAuthenticateToken, controller.getDailyBreakdownByMonth);

module.exports = router;