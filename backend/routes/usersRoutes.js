const express = require('express');
const router = express.Router();
const verifyToken = require("../auth/authMiddleware");

// Backend API -  http://localhost:3025/api/

const {register,login,logout} = require("../controllers/usersControllers");


router.get("/hello", (req, res) => {
    console.log("Hello World Route Executed");
    res.send("Hello World");
});

// Register New User
router.post("/user/register", register);

// Login User Route
router.post("/user/login",login);


// Forget password
router.post("/user/forgotpassword", forgotPassword);

// verify password
router.post("/user/verifypassword", confirmPassword);


router.get("/user/profile", verifyToken, (req, res) => {
    const userId = req.userId;
    res.status(200).json({ message: "You are authenticated!", userId });
});

  


router.post("/user/logout",logout);


module.exports = router;