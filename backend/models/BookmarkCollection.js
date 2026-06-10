const mongoose = require("mongoose");

const bookmarkCollectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    default: "",
    maxlength: 300,
  },
  articleIds: [{ type: Number, ref: "Article" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

bookmarkCollectionSchema.index({ userId: 1, name: 1 }, { unique: true });

bookmarkCollectionSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

bookmarkCollectionSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

module.exports = mongoose.model("BookmarkCollection", bookmarkCollectionSchema);
