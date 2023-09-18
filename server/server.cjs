const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();
const volleyball = require('volleyball');
const PORT = process.env.PORT_NUMBER;
const cors = require('cors');

// Static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(volleyball);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup
const allowedCorsOrigins = process.env.CORS_ORIGINS?.split('|');
console.log('allowed CORS origins:', allowedCorsOrigins);
app.use(cors({ origin: allowedCorsOrigins }));

// Start of API routes
app.use('/api', require('./API/index.cjs'));

// Serves HTML file
app.use('*', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
});

// Default error handling
app.use((err, req, res, next) => {
  // console.error(err.stack); // uncomment for debugging
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

async function init() {
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

init();

module.exports = app; // imported to mocha for tests
