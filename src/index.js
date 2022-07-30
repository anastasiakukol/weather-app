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
let form = document.querySelector("#search-form");
form.addEventListener("submit", submit);

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
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
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
}

function showPosition(position) {
  let apiKey = "5f91a3ee1e9a25ad7ffa3c41adb88170";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemp);
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemp);
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
}

let celsiusTemp = null;

let button = document.querySelector("#current-position");
button.addEventListener("click", getCurrentPosition);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", showFahrenheitTemp);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", showCelsiusTemp);
search("London");

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wed", "Thu", "Sat"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
            <h6>${day}</h6>
            <img src="images/Sun.png" alt="bright sun" width="30px" />
            <span class="week-temperature">
              15/21 ℃
            </span>
          </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
