// server/server.js

const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection (Adjust as per your setup)
const connectDB = require('./db/database');
connectDB();

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/transaction', require('./routes/transaction'));

// Serve React Frontend
app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Port Configuration (For Local Testing)
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app;
