import { getIcon } from './getIcon';

export async function getForecast(q, unit, forecastSetter) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_API_KEY}&units=${unit}&q=${q}`);
    
    if (response.status === 404) return forecastSetter({ error: 'Sorry, we couldn\'t find that city.' })

    const data = await response.json();
    const newForecast = { 
      city: data.name,
      country: data.sys.country,
      desc: data.weather[0].description,
      temp: parseInt(data.main.temp),
      icon: getIcon(data.weather[0].main),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
    };
    forecastSetter(newForecast);
  } catch (error) {
    console.error(error);
  };
};