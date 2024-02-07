import React, { useState } from 'react';
import './w.css';
import Axios from 'axios';

const API_key = 'e6a0a706f92d32b6e8a1fcbbd8bf14cd';



const Weather = () => {
  const [cityName, setCityName] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}`);
      setData(response.data);
    } catch (err) {
      setError('City not found. Please enter a valid city name.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='App'>
      <h1 className='Title'>WEATHER FORECASTING</h1>
      <div className='container'>
        <h3>Search for a City</h3>
        <div className='input-container'>
          <input
            type="text"
            className='input'
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="City Name"
          />
          <button className='button' onClick={fetchData} disabled={loading}>
            FETCH
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {data && (
          <div>
            <h2>{data.name}</h2>
            <p>Temperature: {Math.round(data.main.temp - 273.15)}°C</p>
            <p>{getWeatherEmoji(data.weather[0].main)}</p>
            <p>Weather: {data.weather[0].main}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const getWeatherEmoji = (weather) => {
  switch (weather) {
    case 'Clear':
      return '☀️';
    case 'Clouds':
      return '☁️';
    case 'Rain':
      return '🌧️';
    case 'Thunderstorm':
      return '⛈️';
    case 'Snow':
      return '❄️';
    case 'Mist':
      return '🌫️';
    case 'Fog':
      return '🌁';
    case 'Haze':
      return '🌫️';
    case 'Dust':
      return '🌪️';
    case 'Smoke':
      return '🌫️';
    default:
      return '';
  }
}

export default Weather;