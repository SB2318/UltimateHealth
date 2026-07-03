const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authentcatetoken');
const adminAuthenticateToken = require("../middleware/adminAuthenticateToken");

const{
    submitEditRequest,
    getAllImprovementsForReview,
    getAllInProgressImprovementsForAdmin,
    getAllCompletedImprovementsForAdmin,
    pickImprovementRequest,
    submitReviewOnImprovement,
    submitImprovement,
    detectContentLoss, 
    discardImprovement,
    publishImprovement,
    unassignModerator
}= require('../controllers/admin/articleEditRequestController');

router.post('/article/submit-edit-request', authenticateToken, submitEditRequest);


router.get('/admin/available-improvements', adminAuthenticateToken, getAllImprovementsForReview);

router.get('/admin/progress-improvements', adminAuthenticateToken, getAllInProgressImprovementsForAdmin);

router.get('/admin/publish-improvements', adminAuthenticateToken, getAllCompletedImprovementsForAdmin);

router.post('/admin/approve-improvement-request', adminAuthenticateToken, pickImprovementRequest);


router.post('/admin/submit-review-on-improvement', adminAuthenticateToken, submitReviewOnImprovement);


router.post('/article/submit-improvement', authenticateToken, submitImprovement);


router.get('/article/detect-content-loss', adminAuthenticateToken, detectContentLoss);

router.post('/admin/discard-improvement', adminAuthenticateToken, discardImprovement);

router.post('/admin/publish-improvement', adminAuthenticateToken, publishImprovement);

router.post('/admin/improvement/unassign-moderator', adminAuthenticateToken, unassignModerator);


module.exports = router;