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
function getFutureForecast(coordinates) {
  //   to get the daily forecast, there is a need for lon and lat
  let apiKey = "815a29c49f1689eb0317380664e5d969";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#main-temp");
  celsuisTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsuisTemperature);
  //   console.log(response.data);
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
  //   iconElement.setAttribute("alt", response.data.weather[0].description);
  // to change the alt response to the current weather description

  getFutureForecast(response.data.coord);
  //   this is used to call the coordinates from the open weather API and it will be linked to a function above.
}

// to link the search form (city) to get weather for the city name inputted.
function search(city) {
  let apiKey = "815a29c49f1689eb0317380664e5d969";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityIdElement = document.querySelector("#city-id");
  search(cityIdElement.value);
}
// this needs to be added to connect the search engine with the city inputted
search("Ilesa");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// For the days to show, a function formatFutureDays was called istead of the loop earlier done.
function formatFutureDays(timestamp) {
  let date = new Date(timestamp * 1000);

  let dayIndex = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[dayIndex];

  return day;
}

function showForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  // To grid the forecast, there is a need for the row class in a div(open and close)
  let forecastHTML = `<div class="row">`;
  //   In order to show forecast for the next 5 days, there is a need to loop usinf the forEach function.
  //   //   let days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  //   days.forEach(function (day) {

  dailyForecast.forEach(function (forecastDaily, index) {
    //   if (index < 6) is used to limit the number of days shown to 6 since we are using a 7 day forcast
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
             <div class="col">
              <div class="forecast-day">${formatFutureDays(
                forecastDaily.dt
              )}</div>
                <img
                  class="forecast"
                  src="http://openweathermap.org/img/wn/${
                    forecastDaily.weather[0].icon
                  }@2x.png"
                  alt="rainy"
                />
              <div class="forcast-temp">
                <span class="forcast-temp-max">
                ${Math.round(forecastDaily.temp.max)}&deg 
                </span>
                <span class="forcast-temp-min">
                ${Math.round(forecastDaily.temp.min)}&deg
                </span>
              </div>
              </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// showForecast();
// was needed to call the function showforecast to show the days that were looped
