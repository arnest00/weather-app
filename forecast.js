require('dotenv').config();

const fetch = require('node-fetch');

// ============ Set up .env variables
const API_KEY = process.env.API_KEY;

// ============ API url
const url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=imperial&`;

module.exports = {
  getForecast: async (city) => {
    let cityStr = `q=${city}`;

    const response = await fetch(`${url}${cityStr}`);
    const data = await response.json();
    console.log(data);
  }
};

// const forecastDescs = document.querySelectorAll('.forecast-desc');
// const forecastTempNums = document.querySelectorAll('.forecast-temp-num');
// const forecastTempScales = document.querySelectorAll('.forecast-temp-scale');
// const forecastIconContainers = document.querySelectorAll('.forecast-icon-container');
// const forecastHumidities = document.querySelectorAll('.forecast-humidity');
// const forecastWindSpds = document.querySelectorAll('.forecast-wind-spd');

// const getWeather = (lat, lon, arrayRef) => {
//   let scale;
//   if (scaleContainers[0].classList.contains('selected-scale')) {
//     scale = 'metric';
//     forecastTempScales[arrayRef].innerHTML = 'C';
//   } else if (scaleContainers[1].classList.contains('selected-scale')) {
//     scale = 'imperial';
//     forecastTempScales[arrayRef].innerHTML = 'F';
//   };

//   fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${scale}&exclude=minutely,hourly,current&appid=<%= API_KEY %>`)
//     .then(response => {
//       if (!response.ok) throw new Error(`Status code error: ${response.status}`);

//       return response.json();
//     })
//     .then(cityData => {
//       forecastDescs[arrayRef].innerHTML = cityData.daily[0].weather[0].description;

//       const icon = getIcon(cityData.daily[0].weather[0].main);
//       forecastIconContainers[arrayRef].innerHTML = `<ion-icon name="${icon}"></ion-icon>`;

//       forecastTempNums[arrayRef].innerHTML = parseInt(cityData.daily[0].temp.day);
//       forecastHumidities[arrayRef].innerHTML = `Humidity: ${cityData.daily[0].humidity}%`;
//       forecastWindSpds[arrayRef].innerHTML = `Wind: ${parseInt(cityData.daily[0].wind_speed)} ${scale === 'metric' ? 'mps' : 'mph'}`;

//       if (!forecasts[1].classList.contains('visibility-hidden')) {
//         setTimeout(() => {
//           feedbackSpan.innerHTML = getFeedback(cityData.daily[0].weather[0].main);
//         }, 500);
//       };
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// const getIcon = (mainStr) => {
//   switch (mainStr) {
//     case 'Thunderstorm':
//       return 'thunderstorm-sharp';
//     case 'Drizzle':
//     case 'Rain':
//       return 'rainy-sharp';
//     case 'Snow':
//       return 'snow-sharp';
//     case 'Clear':
//       return 'sunny-sharp';
//     case 'Clouds':
//       return 'cloudy-sharp';
//     default:
//       return 'warning-sharp';
//   };
// };

// const getFeedback = (mainStr) => {
//   switch (mainStr) {
//     case 'Thunderstorm':
//     case 'Drizzle':
//     case 'Rain':
//     case 'Snow':
//       return 'Yeah, probably.';
//     default:
//       return 'Nah, you\'re good.';
//   };
// };