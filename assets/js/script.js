// form container
var cityFormEl = document.querySelector('#search')

// form name input
var cityFormInputEl = document.querySelector('#search-query')

// weather data container
var weatherContainerEl = document.querySelector('#today-weather')

// display city name
var weatherCityNameEl = document.querySelector('#city-name')

//display city weather
var weatherContentEl = document.querySelector('#display-current-weather')

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
        response.json().then(function(data) {
            console.log(response.data[0].name);
        })
    })
    
    /* weatherCityNameEl.innerHTML = '';
    weatherContentEl.innerHTML = '';
    
    weatherCityNameEl.setAttribute('src', response.name[0]);
    }) */
}

// listen for city name search button click
cityFormEl.addEventListener('submit', submitSearch);
