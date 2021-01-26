import React from 'react';

function ForecastFeedback({ feedback }) {
  return (
    <div id="feedback-container" className={feedback ? '' : 'visibility-hidden'}>
      <span id="feedback"><strong>{feedback}</strong></span>
    </div>
  );
};

export default ForecastFeedback;