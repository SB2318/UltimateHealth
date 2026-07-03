const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authentcatetoken');

const notificationController = require('../controllers/notifications/notificationController');

/**
 * @openapi
 * /notification:
 *   post:
 *     tags:
 *       - Notifications
 *     summary: Create a manual notification for a user
 *     description: |
 *       Create a notification with a title and message for a specified user.
 *       
 *       ### Requirements
 *       - User must be authenticated (JWT)
 *       - User must have logged in on a mobile device at least once
 *
 *       ### Use Cases
 *       - Notify followers when a post is published
 *       - Notify author after review process is completed
 *       - Notify users about likes, comments, mentions, and more
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
 *               - message
 *               - userId
 *             properties:
 *               title:
 *                 type: string
 *               message:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification created successfully
 *       400:
 *         description: Insufficient fields
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post('/notification', authenticateToken, notificationController.createNotification);

/**
 * @openapi
 * /notifications:
 *   get:
 *     summary: Get all notifications for a user
 *     description: |
 *       Fetches paginated notifications for a user or admin.
 *       Role:
 *         - 2: User
 *         - Others: Admin
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: integer
 *           example: 2
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of notifications
 *       400:
 *         description: User ID is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.get('/notifications', authenticateToken, notificationController.getAllNotifications);

/**
 * @openapi
 * /notification/unread-count:
 *   get:
 *     summary: Get unread notification count
 *     description: Returns count of unread notifications for a user or admin
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Count returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 unreadCount:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: User ID is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.get('/notification/unread-count', authenticateToken, notificationController.getUnreadNotificationCount);

/**
 * @openapi
 * /notifications/mark-as-read:
 *   put:
 *     summary: Mark all notifications as read
 *     description: Marks all notifications as read for a user or admin
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Notifications marked as read
 *       400:
 *         description: User ID is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put('/notifications/mark-as-read', authenticateToken, notificationController.markNotifications);

/**
 * @openapi
 * /notification/{id}:
 *   delete:
 *     summary: Delete a specific notification
 *     description: Deletes a notification by its ID
 *     tags:
 *       - Notifications
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: 64b4b97d9b4c4a0012aa3c59
 *     responses:
 *       200:
 *         description: Notification deleted
 *       400:
 *         description: Notification ID or User ID missing
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Notification not found
 *       500:
 *         description: Internal server error
 */
router.delete('/notification/:id', authenticateToken, notificationController.deleteNotificationById);


module.exports = router;

