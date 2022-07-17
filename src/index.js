//Feature 1
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
  let todayday = document.querySelector("#day");
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  minutes = minutes > 9 ? minutes : "0" + minutes;
  let todayhours = document.querySelector("#time");
  let date = newDate.getDate();
  let todaydate = document.querySelector("#current-date");
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
  todayday.innerHTML = `${day}`;
  todayhours.innerHTML = `${hours}:${minutes} `;
  todaydate.innerHTML = `${date} ${month}`;
}
console.log(formatDate(now));

//Feature 2
function search(city) {
  let apiKey = "5f91a3ee1e9a25ad7ffa3c41adb88170";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
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
let button = document.querySelector("#current-position");
button.addEventListener("click", getCurrentPosition);

search("London");