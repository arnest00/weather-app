import { getIcon } from './getIcon';

export async function getForecast(q, forecastSetter) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_API_KEY}&units=imperial&q=${q}`);
    const data = await response.json();
    const newForecast = { 
      city: data.name,
      desc: data.weather[0].description,
      temp: parseInt(data.main.temp),
      icon: getIcon(data.weather[0].main),
      humidity: data.main.humidity,
      windSpeed: data.wind.speed
    };
    forecastSetter(newForecast);
    console.log('Weather data fetched!', q);
  } catch (error) {
    console.error(error);;
  };
};