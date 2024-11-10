// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapView from './MapView';

function App() {
  const [parkingLots, setParkingLots] = useState([]);
  const [classLocation, setClassLocation] = useState(null); // No default coordinates
  const [time, setTime] = useState('08:00');
  const [searchTriggered, setSearchTriggered] = useState(false);

  const locationMap = {
    'Academic Center': [43.009176196207314, -78.78425355273131],
    'Alfiero Center': [42.99983919841796, -78.78709985990022],
    'Alumni Arena': [43.00028140946928, -78.78141399713014],
    'Baird Hall': [43.00007436287878, -78.78456054455603],
    'Baldy Hall': [43.00031947114051, -78.78691048265362],
    'Bell Hall': [43.00155712892937, -78.78714626298064],
    'Bonner Hall': [43.00157392993516, -78.78817112005089],
    'Capen Hall': [43.00082050650034, -78.78960519058849],
    'Center for the Arts': [43.0010875142277, -78.78301544085129],
    'Clemens Hall': [43.00048064370772, -78.78499187584528],
    'Cooke Hall': [42.9999482503499, -78.79143376043541],
    'Davis Hall': [43.00274492491762, -78.78741643662092],
    'Fronczak Hall': [43.001246682473564, -78.79121203543754],
    'Furnas Hall': [43.00192620055009, -78.78712135989994],
    'Hochstetter Hall': [42.99996362048589, -78.79078329821455],
    'Jacobs Management Center': [42.99960358299845, -78.78703997951921],
    'Jarvis Hall': [43.002329832709314, -78.7870951498888],
    'Ketter Hall': [43.00267204408211, -78.78820632760285],
    'Knox Hall': [43.00098098119273, -78.78785956209214],
    'Lockwood Memorial Library': [43.00031010202525, -78.7859376561955],
    'Mathematics Building': [43.00121573563624, -78.79277300408025],
    'NSC (Natural Sciences Complex)': [43.00074257867137, -78.79153590698745],
    'Norton Hall': [43.00108389436157, -78.78855732081351],
    "O'Brian Hall": [43.00036496457164, -78.78800375777145],
    'Park Hall': [42.99979559477321, -78.78794766686461],
    'Slee Hall': [43.000413317961474, -78.78397813366642],
    'Student Union': [43.00116972710527, -78.78626912571632],
    'Talbert Hall': [43.00069221040609, -78.79039808830485],
  };

  useEffect(() => {
    const fetchParkingLots = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/suggest-parking', {
          classLocation,
          time,
        });
        setParkingLots(response.data);
      } catch (error) {
        console.error('Error fetching parking lots:', error);
      }
    };
    if (searchTriggered && classLocation) {
      fetchParkingLots();
      setSearchTriggered(false);
    }
  }, [searchTriggered, classLocation, time]);

  const handleClassLocationChange = (event) => {
    setClassLocation(locationMap[event.target.value] || null);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <div>
      <h1>Campus Parking Finder</h1>
      <div>
        <label>
          Class Location:
          <select onChange={handleClassLocationChange}>
            <option value="">Select a building</option>
            <option value="Academic Center">Academic Center</option>
            <option value="Alfiero Center">Alfiero Center</option>
            <option value="Alumni Arena">Alumni Arena</option>
            <option value="Baird Hall">Baird Hall</option>
            <option value="Baldy Hall">Baldy Hall</option>
            <option value="Bell Hall">Bell Hall</option>
            <option value="Bonner Hall">Bonner Hall</option>
            <option value="Capen Hall">Capen Hall</option>
            <option value="Center for the Arts">Center for the Arts</option>
            <option value="Clemens Hall">Clemens Hall</option>
            <option value="Cooke Hall">Cooke Hall</option>
            <option value="Davis Hall">Davis Hall</option>
            <option value="Fronczak Hall">Fronczak Hall</option>
            <option value="Furnas Hall">Furnas Hall</option>
            <option value="Hochstetter Hall">Hochstetter Hall</option>
            <option value="Jacobs Management Center">Jacobs Management Center</option>
            <option value="Jarvis Hall">Jarvis Hall</option>
            <option value="Ketter Hall">Ketter Hall</option>
            <option value="Knox Hall">Knox Hall</option>
            <option value="Lockwood Memorial Library">Lockwood Memorial Library</option>
            <option value="Mathematics Building">Mathematics Building</option>
            <option value="NSC (Natural Sciences Complex)">NSC (Natural Sciences Complex)</option>
            <option value="Norton Hall">Norton Hall</option>
            <option value="O'Brian Hall">O'Brian Hall</option>
            <option value="Park Hall">Park Hall</option>
            <option value="Slee Hall">Slee Hall</option>
            <option value="Student Union">Student Union</option>
            <option value="Talbert Hall">Talbert Hall</option>
          </select>
        </label>
        <label>
          Arrival Time:
          <input type="time" value={time} onChange={handleTimeChange} />
        </label>
        <button onClick={() => setSearchTriggered(true)}>Go</button>
      </div>
      {classLocation && <MapView parkingLots={parkingLots} classLocation={classLocation} />}
    </div>
  );
}

export default App;