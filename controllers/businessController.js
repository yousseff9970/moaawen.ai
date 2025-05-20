const Business = require('../models/Business');

exports.createBusiness = async (req, res) => {
  try {
    const { name, whatsappNumber, instagramPageId, aiTone, language } = req.body;
    const owner = req.user.userId;

    const exists = await Business.findOne({ $or: [{ whatsappNumber }, { instagramPageId }] });
    if (exists) return res.status(400).json({ message: 'Business already exists with that contact info.' });

    const business = new Business({
      name,
      whatsappNumber,
      instagramPageId,
      aiTone,
      language,
      owner
    });

    await business.save();
    res.status(201).json(business);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find({ owner: req.user.userId });
    res.json(businesses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
