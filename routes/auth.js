const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');

router.get('/secure-data', auth, (req, res) => {
  res.json({ message: 'You are authenticated!', user: req.user });
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;
