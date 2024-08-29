import defaultWeather from "../Images/weather default.png"; 
import sunny from "../Images/weather sunny.png"; 
import cloudy from "../Images/weather cloudy.png"; 
import fog from "../Images/weather fog.png";  
import rainy from "../Images/rainy.png";
import snow from "../Images/weather snow.png";
import React, { useState } from 'react';
import axios from 'axios';
import "../components/Climate.css";

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };
  
  const fetchWeatherData = async () => { 
    try {
      const response = await axios.get(`http://localhost:7878/climate?city=${city}`); 
      console.log(response); 
      if (response.data.data.success == false) {
        setWeatherData(null); 
        setError('Failed to fetch weather data');
      } else {
        setWeatherData(response.data.data); 
        setError(null);
      }
      
    } catch (error) {
      setError('Failed to fetch weather data');
      setWeatherData(null);
    }
  };

  
  const getWeatherImage = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('sunny')) {
      return sunny;
    } else if (desc.includes('cloudy')) {
      return cloudy;
    } else if (desc.includes('rain') || desc.includes('rainy')) {
      return rainy;
    } else if (desc.includes('snow')) {
      return snow;
    } else if (desc.includes('fog')) {
      return fog;
    } else {
      return defaultWeather; 
    }
  };

  return (
    <div className="App">
      <h1>Weather Information</h1> 
      <div className="inputButton">
      <input
        type="text"
        value={city}
        onChange={handleInputChange}
        placeholder="Enter city"
      />
      <button onClick={fetchWeatherData}>Get Weather</button>
      
      </div>
     
      {weatherData && (
        <div className="weather-info">
          <h2>Weather in {weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temperature}°C</p>
          <p>Weather: {weatherData.current.weather_descriptions[0]}</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind Speed: {weatherData.current.wind_speed} km/h</p>
          <img 
            src={getWeatherImage(weatherData.current.weather_descriptions[0])} 
            alt={weatherData.current.weather_descriptions[0]}
            className="weather-image"
          />
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;

