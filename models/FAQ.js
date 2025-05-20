const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  tags: [String],
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true }
}, { timestamps: true });

module.exports = mongoose.model('FAQ', faqSchema);
