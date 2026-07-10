const API_KEY = '426e328d01dd91eeb20067c55470e17c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

/* -------------------- CURRENT WEATHER BY CITY -------------------- */
export const getCurrentWeather = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City "${city}" not found.`);
      }
      if (response.status === 401) {
        throw new Error("Invalid API Key.");
      }
      throw new Error("Weather service unavailable.");
    }

    const data = await response.json();

    if (!data.dt) {
      data.dt = Math.floor(Date.now() / 1000);
    }

    return data;

  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("Network error.");
    }
    throw error;
  }
};

/* -------------------- CURRENT WEATHER BY COORDS -------------------- */
export const getCurrentWeatherByCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API Key.");
      }
      throw new Error("Weather service unavailable.");
    }

    const data = await response.json();

    if (!data.dt) {
      data.dt = Math.floor(Date.now() / 1000);
    }

    return data;

  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("Network error.");
    }
    throw error;
  }
};

/* -------------------- 5-DAY / 3-HOUR FORECAST -------------------- */
export const getWeatherForecast = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City "${city}" not found.`);
      }
      if (response.status === 401) {
        throw new Error("Invalid API Key.");
      }
      throw new Error("Weather service unavailable.");
    }

    return await response.json();

  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("Network error.");
    }
    throw error;
  }
};

/* -------------------- CITY AUTOCOMPLETE (GEOCODING API) -------------------- */
export const searchCities = async (query) => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid API Key.");
      } else {
        throw new Error("Weather service unavailable.");
      }
      
    }

    const data = await response.json();

    return data.map((city) => ({
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      country: city.country,
      state: city.state || "",
    }));

  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("Network error.");
    }
    throw error;
  }
};
