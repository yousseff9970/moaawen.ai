const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { handleMessage } = require('../controllers/chatController');

router.post('/', auth, handleMessage);

module.exports = router;
