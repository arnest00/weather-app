import React from 'react';

function ForecastInput({ option, name, isOptional }) {
  function handleFocus({ target }) {
    target.previousSibling.classList.remove('visibility-hidden');
    target.value = '';
  };

  function handleBlur({ target }) {
    target.previousSibling.classList.add('visibility-hidden');
  };

  return (
    <div className={`${option}-select`}>
      <div className='input-container' >
        <div className='visibility-hidden' style={{ display: 'inline-block' }}><ion-icon name='airplane-sharp'></ion-icon></div>
        <input 
          className={`${option}-input`} 
          type='text' 
          name={`${name}${option.charAt(0).toUpperCase() + option.slice(1)}`} 
          placeholder={`${name.charAt(0).toUpperCase() + name.slice(1)} ${option} ${isOptional ? '(optional)' : ''}`} 
          onFocus={handleFocus} 
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default ForecastInput;