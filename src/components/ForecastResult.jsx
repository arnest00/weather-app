import React from 'react';

function ForecastResult({ forecast, unit }) {
  let classes = 'result visibility-hidden';
  if (Object.keys(forecast).length !== 0) {
    classes = 'result';
  };

  if (forecast.error) return <div className={classes}><span className='result-name'>{forecast.error}</span></div>;

  return (
    <div className={classes}>
      <span className='result-name'>{forecast.country ? `${forecast.city}, ${forecast.country}` : forecast.city}</span>
      <span className='result-temp'>
        <span className='result-temp-num'>{forecast.temp}</span>
        <span className='result-temp-sym'>&deg;</span>
        <span className='result-temp-scale'>{unit === 'imperial' ? 'F' : 'C'}</span>
      </span>

      <span className='result-icon-container'>{forecast.icon ? <ion-icon name={forecast.icon}></ion-icon> : ''}</span>
      <span className='result-desc'>{forecast.desc}</span>

      <span className='result-humidity'>Humidity: {forecast.humidity}%</span>
      <span className='result-wind-spd'>Wind: {forecast.windSpeed}{unit === 'imperial' ? 'mph' : 'mps'}</span>
    </div>
  );
};

export default ForecastResult;