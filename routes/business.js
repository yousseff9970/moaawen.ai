const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createBusiness, getMyBusinesses } = require('../controllers/businessController');

router.use(auth);
router.post('/', createBusiness);
router.get('/', getMyBusinesses);

module.exports = router;
