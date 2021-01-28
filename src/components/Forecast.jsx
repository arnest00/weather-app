import React, { useState, useEffect } from 'react';
import ForecastForm from './ForecastForm';
import ForecastResult from './ForecastResult';
import ForecastFeedback from './ForecastFeedback';
import ForecastButton from './ForecastButton';
// import useDebounce from './useDebounce';
import { getForecast } from '../utils/getForecast';
// import { getForecastTest } from '../utils/getForecastTest';
import { getFeedback } from '../utils/getFeedback';

function Forecast(props) {
  const [ departureCity, setDepartureCity ] = useState('');
  const [ arrivalCity, setArrivalCity ] = useState('');
  const [ departureForecast, setDepartureForecast ] = useState({});
  const [ arrivalForecast, setArrivalForecast ] = useState({});
  const [ feedback, setFeedback ] = useState('');
  const [ unit, setUnit ] = useState('imperial');

  useEffect(() => {
    if (Object.keys(departureForecast).length !== 0 && Object.keys(arrivalForecast).length !== 0) {
      if (!('error' in departureForecast) && !('error' in arrivalForecast)) {
        const feedback = getFeedback(departureForecast, arrivalForecast);
        setFeedback(feedback);
      };
    };
  }, [ departureForecast, arrivalForecast ]);

  function handleOption(unit) {
    setDepartureForecast({});
    setArrivalForecast({});
    setFeedback('');

    setUnit(unit);
  };

  function handleClear() {
    setDepartureCity('');
    setArrivalCity('');
    setDepartureForecast({});
    setArrivalForecast({});
    setFeedback('');
  };

  function handleChange(e, citySetter) {
    const newDestination = [];
    for (let i = 0; i < 3; i++) {
      const str = e.target.parentNode.parentNode.parentNode[i].value;
      if (str.length > 0) newDestination.push(str.trim());
    };
    citySetter(newDestination.join(','));
  };

  function handleSubmit(e, currentCity, unit, forecastSetter) {
    e.preventDefault();

    getForecast(currentCity, unit, forecastSetter);
    // getForecastTest(currentCity, unit, forecastSetter);
  };

  return (
    <React.Fragment>
      <div id="options-container">
        <ForecastButton 
          content='C' 
          className='option-button' 
          onClick={e => handleOption('metric')}
          selected={unit === 'metric' ? 'selected' : ''}
        />
        <ForecastButton 
          content='F' 
          className='option-button' 
          onClick={e => handleOption('imperial')}
          selected={unit === 'imperial' ? 'selected' : ''}
        />
        <ForecastButton 
          content={<ion-icon name='refresh-sharp'></ion-icon>}
          className='clear-button'
          onClick={handleClear}
        />
      </div>

      <div id='forms-container'>
        <ForecastForm 
          name='departure'
          onSubmit={e => handleSubmit(e, departureCity, unit, setDepartureForecast)}
          onChange={e => handleChange(e, setDepartureCity)}
        />
        <ForecastForm 
          name='arrival'
          onSubmit={e => handleSubmit(e, arrivalCity, unit, setArrivalForecast)}
          onChange={e => handleChange(e, setArrivalCity)}
        />
      </div>

      <div id='results-container'>
        <ForecastResult forecast={departureForecast} unit={unit} />
        <ForecastResult forecast={arrivalForecast} unit={unit} />
      </div>

      <ForecastFeedback feedback={feedback} />
    </React.Fragment>
  );
};

export default Forecast;