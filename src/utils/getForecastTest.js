export function getForecastTest(q, unit, forecastSetter) {
  let qStr = q.split(' ');
  for (let e of qStr) {
    qStr[qStr.indexOf(e)] = e.charAt(0).toUpperCase() + e.slice(1);
  };
  qStr = qStr.join(' ');

  const newForecast = { 
    city: qStr.split(',').shift(),
    unit: unit,
    desc: 'Test description',
    temp: parseInt(Math.floor((Math.random() * 20) + 60)),
    icon: 'sunny-sharp',
    humidity: `${Math.floor((Math.random() * 20) + 40)}`,
    windSpeed: `${Math.floor((Math.random() * 3) + 1)}`
  };
  forecastSetter(newForecast);
};