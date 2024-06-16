const express = require('express');
const dbConnect = require("./config/database");
const cors = require("cors");
const userRoutes = require("./routes/usersRoutes");
const specializationRoutes = require("./routes/SpecializationsRoutes");
const articleRoutes = require("./routes/articleRoutes");
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");

const app = express();

// Use the cookie-parser middleware
app.use(cookieParser());

// Connect to the Database
dbConnect();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors({ origin: "*" }));


app.get("/hello", (req, res) => {
    console.log("Hello World");
});



// Use the userRoutes
app.use("/api", userRoutes);
app.use("/api", specializationRoutes);
app.use("/api",articleRoutes );

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on port 3025');
});

// Export the app for testing or other purposes
module.exports = app;