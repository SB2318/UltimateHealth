const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authentcatetoken');
const adminAuthenticateToken = require("../middleware/adminAuthenticateToken");

const {
    availablePodcastsForReview,
    getAllPodcastsOfModerator,
    getAllCompletedPodcastsOfModerator,
    pickPodcast,
    approvePodcast,
    discardPodcast
} = require('../controllers/admin/podcastReviewController');

router.get('/podcast-admin/available', adminAuthenticateToken, availablePodcastsForReview);

router.get('/podcast-admin/all', adminAuthenticateToken, getAllPodcastsOfModerator);


router.get('/podcast-admin/completed', adminAuthenticateToken, getAllCompletedPodcastsOfModerator);

router.post('/podcast-admin/pick', adminAuthenticateToken, pickPodcast);

router.post('/podcast-admin/approve', adminAuthenticateToken, approvePodcast);

router.post('/podcast-admin/discard', adminAuthenticateToken, discardPodcast);

module.exports = router;