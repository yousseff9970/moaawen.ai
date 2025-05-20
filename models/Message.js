const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['user', 'bot'], required: true },
  content: { type: String, required: true },
  sessionId: { type: String }, // optional tracking ID
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
