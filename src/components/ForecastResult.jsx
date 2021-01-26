import React from 'react';

function ForecastResult({ forecast }) {
  let classes = 'result visibility-hidden';
  if (Object.keys(forecast).length !== 0) {
    classes = 'result';
  };

  return (
    <div className={classes}>
      <span className='result-desc'>{forecast.desc}</span>
      <span className='result-temp'>
        <span className='result-temp-num'>{forecast.temp}</span>
        <span className='result-temp-sym'>&deg;</span>
        <span className='result-temp-scale'>{'F'}</span>
      </span>

      <span className='result-icon-container'>{forecast.icon ? <ion-icon name={forecast.icon}></ion-icon> : ''}</span>
      <span className='result-humidity'>Humidity: {forecast.humidity}%</span>
      <span className='result-wind-spd'>Wind: {forecast.windSpeed}{'mph'}</span>
    </div>
  );
};

export default ForecastResult;