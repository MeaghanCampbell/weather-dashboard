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

// recent searches container
var searchHistEl = document.querySelector('#search-history')

//display future weather
var displayWeatherContainer = document.querySelector('#display-future-weather')

//submit search 
var submitSearch = function(event) {
    event.preventDefault();
    
    // get value from city name input
    var cityName = cityFormInputEl.value.trim();

    if (cityName) {
        getWeatherData(cityName);
        cityFormInputEl.value = "";
        var searchHistItemEl = document.createElement('li')
        searchHistItemEl.textContent = cityName
        searchHistItemEl.classList.add('search-history-item')
        searchHistEl.appendChild(searchHistItemEl)
        searchHistEl.insertBefore(searchHistItemEl, searchHistEl.firstChild);
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
        display5DayWeather(data)
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

var display5DayWeather = function(data) {
    console.log(data.daily[1].humidity)

    displayWeatherContainer.innerHTML = ''
    
    var day0Weather = document.createElement('ul')
    day0Weather.innerHTML = moment().add(1, 'days').format('M/D/Y')
    day0Weather.classList.add('future-weather-data')
    displayWeatherContainer.appendChild(day0Weather)

    var day1Weather = document.createElement('ul')
    day1Weather.innerHTML = moment().add(2, 'days').format('M/D/Y')
    day1Weather.classList.add('future-weather-data')
    displayWeatherContainer.appendChild(day1Weather)

    var day2Weather = document.createElement('ul')
    day2Weather.innerHTML = moment().add(3, 'days').format('M/D/Y')
    day2Weather.classList.add('future-weather-data')
    displayWeatherContainer.appendChild(day2Weather)

    var day3Weather = document.createElement('ul')
    day3Weather.innerHTML = moment().add(4, 'days').format('M/D/Y')
    day3Weather.classList.add('future-weather-data')
    displayWeatherContainer.appendChild(day3Weather)

    var day4Weather = document.createElement('ul')
    day4Weather.innerHTML = moment().add(5, 'days').format('M/D/Y')
    day4Weather.classList.add('future-weather-data')
    displayWeatherContainer.appendChild(day4Weather)

    var dayWeatherVariables = [day0Weather, day1Weather, day2Weather, day3Weather, day4Weather]


    for (var i = 0; i < dayWeatherVariables.length; i++) {

        var dayWeatherTemp = document.createElement('li')
        dayWeatherTemp.innerHTML = 'Temp: ' + Math.floor((data.daily[i].temp.day - 273.15) * (9/5) + 32) + '  \u00B0 F'
        dayWeatherVariables[i].appendChild(dayWeatherTemp)
        
        var dayWeatherHum = document.createElement('li')
        dayWeatherHum.innerHTML = 'Humidity: ' + data.daily[i].humidity + '%'
        dayWeatherVariables[i].appendChild(dayWeatherHum)

    }
}

// listen for city name search button click
cityFormEl.addEventListener('submit', submitSearch);



