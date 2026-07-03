const express = require("express");
const authenticateToken = require("../middleware/authentcatetoken");
const adminAuthenticateToken = require("../middleware/adminAuthenticateToken");
const controller = require("../controllers/reportController")
const router = express.Router();

router.post('/report/add-reason', adminAuthenticateToken, controller.addReason);
router.put('/report/update-reason', adminAuthenticateToken, controller.updateReason);

router.delete('/report/reason/:id', adminAuthenticateToken, controller.deleteReason);

router.get('/report/reasons', authenticateToken, controller.getAllReasons);

router.post('/report/submit', authenticateToken, controller.submitReport);

router.get('/report/pending-reports', adminAuthenticateToken, controller.getAllPendingReports);

router.get('/report/all-assigned-reports', adminAuthenticateToken, controller.getAllReportsForModerator);

router.get('/report-details/:id', adminAuthenticateToken, controller.getReportDetails);

router.post('/report/pick-report-for-investigation', adminAuthenticateToken, controller.adminAction);

router.post('/report/take-admin-action', adminAuthenticateToken, controller.adminTakeAction);

router.post('/report/convict-request-against-report', authenticateToken, controller.convictRequestToRestoreContent);



/**
 * @later
 */
router.get('/report/all-reports-against-convict', adminAuthenticateToken, controller.getAllReportsAgainstConvict);

module.exports = router;