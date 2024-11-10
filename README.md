[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/_U2QbDVP)



# Campus Parking Finder

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Data Sources](#data-sources)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Introduction

**Campus Parking Finder** is a web application designed to help students and faculty find the most suitable parking lots on campus based on their class location, arrival time, and parking lot occupancy rates. The application provides real-time suggestions of the closest available parking lots, displays walking routes to the destination, and offers building-to-building navigation.

## Features

- **Parking Lot Suggestions**: Recommends the top three closest parking lots based on proximity and occupancy rates.
- **Real-Time Occupancy Rates**: Displays occupancy percentages for each parking lot.
- **Color-Coded Markers**: Uses green, yellow, and red markers to indicate parking lot availability.
- **Walking Routes**: Shows the walking route from the selected parking lot to the class location.
- **Building-to-Building Directions**: Provides walking directions between any two campus buildings.
- **Estimated Distance and Time**: Displays the distance and estimated walking time for the route.
- **Interactive Map**: Utilizes an interactive map with markers and popups for enhanced user experience.
- **Google Maps Integration**: Includes links to navigate to parking lots and class locations via Google Maps.

## Demo

[Include a link to a live demo or screenshots of the application]

## Technologies Used

- **Frontend**:
  - React.js
  - Leaflet (React-Leaflet)
  - Axios

- **Backend**:
  - Node.js
  - Express.js

- **APIs**:
  - OpenRouteService API (for routing and directions)

- **Others**:
  - haversine-distance (for calculating distances between coordinates)
  - CSS for styling

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- Node.js and npm installed on your machine.
- An OpenRouteService API key. You can obtain one by signing up at [OpenRouteService](https://openrouteservice.org/dev/#/signup).

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/campus-parking-finder.git
   cd campus-parking-finder
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set Up Environment Variables**

   - **Backend**:

     - Create a `.env` file in the `backend` directory.
     - Add any necessary environment variables (if applicable).

   - **Frontend**:

     - Create a `.env` file in the `frontend` directory.
     - Add your OpenRouteService API key:

       ```
       REACT_APP_ORS_API_KEY=your_openrouteservice_api_key_here
       ```

5. **Start the Backend Server**

   ```bash
   cd ../backend
   node server.js
   ```

6. **Start the Frontend Development Server**

   ```bash
   cd ../frontend
   npm start
   ```

   The application should now be running at `http://localhost:3000`.

## Usage

1. **Select Class Location**

   - Use the dropdown menu to select your class or destination building.

2. **Select Arrival Time**

   - Choose your expected arrival time using the time picker.

3. **Get Parking Suggestions**

   - Click the "Go" button to fetch the top three parking lot suggestions based on your input.

4. **View Parking Lots on the Map**

   - The map will display markers for the suggested parking lots, color-coded based on availability.
   - Click on a marker to view parking lot details, occupancy rate, and a link to navigate via Google Maps.

5. **View Walking Route**

   - Click on a parking lot marker to select it.
   - The map will display the walking route from the parking lot to your class location.
   - An information box will show the estimated distance and walking time.

6. **Building-to-Building Directions**

   - Optionally, select a starting building to get directions from one building to another.
   - The map will update to show the route between the two buildings.

## Project Structure

```
campus-parking-finder/
├── backend/
│   ├── data/
│   │   └── parkingLots.json
│   ├── server.js
│   ├── package.json
│   └── ... (other backend files)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MapView.js
│   │   │   └── ... (other components)
│   │   ├── App.js
│   │   ├── RouteService.js
│   │   ├── index.js
│   │   └── ... (other frontend files)
│   ├── public/
│   ├── package.json
│   └── ... (other frontend files)
├── README.md
└── ... (other project files)
```

## API Endpoints

### **Backend Server (`server.js`)**

- **GET `/api/parking-lots`**

  - Returns a list of all parking lots.

- **POST `/api/suggest-parking`**

  - **Request Body**:

    ```json
    {
      "classLocation": [latitude, longitude],
      "time": "HH:MM"
    }
    ```

  - **Response**:

    Returns an array of the top three suggested parking lots based on proximity and occupancy.

    ```json
    [
      {
        "id": 1,
        "name": "Parking Lot A",
        "coordinates": [latitude, longitude],
        "capacity": 200,
        "occupancy": 0.5,
        "distance": 500
      },
      ...
    ]
    ```

## Data Sources

- **Parking Lots Data**: Stored in `backend/data/parkingLots.json`, includes information about each parking lot's location, capacity, and occupancy rates at different times.

- **Building Locations**: Defined in the `locationMap` object in `App.js`, mapping building names to their coordinates.

## Future Enhancements

- **Real-Time Occupancy Data**: Integrate with campus systems to fetch live parking occupancy data.
- **User Accounts**: Allow users to save preferences, favorite parking lots, and receive personalized suggestions.
- **Public Transportation Options**: Provide alternative routes and suggestions using campus shuttles or public transit.
- **Mobile App**: Develop a mobile application for on-the-go access.
- **Accessibility Improvements**: Enhance the application for users with disabilities.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Your Changes**

   ```bash
   git commit -m "Add your message here"
   ```

4. **Push to the Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

## License

[MIT License](LICENSE)

## Acknowledgments

- **OpenRouteService** for providing the routing API.
- **Leaflet** and **React-Leaflet** for the interactive map components.
- **University Campus Map** for building locations and parking lot data.





![image](https://github.com/user-attachments/assets/a457a785-b247-4465-ad65-450669e4251c)
