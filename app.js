function formatDate(timestamp) {
  //calculate the date from 1970
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatTimestamp(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
  //return day;
}

function displayadvForecast(response) {
  let advforecast = response.data.daily;
  let advforecastElement = document.querySelector("#adv-forecast");

  //let days = ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri"]; //array loop

  let advforecastHTML = `<div class="row">`; //ceates the row for the adv date grid
  advforecast.forEach(function (advforecastDay, index) {
    if (index < 6) {
      advforecastHTML =
        advforecastHTML +
        `
      <div class="col-2">
      <div class="adv-weather-forecast-date">${formatTimestamp(
        advforecastDay.dt
      )}</div>
      <img src="http://openweathermap.org/img/wn/${
        advforecastDay.weather[0].icon
      }@2x.png" 
        atl=""
        width="40"  
      />
      <div class="adv-weather-forecast-temps"> 
        <span class="adv-weather-forecast-temp-max">${Math.round(
          advforecastDay.temp.max
        )}°</span>
        <span class="adv-weather-forecast-temp-min">${Math.round(
          advforecastDay.temp.max
        )}°</span>
       </div>
      </div> 
     `;
    }
  });

  advforecastHTML = advforecastHTML + `</div>`; //closes the div of row element
  advforecastElement.innerHTML = advforecastHTML;
}

function getadvForcast(coordinates) {
  let apiKey = "796615aa66205a1254376c90ff6d0826";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayadvForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getadvForcast(response.data.coord);
}

function search(city) {
  let apiKey = "796615aa66205a1254376c90ff6d0826";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
  console.log(cityInputElement.value);
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  //remove the active class from the temp links
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault;
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
//displayadvForecast(); //moved up in the axios call
