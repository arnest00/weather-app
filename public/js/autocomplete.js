//  ====== DOM selection
const inputContainers = document.querySelectorAll('.input-container');
const forecasts = document.querySelectorAll('.forecast');
const forecastDescs = document.querySelectorAll('.forecast-desc');
const forecastTempNums = document.querySelectorAll('.forecast-temp-num');
const forecastTempScales = document.querySelectorAll('.forecast-temp-scale');
const forecastIconContainers = document.querySelectorAll('.forecast-icon-container');
const forecastHumidities = document.querySelectorAll('.forecast-humidity');
const forecastWindSpds = document.querySelectorAll('.forecast-wind-spd');
const scaleContainers = document.querySelectorAll('.scale-container');
const metricScale = document.querySelector('#metric-scale');
const imperialScale = document.querySelector('#imperial-scale');
const feedbackSpan = document.querySelector('#feedback');

let cityInputs;
window.onload = () => {
  cityInputs = document.querySelectorAll('.city-input');
};

// ====== Autocomplete functionality
const createAutoComplete = ({root, arrayRef, type}) => {
  const typeCap = type.charAt(0).toUpperCase() + type.slice(1);

  root.innerHTML = `
    <ion-icon name="airplane-sharp"></ion-icon>
    <input class="city-input" type="text" name="${type}" placeholder="${typeCap} city">
    <div><div class="dropdown-container display-none"></div></div>
  `;

  const input = root.querySelector('input');
  const dropdown = root.querySelector('.dropdown-container');

  const onInput = async event => {
    const searchTerm = event.target.value;

    if (searchTerm.length >= 3) {
      const results = await locations.filter(location => 
        location.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      if (!results.length) {
        dropdown.classList.add('display-none');
        return;
      };
  
      dropdown.innerHTML = '';
      dropdown.classList.remove('display-none');

      for (let result of results) {
        const choice = document.createElement('a');
  
        choice.classList.add('dropdown-item');
        choice.innerHTML = `${result.name}, ${result.state ? result.state + ', ' : ''}${result.country}`;

        choice.addEventListener('click', () => {
          dropdown.classList.add('display-none');

          input.value = `${result.name}, ${result.state ? result.state : result.country}`;

          getWeather(result.coord.lat, result.coord.lon, arrayRef);
          forecasts[arrayRef].classList.remove('visibility-hidden');
        });
  
        dropdown.appendChild(choice);
      };
    } else {
      dropdown.classList.add('display-none');
    };
  };

  input.addEventListener('input', debounce(onInput));

  input.addEventListener('focus', event => {
    event.target.value = '';
    forecasts[arrayRef].classList.add('visibility-hidden');
  });

  document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
      dropdown.classList.add('display-none');
    };
  });
};

const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const getWeather = (lat, lon, arrayRef) => {
  let scale;
  if (scaleContainers[0].classList.contains('selected-scale')) {
    scale = 'metric';
    forecastTempScales[arrayRef].innerHTML = 'C';
  } else if (scaleContainers[1].classList.contains('selected-scale')) {
    scale = 'imperial';
    forecastTempScales[arrayRef].innerHTML = 'F';
  };

  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${scale}&exclude=minutely,hourly,current&appid=<%= API_KEY %>`)
    .then(response => {
      if (!response.ok) throw new Error(`Status code error: ${response.status}`);

      return response.json();
    })
    .then(cityData => {
      forecastDescs[arrayRef].innerHTML = cityData.daily[0].weather[0].description;

      const icon = getIcon(cityData.daily[0].weather[0].main);
      forecastIconContainers[arrayRef].innerHTML = `<ion-icon name="${icon}"></ion-icon>`;

      forecastTempNums[arrayRef].innerHTML = parseInt(cityData.daily[0].temp.day);
      forecastHumidities[arrayRef].innerHTML = `Humidity: ${cityData.daily[0].humidity}%`;
      forecastWindSpds[arrayRef].innerHTML = `Wind: ${parseInt(cityData.daily[0].wind_speed)} ${scale === 'metric' ? 'mps' : 'mph'}`;

      if (!forecasts[1].classList.contains('visibility-hidden')) {
        setTimeout(() => {
          feedbackSpan.innerHTML = getFeedback(cityData.daily[0].weather[0].main);
        }, 500);
      };
    })
    .catch(err => {
      console.log(err);
    });
};

const getIcon = (mainStr) => {
  switch (mainStr) {
    case 'Thunderstorm':
      return 'thunderstorm-sharp';
    case 'Drizzle':
    case 'Rain':
      return 'rainy-sharp';
    case 'Snow':
      return 'snow-sharp';
    case 'Clear':
      return 'sunny-sharp';
    case 'Clouds':
      return 'cloudy-sharp';
    default:
      return 'warning-sharp';
  };
};

const getFeedback = (mainStr) => {
  switch (mainStr) {
    case 'Thunderstorm':
    case 'Drizzle':
    case 'Rain':
    case 'Snow':
      return 'Yeah, probably.';
    default:
      return 'Nah, you\'re good.';
  };
};

// ====== Autocomplete creation
createAutoComplete({
  root: inputContainers[0],
  arrayRef: 0,
  type: "departure"
});

createAutoComplete({
  root: inputContainers[1],
  arrayRef: 1,
  type: "arrival"
});

inputContainers[1].addEventListener('click', event => {
  feedbackSpan.innerHTML = '';
});

// ====== Scale toggle functionality
const toggleScale = () => {
  scaleContainers[0].classList.toggle('selected-scale');
  scaleContainers[1].classList.toggle('selected-scale');
};

const reset = () => {
  for (let i = 0; i < 2; i++) {
    forecasts[i].classList.add('visibility-hidden');
    cityInputs[i].value = '';
  };
  feedbackSpan.innerHTML = '';
};

metricScale.addEventListener('click', event => {
  toggleScale();
  reset();
});
imperialScale.addEventListener('click', event => {
  toggleScale();
  reset();
});