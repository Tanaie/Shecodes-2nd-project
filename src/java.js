function displayTemp(response) {
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#temp");
  let descriptionElement = document.querySelector("#description");
  let backgroundElement = document.querySelector(".weather-box");
  let backgroundWeather = response.data.weather[0].main;

  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(response.data.main.temp) + `°C`;
  descriptionElement.innerHTML = response.data.weather[0].description;

  // backgroundElement.style.backgroundImage = "url('./images/weathercloudy.jpg')";

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

  console.log(response.data);
}

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

search("Toronto");

let searchBar = document.querySelector("#search-form");

searchBar.addEventListener("submit", handleSubmit);
