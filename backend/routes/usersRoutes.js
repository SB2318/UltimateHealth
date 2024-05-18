const express = require('express');
const router = express.Router();

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

router.post("/logout",logout);


module.exports = router;