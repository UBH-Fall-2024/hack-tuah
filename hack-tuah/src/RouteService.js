// RouteService.js
import axios from 'axios';

// Access the API key from environment variables
const apiKey = "5b3ce3597851110001cf6248808eba924d254158a9380bd3e2e314c1";

console.log('API Key:', apiKey);

export const getWalkingRoute = async (start, end) => {
  const response = await axios.get(
    'https://api.openrouteservice.org/v2/directions/foot-walking',
    {
      params: {
        api_key: apiKey,
        start: `${start[1]},${start[0]}`, // Format as "lng,lat"
        end: `${end[1]},${end[0]}`,       // Format as "lng,lat"
      },
    }
  );
  return response.data;
};