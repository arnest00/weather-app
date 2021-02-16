import React from 'react';
import ForecastInput from './ForecastInput';

function ForecastForm({ name, onSubmit }) {
  return (
    <form className='form-container' onSubmit={onSubmit}>
      <ForecastInput 
        option='city'
        name={name}
        isOptional={false}
      />
      <ForecastInput 
        option='state code'
        name={name}
        isOptional={true}
      />
      <ForecastInput 
        option='country code'
        name={name}
        isOptional={true}
      />
      <button className='form-button'>Select</button>
    </form>
  );
};

export default ForecastForm;