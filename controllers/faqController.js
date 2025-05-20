const FAQ = require('../models/FAQ');

exports.createFAQ = async (req, res) => {
  try {
    const { question, answer, tags, businessId } = req.body;

    const faq = new FAQ({
      question,
      answer,
      tags,
      businessId
    });

    await faq.save();
    res.status(201).json(faq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFAQs = async (req, res) => {
  try {
    const { businessId } = req.query;
    const faqs = await FAQ.find({ businessId });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await FAQ.findByIdAndUpdate(id, req.body, { new: true });
    if (!faq) return res.status(404).json({ message: 'FAQ not found' });
    res.json(faq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) return res.status(404).json({ message: 'FAQ not found' });
    res.json({ message: 'FAQ deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
