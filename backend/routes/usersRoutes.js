const express = require('express');
const router = express.Router();

const {
    register, login, logout,
    sendOTPForForgotPassword, verifyOtpForForgotPassword,
    deleteByUser, deleteByAdmin
} = require("../controllers/usersControllers");

const { verifyEmail, sendVerificationEmail, Sendverifymail } = require('../controllers/emailservice');

router.get("/hello", (req, res) => {
    console.log("Hello World Route Executed");
    res.send("Hello World");
});

// Register New User
router.post("/user/register", register);

// Login User Route
router.post("/user/login", login);

// Forget password
router.post("/user/forgotpassword", sendOTPForForgotPassword);

// verify password
router.post("/user/verifypassword", verifyOtpForForgotPassword);

router.post('/user/deleteUser', deleteByUser);
router.post('/admin/deleteUser', deleteByAdmin);

router.get('/user/verifyEmail',verifyEmail );
router.post('/user/verifyEmail',Sendverifymail);


router.post("/user/logout", logout);

module.exports = router;
