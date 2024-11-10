// MapView.js
import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { getWalkingRoute } from './RouteService'; // Import the getWalkingRoute function

// Import custom marker images
import markerGreen from './icons/marker-green.png';
import markerYellow from './icons/marker-yellow.png';
import markerRed from './icons/marker-red.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png'; // Use the default shadow

// Fix for default icon issues with Webpack
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const greenIcon = new L.Icon({
  iconUrl: markerGreen,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const yellowIcon = new L.Icon({
  iconUrl: markerYellow,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = new L.Icon({
  iconUrl: markerRed,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapView = ({ parkingLots, classLocation }) => {
  const [route, setRoute] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);
  const [selectedParkingLot, setSelectedParkingLot] = useState(null);

  useEffect(() => {
    const fetchRoute = async () => {
      if (selectedParkingLot) {
        try {
          const data = await getWalkingRoute(selectedParkingLot.coordinates, classLocation);
          const coordinates = data.features[0].geometry.coordinates.map(
            (coord) => [coord[1], coord[0]] // Convert from [lng, lat] to [lat, lng]
          );
          setRoute(coordinates);

          // Extract distance and duration
          const distance = data.features[0].properties.summary.distance; // in meters
          const duration = data.features[0].properties.summary.duration; // in seconds

          setRouteInfo({ distance, duration });
        } catch (error) {
          console.error('Error fetching route:', error);
        }
      } else {
        setRoute(null);
        setRouteInfo(null);
      }
    };
    fetchRoute();
  }, [selectedParkingLot, classLocation]);

  return (
    <MapContainer center={classLocation} zoom={15} style={{ height: '80vh', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {parkingLots.map((lot, index) => {
        let icon;
        const occupancyRate = lot.occupancy; // Assuming occupancy is between 0 and 1

        // Assign rank based on index (0-based)
        const rank = index + 1; // So first lot is rank 1

        if (rank === 1 && occupancyRate <= 0.7) {
          icon = greenIcon;
        } else if (rank === 1 && occupancyRate > 0.7) {
          icon = yellowIcon;
        } else if (rank === 2) {
          icon = yellowIcon;
        } else {
          icon = redIcon;
        }

        return (
          <Marker
            key={lot.id}
            position={lot.coordinates}
            icon={icon}
            eventHandlers={{
              click: () => {
                setSelectedParkingLot(lot);
              },
            }}
          >
            <Popup>
              <strong>{lot.name}</strong>
              <br />
              Occupancy: {(occupancyRate * 100).toFixed(0)}%
              <br />
              Distance: {(lot.distance / 1000).toFixed(2)} km
              <br />
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${lot.coordinates[0]},${lot.coordinates[1]}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Navigate to Lot
              </a>
            </Popup>
          </Marker>
        );
      })}

      {/* Render class location marker */}
      <Marker position={classLocation}>
        <Popup>Your Class Location</Popup>
      </Marker>

      {/* Render the route polyline if route is available */}
      {route && <Polyline positions={route} color="blue" />}

      {/* Display route information if available */}
      {routeInfo && (
        <div
          className="route-info"
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <p>
            Distance: {(routeInfo.distance / 1000).toFixed(2)} km<br />
            Estimated Time: {(routeInfo.duration / 60).toFixed(0)} minutes
          </p>
        </div>
      )}
    </MapContainer>
  );
};

export default MapView;
