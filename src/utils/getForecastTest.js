export function getForecastTest(q, forecastSetter) {
  const newForecast = { 
    city: q,
    desc: 'Test description',
    temp: parseInt(Math.floor((Math.random() * 20) + 60)),
    icon: 'sunny-sharp',
    humidity: `${Math.floor((Math.random() * 20) + 40)}`,
    windSpeed: `${Math.floor((Math.random() * 3) + 1)}`
  };
  forecastSetter(newForecast);
  console.log('Weather data fetched!');
};