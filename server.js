require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const businessRoutes = require('./routes/business');
const faqRoutes = require('./routes/faq');
const chatRoutes = require('./routes/chat');
const voiceRoutes = require('./routes/voice');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/voice', voiceRoutes);


 

app.get('/api/meta/webhook', (req, res) => {
  const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log("Webhook Verified!");
    res.status(200).send(challenge); // Must return the challenge string
  } else {
    res.sendStatus(403); // Wrong token or mode
  }
});





// Health Check
app.get('/', (req, res) => {
  res.send('Moaawen.ai API is live ✅');
});

// Connect DB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('MongoDB connection error:', err));
