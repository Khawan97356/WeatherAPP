export const getWeatherIcon = (weather) => {
  const iconMap = {
    'Clear': '☀️', // Clear sky (day)
    'Clouds': '☁️', // Cloudy
    'Rain': '🌧️', // Rain
    'Drizzle': '🌦️', // Drizzle
    'Thunderstorm': '⛈️', // Thunderstorm
    'Snow': '❄️', // Snow
    'Mist': '🌫️', // Mist
    'Fog': '🌫️', // Fog
    'Haze': '🌫️', // Haze
    'dust': '🌪️', // Dust
    'sand': '🏜️', // Sand
    'ash': '🌋', // Ash
    'squall': '💨', // Squall
    'tornado': '🌪️', // Tornado
  };

  return iconMap[weather.main] || 'Cloud'; // Default icon for unknown weather
};

export const formatTemperature = (temp, unit) => {
  if (unit === 'F') {
    return Math.round((temp * 9) / 5 + 32); // Convert Celsius to Fahrenheit
  }
  return Math.round(temp); // Return Celsius as is
};

export const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
}; 

export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' });
};

export const getWindDirection = (deg) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg / 22.5) % 16];
};
