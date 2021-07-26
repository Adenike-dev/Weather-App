function formatDate(datestamp) {
  let date = new Date(datestamp);
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  let currentdate = date.getDate();
  let months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "October",
    "November",
    "December",
  ];
  let monthIndex = date.getMonth();
  let month = months[monthIndex];
  let year = date.getFullYear();
  return `${day}, ${month}, ${currentdate} ${year}`;
}
function formatTime(timestamp) {
  let currentTime = new Date(timestamp);
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours} : ${minutes}`;
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidElement = document.querySelector("#humid");
  humidElement.innerHTML = ` ${Math.round(response.data.main.humidity)}%`;
  let windElement = document.querySelector("#wind-id");
  windElement.innerHTML = ` ${Math.round(response.data.wind.speed)}Km/H`;
  let feelElement = document.querySelector("#feels-like");
  feelElement.innerHTML = ` ${Math.round(response.data.main.feels_like)}°C`;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let timeElement = document.querySelector("#time-id");
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  let iconElement = document.querySelector("#main-image");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  // to change the alt response to the current weather description
}

let apiKey = "815a29c49f1689eb0317380664e5d969";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
