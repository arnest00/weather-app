import React, { useState, useEffect } from 'react';
import ForecastInput from './ForecastInput';
import ForecastResult from './ForecastResult';
import useDebounce from './useDebounce';

function Forecast(props) {
  const [ city, setCity ] = useState('');
  const [ forecast, setForecast ] = useState({});

  const debouncedCity = useDebounce(city);

  useEffect(() => {
    if (debouncedCity) {
      getForecast(debouncedCity);
    } else {
      setCity('');
    };
  }, [ debouncedCity ]);

  async function getForecast(q) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${process.env.REACT_APP_API_KEY}&units=imperial&q=${q}`);
      const data = await response.json();
      const newForecast = { 
        ...forecast, 
        city: data.name,
        desc: data.weather[0].description,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed
      };
      setForecast(newForecast);
      console.log(forecast);
    } catch (error) {
      console.error(error);;
    };
  };

  return (
    <React.Fragment>
      <div id='inputs-container'>
        <ForecastInput 
          name='departure'
          onChange={e => setCity(e.target.value)}
        />

        {/* <ForecastInput 
          name='arrival'
          onChange={e => console.log(e.target.value)}
        /> */}
      </div>

      <div id='results-container'>
        <ForecastResult 
          forecast={forecast}
        />

        {/* <ForecastResult 
        /> */}
      </div>
    </React.Fragment>
  );
};

export default Forecast;