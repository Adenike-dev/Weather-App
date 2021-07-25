function displayTemperature(response) {
  console.log(response.data.main.temp);
}

let apiKey = "815a29c49f1689eb0317380664e5d969";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
