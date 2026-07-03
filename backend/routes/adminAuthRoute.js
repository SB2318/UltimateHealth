const express = require("express");
const router = express.Router();
const { register, login, logout, getprofile, updateAdminPassword, editProfile, deleteAdmin } = require('../controllers/admin/adminAuthController');
const {
  verifyEmail,
  Sendverifymail,
  resendVerificationEmail,
} = require("../controllers/emailservice");
const path = require("path");
const authenticateToken = require("../middleware/adminAuthenticateToken");

const { uploadAgreementPDF } = require("../controllers/uploadController");



router.post("/admin/register", register);




router.post("/admin/login", login);
router.post("/admin/upload-agreement",  uploadAgreementPDF);



router.post("/admin/logout", authenticateToken, logout);




router.get("/admin/verifyEmail", verifyEmail);



router.post("/admin/verifyEmail", Sendverifymail);


router.post("/admin/resend-verification-mail", resendVerificationEmail);


router.get('/admin/getprofile', authenticateToken, getprofile);

router.post('/admin/update-password', updateAdminPassword);


router.post('/admin/update-profile', authenticateToken, editProfile);



router.post("/admin/delete", authenticateToken, deleteAdmin);

router.get("/admin/delete-account", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "login-admin.html"));
});


router.get("/admin/agreement", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "admin-agreement.html"));
});


module.exports = router;


