const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  characterName: {
    type: String,
    required: true,
    default: "general"
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Conversation", conversationSchema);
