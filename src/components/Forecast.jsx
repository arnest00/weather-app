import React, { useState } from 'react';
import ForecastInput from './ForecastInput';
import ForecastResult from './ForecastResult';

function Forecast(props) {
  const [ departure, setDeparture ] = useState(
    {
      city: '',
      desc: '',
      temp: '',
      icon: '',
      humidity: '',
      windSpeed: ''
    }
  );
  const [ arrival, setArrival ] = useState(
    {
      city: '',
      desc: '',
      temp: '',
      icon: '',
      humidity: '',
      windSpeed: ''
    }
  );

  const handleChange = ({ target }) => {
    setDeparture({ ...departure, city: target.value });
  };

  return (
    <React.Fragment>
      <div id='inputs-container'>
        <div className='city-select'>
          <ForecastInput 
            name='departure'
            onChange={handleChange}
          />
        </div>

        <div className='city-select'>
          <ForecastInput 
            name='arrival'
          />
        </div>
      </div>

      <div id='results-container'>
        <ForecastResult 
        />

        <ForecastResult 
        />
      </div>
    </React.Fragment>
  );
}

export default Forecast;