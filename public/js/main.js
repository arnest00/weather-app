const inputContainers = document.querySelectorAll('.input-container'),
      forecasts = document.querySelectorAll('.forecast'),
      scaleContainers = document.querySelectorAll('.scale-container'),
      metricScale = document.querySelector('#metric-scale'),
      imperialScale = document.querySelector('#imperial-scale'),
      feedbackSpan = document.querySelector('#feedback');

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
    // const searchTerm = event.target.value;

    // if (searchTerm.length >= 3) {
      // const results = await locations.filter(location => 
      //   location.name.toLowerCase().includes(searchTerm.toLowerCase())
      // );
  
      // if (!results.length) {
      //   dropdown.classList.add('display-none');
      //   return;
      // };

      // for (let result of results) {
      //   const choice = document.createElement('a');
  
      //   choice.classList.add('dropdown-item');
      //   choice.innerHTML = `${result.name}, ${result.state ? result.state + ', ' : ''}${result.country}`;

      //   choice.addEventListener('click', () => {
      //     dropdown.classList.add('display-none');

      //     input.value = `${result.name}, ${result.state ? result.state : result.country}`;

      //     getWeather(result.coord.lat, result.coord.lon, arrayRef);
      //     forecasts[arrayRef].classList.remove('visibility-hidden');
      //   });
  
      //   dropdown.appendChild(choice);
      // };
    // } else {
    //   dropdown.classList.add('display-none');
    // };
  };


  // Throttle user input
  input.addEventListener('input', debounce(onInput));
  
  // ====== Clear input field on focusing
  input.addEventListener('focus', event => {
    event.target.value = '';
    forecasts[arrayRef].classList.add('visibility-hidden');
  });

  // ====== Hide search results when clicking outside of search results
  document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
      dropdown.classList.add('display-none');
    };
  });
};

// ====== Throttle function
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

// ====== Focus on input when clicking on container
inputContainers.forEach(container => {
  container.addEventListener('click', () => {
    container.children[1].focus();
  });
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