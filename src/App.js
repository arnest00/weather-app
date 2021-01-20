import React from 'react';
import Forecast from './components/Forecast';
import './App.css';

function App() {
  return (
    <div id='app-container'>
      <h1 id='header'>Should You Bring a Jacket?</h1>
      <Forecast />
    </div>
  );
};

export default App;
