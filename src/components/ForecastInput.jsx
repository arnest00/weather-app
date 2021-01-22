import React from 'react';

function ForecastInput({ name, onChange, onFocus }) {
  const uppercaseName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <div className='city-select'>
      <div className='input-container' >
        <ion-icon name='airplane-sharp'></ion-icon>
        <input 
          className='city-input' 
          type='text' 
          name={name} 
          placeholder={ `${uppercaseName} city` } 
          onChange={onChange}
          onFocus={onFocus}
        />
      </div>
    </div>
  );
};

export default ForecastInput;