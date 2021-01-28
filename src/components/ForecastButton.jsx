import React from 'react';

function ForecastButton({ content, className, onClick, selected = '' }) {
  let classes = `button ${className} ${selected}`;

  return (
      <button className={classes} onClick={onClick}>{content}</button>
  );
};

export default ForecastButton;