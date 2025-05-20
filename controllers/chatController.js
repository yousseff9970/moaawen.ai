const Message = require('../models/Message');
const FAQ = require('../models/FAQ');
const Business = require('../models/Business');
const { getAIResponse } = require('../services/openaiService');
const { sendDraftToBusiness } = require('../services/emailService');

exports.handleMessage = async (req, res) => {
  try {
    const { message, businessId, sessionId } = req.body;

    const business = await Business.findById(businessId);
    if (!business) return res.status(404).json({ message: 'Business not found' });

    const faqs = await FAQ.find({ businessId });

    // Save user message
    await Message.create({
      sender: 'user',
      content: message,
      businessId,
      sessionId
    });

    // Check for FAQ match (optional)
    const matchedFAQ = faqs.find(f =>
      f.question.toLowerCase().includes(message.toLowerCase())
    );

    let gptReplyRaw;
    if (!matchedFAQ) {
      // 🔹 Call GPT with dynamic system prompt
      gptReplyRaw = await getAIResponse(business.name, business.aiTone, faqs, message);

      // 🔹 Extract confidence
      const confidenceMatch = gptReplyRaw.match(/CONFIDENCE=(\d+)/);
      const confidenceScore = confidenceMatch ? parseInt(confidenceMatch[1]) : 0;

      // 🔹 Clean up the reply text
      const botReply = gptReplyRaw.replace(/CONFIDENCE=\d+/, '').trim();

      // 🔹 Send fallback email if confidence < 80
      if (confidenceScore < 80) {
        await sendDraftToBusiness(business.ownerEmail, message, botReply, confidenceScore);
        return res.status(202).json({
          status: 'held',
          message: 'Reply confidence was low. Draft sent to business owner.'
        });
      }

      // 🔹 Save reply
      await Message.create({
        sender: 'bot',
        content: botReply,
        businessId,
        sessionId
      });

      return res.json({ reply: botReply });

    } else {
      // If matched FAQ
      await Message.create({
        sender: 'bot',
        content: matchedFAQ.answer,
        businessId,
        sessionId
      });

      return res.json({ reply: matchedFAQ.answer });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

