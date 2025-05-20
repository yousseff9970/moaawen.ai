const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  whatsappNumber: { type: String, unique: true },
  instagramPageId: { type: String, unique: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ownerEmail: { type: String, required: true },
  aiTone: { type: String, enum: ['formal', 'casual'], default: 'casual' },
  language: { type: String, default: 'lebanese' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Business', businessSchema);
