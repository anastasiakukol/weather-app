//Defining current day, date and time
let now = new Date();
function formatDate(newDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[newDate.getDay()];
  let hours = newDate.getHours();
  hours = hours > 9 ? hours : "0" + hours;
  let minutes = newDate.getMinutes();
  minutes = minutes > 9 ? minutes : "0" + minutes;
  let date = newDate.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[newDate.getMonth()];
  document.querySelector("#day").innerHTML = `${day}`;
  document.querySelector("#time").innerHTML = `${hours}:${minutes} `;
  document.querySelector("#current-date").innerHTML = `${date} ${month}`;
}
console.log(formatDate(now));

//Function for searching the city using API
function search(city) {
  let apiKey = "5f91a3ee1e9a25ad7ffa3c41adb88170";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function submit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-city").value;
  search(cityElement);
}
//Function for getting weather data using API
function showTemp(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute(
      "alt",
      `https://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
    );
  celsiusTemp = response.data.main.temp;
  getForecast(response.data.coord);
  changeForecastSlogan(descriptionElement);
}
//Function for getting current geolocation using API
function showPosition(position) {
  let apiKey = "5f91a3ee1e9a25ad7ffa3c41adb88170";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
//Function for converting celsius to fahrenheit
function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemp);
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
}
//Function for converting fahrenheit to celsius
function showCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
}
//Function for getting days of week into the forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
//Function for getting forecast
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
            <h6>${formatDay(forecastDay.dt)}</h6>
            <img src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="40px" />
            <span class="week-temperature-max">
              ${Math.round(forecastDay.temp.max)}°/
            </span>
            <span class="week-temperature-min">
              ${Math.round(forecastDay.temp.min)}°
            </span>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
//Function for getting location for forecast using API
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "70baea25d03a56fd5d768cd48a5e4af2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

//Function for changing slogan depending on weather description
function changeForecastSlogan(descriptionElement) {
  let forecastSlogan = document.querySelector("#slogan");
  if (
    descriptionElement.innerHTML === "moderate rain" ||
    descriptionElement.innerHTML === "overcast clouds" ||
    descriptionElement.innerHTML === "broken clouds" ||
    descriptionElement.innerHTML === "shower rain" ||
    descriptionElement.innerHTML === "light rain"
  ) {
    forecastSlogan.innerHTML = "Don't forget your umbrella ☂️";
  } else {
    if (
      descriptionElement.innerHTML === "scattered clouds" ||
      descriptionElement.innerHTML === "few clouds" ||
      descriptionElement.innerHTML === "clear sky"
    ) {
      forecastSlogan.innerHTML = "Don't forget your sunglasses 👓";
    } else {
      if (
        descriptionElement.innerHTML === "snow" ||
        descriptionElement.innerHTML === "light snow" ||
        descriptionElement.innerHTML === "heavy snow"
      ) {
        forecastSlogan.innerHTML = "Don't forget your scarf 🧣";
      } else {
        forecastSlogan.innerHTML = "Don't forget your smile 🤗";
      }
    }
  }
}

//Variables out of the functions

let form = document.querySelector("#search-form");
form.addEventListener("submit", submit);

let celsiusTemp = null;

let button = document.querySelector("#current-position");
button.addEventListener("click", getCurrentPosition);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", showFahrenheitTemp);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", showCelsiusTemp);

search("London");
