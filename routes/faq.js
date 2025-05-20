const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createFAQ, getFAQs, updateFAQ, deleteFAQ } = require('../controllers/faqController');

router.use(auth);
router.post('/', createFAQ);
router.get('/', getFAQs);
router.put('/:id', updateFAQ);
router.delete('/:id', deleteFAQ);

module.exports = router;
