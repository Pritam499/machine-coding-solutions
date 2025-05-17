import React, { useState, useEffect } from 'react';

// Child component: shows weather or an error
function WeatherDisplay({ weather, location }) {
  return (
    <div>
      <h2>Weather in {location}</h2>
      <p>🌡️ {weather.current_weather.temperature}°C</p>
      <p>🌬️ Wind: {weather.current_weather.windspeed} km/h</p>
    </div>
  );
}

export default function WeatherApp() {
  const [query, setQuery]       = useState('');         // city name input
  const [location, setLocation] = useState('');         // resolved city name
  const [weather, setWeather]   = useState(null);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  // Fetch weather for given coords
  const fetchWeather = async (lat, lon, name) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast` +
        `?latitude=${lat}&longitude=${lon}` +
        `&current_weather=true`
      );
      if (!res.ok) throw new Error('Failed to fetch weather');
      const data = await res.json();
      setWeather(data);
      setLocation(name);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit: geocode city → fetch weather
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    // Geocode the city name
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`
      );
      if (!geoRes.ok) throw new Error('Failed to geocode city');
      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }
      const { latitude, longitude, name, country } = geoData.results[0];
      // Fetch weather for those coords
      await fetchWeather(latitude, longitude, `${name}, ${country}`);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setLocation('');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>

      {/* Search form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading…</p>}
      {error   && <p style={{ color: 'red' }}>{error}</p>}
      {weather && <WeatherDisplay weather={weather} location={location} />}
    </div>
  );
}
