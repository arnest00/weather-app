import React from 'react';

function ForecastResult(props) {
  return (
    <div className='result'>
      <span className='result-desc'></span>
      <span className='result-temp'>
        <span className='result-temp-num'></span>
        <span className='result-temp-sym'>&deg;</span>
        <span className='result-temp-scale'>F</span>
      </span>

      <span className='result-icon-container'></span>
      <span className='result-humidity'></span>
      <span className='result-wind-spd'></span>
    </div>
  );
};

export default ForecastResult;