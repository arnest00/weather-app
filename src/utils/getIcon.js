export function getIcon(str) {
  switch (str) {
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