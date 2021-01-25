import React from 'react';

function ForecastForm({ name, onSubmit, onFocus }) {
  const uppercaseName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <form className='form-container' onSubmit={onSubmit}>
      <div className='city-select'>
        <div className='input-container' >
          <ion-icon name='airplane-sharp'></ion-icon>
          <input 
            className='city-input' 
            type='text' 
            name={ `${name}City` } 
            placeholder={ `${uppercaseName} city` }
            onFocus={onFocus}
          />
        </div>
      </div>
      <div className='state-select'>
        <div className='input-container' >
          <ion-icon name='trail-sign-sharp'></ion-icon>
          <input 
            className='state-input' 
            type='text' 
            name={ `${name}State` } 
            placeholder={ `${uppercaseName} state (optional)` } 
          />
        </div>
      </div>
      <div className='country-select'>
        <div className='input-container' >
          <ion-icon name='earth-sharp'></ion-icon>
          <input 
            className='country-input' 
            type='text' 
            name={ `${name}Country` } 
            placeholder={ `${uppercaseName} country` } 
          />
        </div>
      </div>
      <button className='form-button'>Select</button>
    </form>
  );
};

export default ForecastForm;