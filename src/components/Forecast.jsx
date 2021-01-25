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

  // const debouncedDeparture = useDebounce(departureCity);
  // const debouncedArrival = useDebounce(arrivalCity);

  // useEffect(() => {
    // if (debouncedDeparture || debouncedArrival) {
      // if (debouncedDeparture) getForecast(debouncedDeparture, setDepartureForecast);
      // if (debouncedArrival) getForecast(debouncedArrival, setArrivalForecast);
    // };
  // }, [ debouncedDeparture, debouncedArrival ]);

  function handleFocus(e, citySetter, forecastSetter) {
    e.target.value = '';
    forecastSetter({});
    citySetter('');
  };

  function handleSubmit(e, forecastSetter) {
    e.preventDefault();

    let cityStr = `${e.target[0].value},`;
    let stateStr = e.target[1].value.length > 1 ? `${e.target[1].value},` : '';
    let countryStr = `${e.target[2].value}`;
    const newDestination = cityStr + stateStr + countryStr;
    getForecastTest(newDestination, forecastSetter);
  };

  return (
    <React.Fragment>
      <div id='forms-container'>
        <ForecastForm 
          name='departure'
          onFocus={e => handleFocus(e, setDepartureCity, setDepartureForecast)}
          onSubmit={e => handleSubmit(e, setDepartureForecast)}
        />
        <ForecastForm 
          name='arrival'
          onFocus={e => handleFocus(e, setArrivalCity, setArrivalForecast)}
          onSubmit={e => handleSubmit(e, setArrivalForecast)}
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