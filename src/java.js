function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                id="mon"
                width="40"
              />
              <div class="weather-forecast-date">${formatDay(
                forecastDay.dt
              )}</div>
              <div class="weather-forecast-temp">
                <span class="weather-forecast-high" id="high">${Math.round(
                  forecastDay.temp.max
                )}°</span> /
                <span class="weather-forecast-low" id="low">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  // The forecast has been ACTIVATED! 2/3 From here we will launch the html. This is converting the data from the user.
}

function displayTemp(response) {
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temp");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let backgroundElement = document.querySelector(".weather-box");
  let backgroundWeather = response.data.weather[0].main;

  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp) + `°C`;
  windElement.innerHTML = Math.round(response.data.wind.speed) + `km/H`;
  humidityElement.innerHTML = response.data.main.humidity + `%`;
  descriptionElement.innerHTML = response.data.weather[0].description;

  if (backgroundWeather === "Clouds") {
    backgroundElement.style.backgroundImage =
      "url('./images/weathercloudy.jpg')";
  }
  if (backgroundWeather === "Clear") {
    backgroundElement.style.backgroundImage =
      "url('./images/weathersunny.jpg')";
  }
  if (backgroundWeather === "Rain") {
    backgroundElement.style.backgroundImage = "url('./images/weatherrain.jpg')";
  }
  if (backgroundWeather === "Snow") {
    backgroundElement.style.backgroundImage = "url('./images/weathersnow.jpg')";
  }
  if (backgroundWeather === "Thunder") {
    backgroundElement.style.backgroundImage =
      "url('./images/weatherthunder.jpg')";
  }
  //Double check on "Rain" "Snow" & "Thunder" later. Not sure if those strings are correct.

  backgroundElement.style.transition = "all 450ms ease-in-out";

  getForecast(response.data.coord);
  // This IS ACTIVATING the weekly FORECAST. We're starting here. 1/3 The data has been RECEIVED.
}

//BLOCK ~~~~~~~~~~~~~~~
// STEP 3 The stored Data is executed
function showTemperature(response) {
  let geoCity = document.querySelector("#city");
  let geoTemp = document.querySelector("#temp");
  let geoWind = document.querySelector("#wind");
  let geoHumidity = document.querySelector("#humidity");
  let geoDescription = document.querySelector("#description");
  let backgroundElement = document.querySelector(".weather-box");
  let backgroundWeather = response.data.weather[0].main;

  geoCity.innerHTML = response.data.name;
  geoTemp.innerHTML = Math.round(response.data.main.temp) + `°C`;
  geoWind.innerHTML = Math.round(response.data.wind.speed) + `km/H`;
  geoHumidity.innerHTML = response.data.main.humidity + `%`;
  geoDescription.innerHTML = response.data.weather[0].description;
  if (backgroundWeather === "Clouds") {
    backgroundElement.style.backgroundImage =
      "url('./images/weathercloudy.jpg')";
  }
  if (backgroundWeather === "Clear") {
    backgroundElement.style.backgroundImage =
      "url('./images/weathersunny.jpg')";
  }
  if (backgroundWeather === "Rain") {
    backgroundElement.style.backgroundImage = "url('./images/weatherrain.jpg')";
  }
  if (backgroundWeather === "Snow") {
    backgroundElement.style.backgroundImage = "url('./images/weathersnow.jpg')";
  }
  if (backgroundWeather === "Thunder") {
    backgroundElement.style.backgroundImage =
      "url('./images/weatherthunder.jpg')";
  }

  backgroundElement.style.transition = "all 450ms ease-in-out";

  getForecast(response.data.coord);
}

//STEP 2 Store the desire user location information
function retrievePosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndPoint}lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleGeo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
  //STEP 1 - Request access to the users current postion.
}

//BLOCK~~~~~~~~~~~~~~

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("Tokyo");

let searchBar = document.querySelector("#search-form");
let searchGeo = document.querySelector("#geo-input");

searchBar.addEventListener("submit", handleSubmit);
searchGeo.addEventListener("click", handleGeo);
