import React, { useState, useEffect } from 'react';
import ForecastForm from './ForecastForm';
import ForecastResult from './ForecastResult';
import ForecastFeedback from './ForecastFeedback';
import ForecastButton from './ForecastButton';
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
    setUnit(unit);

    if (departureCity)
      getForecast(departureCity, unit, setDepartureForecast);
      // getForecastTest(departureCity, unit, setDepartureForecast);
    if (arrivalCity)
      getForecast(arrivalCity, unit, setArrivalForecast);
      // getForecastTest(arrivalCity, unit, setArrivalForecast);
  };

  function handleClear() {
    setDepartureCity('');
    setArrivalCity('');
    setDepartureForecast({});
    setArrivalForecast({});
    setFeedback('');

    document.querySelectorAll('.form-container').forEach(form => form.reset());
  };

  function handleSubmit(e, unit, citySetter, forecastSetter) {
    e.preventDefault();

    let newDestination = [];
    for (let i = 0; i < 3; i++) {
      const str = e.target[i].value;
      if (str.length > 0) newDestination.push(str.trim());
    };
    if (e.target[1].value.length > 0) newDestination.push('us');
    newDestination = newDestination.join(',');

    citySetter(newDestination);
    getForecast(newDestination, unit, forecastSetter);
    // getForecastTest(newDestination, unit, forecastSetter);
  };

  return (
    <React.Fragment>
      <h1 id='header'>Should You Bring a Jacket?</h1>

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
          onSubmit={e => handleSubmit(e, unit, setDepartureCity, setDepartureForecast)}
        />
        <ForecastForm 
          name='arrival'
          onSubmit={e => handleSubmit(e, unit, setArrivalCity, setArrivalForecast)}
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