const express = require('express');
const rateLimiter = require('../index');

const app = express();

// Allow max 5 requests per 10 seconds per IP
app.use(rateLimiter({ windowMs: 10000, max: 5 }));

app.get('/', (req, res) => {
  res.send('Hello! You are not rate-limited (yet)');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
