const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const messageSchema = new mongoose.Schema({
  _id: { type: Number, autoIncrement: true },

  text: { type: String, required: true },
  role: { type: String, enum: ["user", "model"], required: true },

  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true
  },
 

  timestamp: { type: Number, default: () => Date.now() },
});

messageSchema.plugin(AutoIncrement, {
  id: "message_id_counter",
  inc_field: "_id"
});

module.exports = mongoose.model("Message", messageSchema);
