// server.js
const express = require('express');
const cors = require('cors');
const haversine = require('haversine-distance');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const parkingLots = require('./data/parkingLots.json');

app.post('/api/suggest-parking', (req, res) => {
  const { classLocation, time } = req.body;
  const classLatLng = { lat: parseFloat(classLocation[0]), lng: parseFloat(classLocation[1]) };

  // Map occupancy and filter available lots
  const availableLots = parkingLots.map((lot) => {
    const occupancy = lot.occupancyRates[time];
    return { ...lot, occupancy: occupancy !== undefined ? occupancy : 0 };
  }).filter(lot => lot.occupancy < 0.8);

  // Calculate distance to each lot
  const lotsWithDistance = availableLots.map((lot) => {
    const lotLatLng = { lat: lot.coordinates[0], lng: lot.coordinates[1] };
    const distance = haversine(classLatLng, lotLatLng); // Distance in meters
    return { ...lot, distance };
  });

  // Sort by distance
  lotsWithDistance.sort((a, b) => a.distance - b.distance);

  // Get the closest 3 lots
  const closestLots = lotsWithDistance.slice(0, 3);

  res.json(closestLots);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
