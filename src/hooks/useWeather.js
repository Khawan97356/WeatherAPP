import { useState, useEffect } from 'react';
import { 
  getCurrentWeather, 
  getCurrentWeatherByCoords, 
  getWeatherForecast,
  searchCities
} from '../services/weatherAPI';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('C');

  const fetchWeatherCity = async (city) => {
    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getWeatherForecast(city)
      ]);

      setCurrentWeather(weatherData);
      setForecast(forecastData);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const weatherData = await getCurrentWeatherByCoords(
            coords.latitude,
            coords.longitude
          );

          setCurrentWeather(weatherData);

          const forecastData = await getWeatherForecast(weatherData.name);
          setForecast(forecastData);

        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unexpected error');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'C' ? 'F' : 'C'));
  };

  useEffect(() => {
    fetchWeatherCity('New York');
  }, []);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    unit,
    fetchWeatherCity,
    fetchWeatherByLocation,
    toggleUnit, 
    searchCities,
  };
};

