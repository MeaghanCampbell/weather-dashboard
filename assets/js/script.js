// form container
var cityFormEl = document.querySelector('#search')

// form name input
var cityFormInputEl = document.querySelector('#search-query')

// weather data container
var weatherContainerEl = document.querySelector('#today-weather')

// display city name
var weatherCityNameEl = document.querySelector('#city-name')

//display city weather
var showTempEl = document.querySelector('#temperature')
var showHumidityEl = document.querySelector('#humidity')
var showWindSpeedEl = document.querySelector('#wind-speed')
var showUVIndexEl = document.querySelector('#uv-index')

//submit search 
var submitSearch = function(event) {
    event.preventDefault();
    
    // get value from city name input
    var cityName = cityFormInputEl.value.trim();

    if (cityName) {
        getWeatherData(cityName);
        cityFormInputEl.value = "";
    } else {
        alert('Please enter a valid city name')
    }
} 

// get data from weather dashboard with fetch API
var getWeatherData = function(cityName) {

    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=ae1a6f308d226ee08bc8e5c387cf867e'


    fetch(apiUrl).then(function(response) {
        return response.json()
    }).then(function(data) {  
        displayWeatherData(data);
    })
}

var displayWeatherData = function(data) {

    weatherCityNameEl.textContent = data.name
    showTempEl.textContent = Math.floor((data.main.temp - 273.15) * (9/5) + 32) + '  \u00B0 F'
    showHumidityEl.textContent = data.main.humidity + '%'
    showWindSpeedEl.textContent = data.wind.speed + ' MPH'
}

// listen for city name search button click
cityFormEl.addEventListener('submit', submitSearch);
