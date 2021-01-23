// form container
var cityFormEl = document.querySelector('#search')

// form name input
var cityFormInputEl = document.querySelector('#search-query')

// weather data container
var weatherContainerEl = document.querySelector('#today-weather')

// display city name
var weatherCityNameEl = document.querySelector('#city-name')
var weatherIconEl = document.querySelector('#icon')

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

    var currentDateEl = moment().format('M/D/Y')
    var displayDate = document.querySelector('#date')
    displayDate.textContent = '(' + currentDateEl + ')'

    weatherCityNameEl.textContent = data.name
    showTempEl.textContent = Math.floor((data.main.temp - 273.15) * (9/5) + 32) + '  \u00B0 F'
    showHumidityEl.textContent = data.main.humidity + '%'
    showWindSpeedEl.textContent = data.wind.speed + ' MPH'

    var lat = data.coord.lat
    var lon = data.coord.lon
    
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=ae1a6f308d226ee08bc8e5c387cf867e')
    .then(function(response) {
        return response.json()
    }).then(function(data) {  
        displayUVIndex(data)
    })
}

var displayUVIndex = function(data) {
    showUVIndexEl.value = parseInt(data.current.uvi)
    showUVIndexEl.textContent = data.current.uvi
    
    if (showUVIndexEl.value <= 2) {
        showUVIndexEl.setAttribute('class', 'low')
    } else if (showUVIndexEl.value > 2 && showUVIndexEl.value <= 5) {
        showUVIndexEl.setAttribute('class', 'mod')
    } else if (showUVIndexEl.value > 5 && showUVIndexEl.value <= 7) {
        showUVIndexEl.setAttribute('class', 'high')
    } else if (showUVIndexEl.value > 7) {
        showUVIndexEl.setAttribute('class', 'very-high')
    }

}


// listen for city name search button click
cityFormEl.addEventListener('submit', submitSearch);



