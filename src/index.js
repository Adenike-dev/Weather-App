function displayTemperature(response) {
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let tempElement = document.querySelector("#temp-id");
  tempElement.innerHTML = ` ${Math.round(response.data.main.temp)}°C`;
  let humidElement = document.querySelector("#humid");
  humidElement.innerHTML = ` ${Math.round(response.data.main.humidity)}%`;
  let windElement = document.querySelector("#wind-id");
  windElement.innerHTML = ` ${Math.round(response.data.wind.speed)}Km/H`;
  let feelElement = document.querySelector("#feels-like");
  feelElement.innerHTML = ` ${Math.round(response.data.main.feels_like)}°C`;
}

let apiKey = "815a29c49f1689eb0317380664e5d969";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
