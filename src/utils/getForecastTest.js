import { getIcon } from './getIcon';

export function getForecastTest(q, forecastSetter) {
  try {
    const newForecast = { 
      city: q,
      desc: 'Test description',
      temp: parseInt(Math.floor((Math.random() * 20) + 60)),
      icon: 'sunny-sharp',
      humidity: '50',
      windSpeed: '1'
    };
    forecastSetter(newForecast);
    console.log('Weather data fetched!');
  } catch (error) {
    console.error(error);;
  };
};