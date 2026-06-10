require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const collectionRoutes = require("./routes/collectionRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/ultimatehealth";

app.use(cors());
app.use(express.json());

app.use("/api/collections", collectionRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

module.exports = app;
