import React from 'react';
import ForecastInput from './ForecastInput';

function ForecastForm({ name, onSubmit, onChange }) {
  return (
    <form className='form-container' onSubmit={onSubmit} onChange={onChange}>
      <ForecastInput 
        option='city'
        name={name}
        isOptional={false}
      />
      <ForecastInput 
        option='state'
        name={name}
        isOptional={true}
      />
      <ForecastInput 
        option='country'
        name={name}
        isOptional={true}
      />
      <button className='form-button'>Select</button>
    </form>
  );
};

export default ForecastForm;