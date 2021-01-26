import React, { useState, useEffect } from 'react';
import ForecastForm from './ForecastForm';
import ForecastResult from './ForecastResult';
// import useDebounce from './useDebounce';
// import { getForecast } from '../utils/getForecast';
import { getForecastTest } from '../utils/getForecastTest';

function Forecast(props) {
  const [ departureCity, setDepartureCity ] = useState('');
  const [ arrivalCity, setArrivalCity ] = useState('');
  const [ departureForecast, setDepartureForecast ] = useState({});
  const [ arrivalForecast, setArrivalForecast ] = useState({});

  useEffect(() => {
    if (Object.keys(departureForecast).length !== 0 && Object.keys(arrivalForecast).length !== 0) {
      console.log('Both forecasts set!');
    };
  }, [ departureForecast, arrivalForecast ]);

  function handleChange(e, citySetter) {
    const newDestination = [];
    for (let i = 0; i < 3; i++) {
      const str = e.target.parentNode.parentNode.parentNode[i].value;
      if (str.length > 0) newDestination.push(str.trim());
    };
    citySetter(newDestination.join(','));
  }

  function handleSubmit(e, currentCity, forecastSetter) {
    e.preventDefault();

    getForecastTest(currentCity, forecastSetter);
  };

  return (
    <React.Fragment>
      <div id='forms-container'>
        <ForecastForm 
          name='departure'
          onSubmit={e => handleSubmit(e, departureCity, setDepartureForecast)}
          onChange={e => handleChange(e, setDepartureCity)}
        />
        <ForecastForm 
          name='arrival'
          onSubmit={e => handleSubmit(e, arrivalCity, setArrivalForecast)}
          onChange={e => handleChange(e, setArrivalCity)}
        />
      </div>
      <div id='results-container'>
        <ForecastResult 
          forecast={departureForecast}
        />
        <ForecastResult 
          forecast={arrivalForecast}
        />
      </div>
    </React.Fragment>
  );
};

export default Forecast;