// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Mock Data (you need to create or import this)
const parkingLots = require('./data/parkingLots.json');

// Endpoint to get all parking lots
app.get('/api/parking-lots', (req, res) => {
  res.json(parkingLots);
});

// Endpoint to suggest parking
app.post('/api/suggest-parking', (req, res) => {
  const { classLocation, time } = req.body;
  // Simple logic to filter parking lots based on availability
  const availableLots = parkingLots.filter(
    (lot) => lot.occupancyRates[time] && lot.occupancyRates[time] < 0.8
  );
  res.json(availableLots);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});