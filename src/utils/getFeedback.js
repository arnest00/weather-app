export function getFeedback(departureForecast, arrivalForecast) {
  const { temp: departureTemp } = departureForecast;
  const { city: arrivalCity, temp: arrivalTemp, icon: arrivalIcon } = arrivalForecast;

  switch (arrivalIcon) {
    case 'thunderstorm-sharp':
    case 'rainy-sharp':
    case 'snow-sharp':
      return `The weather won't be the best when you get there, so maybe.`;
  
    default:
      break;
  }

  if (departureTemp + 15 < arrivalTemp && arrivalTemp >= 60) 
    return `> It's warmer in ${arrivalCity}, so you're probably good.`;
  if (departureTemp - 15 > arrivalTemp && arrivalTemp < 55) 
    return `> It's colder in ${arrivalCity}, so you probably should.`;

  return `> It's up to you. Airplanes can get pretty cold, though.`;
};