import React, { useState, useEffect } from 'react';
import ForecastInput from './ForecastInput';
import ForecastResult from './ForecastResult';
import useDebounce from './useDebounce';
import { getForecast } from '../utils/getForecast';

function Forecast(props) {
  const [ departureCity, setDepartureCity ] = useState('');
  const [ arrivalCity, setArrivalCity ] = useState('');
  const [ departureForecast, setDepartureForecast ] = useState({});
  const [ arrivalForecast, setArrivalForecast ] = useState({});

  const debouncedDeparture = useDebounce(departureCity);
  const debouncedArrival = useDebounce(arrivalCity);

  useEffect(() => {
    if (debouncedDeparture || debouncedArrival) {
      if (debouncedDeparture && !departureForecast.city) getForecast(debouncedDeparture, setDepartureForecast);
      if (debouncedArrival && !arrivalForecast.city) getForecast(debouncedArrival, setArrivalForecast);
    } else {
      setDepartureCity('');
      setArrivalCity('');
    };
  }, [ debouncedDeparture, debouncedArrival ]);

  function handleFocus(e, citySetter, forecastSetter) {
    e.target.value = '';
    citySetter('');
    forecastSetter({});
  };

  return (
    <React.Fragment>
      <div id='inputs-container'>
        <ForecastInput 
          name='departure'
          onChange={e => setDepartureCity(e.target.value)}
          onFocus={e => handleFocus(e, setDepartureCity, setDepartureForecast)}
        />
        <ForecastInput 
          name='arrival'
          onChange={e => setArrivalCity(e.target.value)}
          onFocus={e => handleFocus(e, setArrivalCity, setArrivalForecast)}
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