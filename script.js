let appId = '53d2378036e10278637205320c39dd84';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchTerm) {
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
        // console.log(result);
    })
}

function init(resultFromServer){
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;
        
        case 'Clouds':
            document.body.style.backgroundImage = 'url("cloudy.jpg")';
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("rain.jpg")';    
            break;

        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("storm.jpg")';
            break;
            
        case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;

        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let tempuratureElement = document.getElementById('tempurature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

    tempuratureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeedElement.innerHTML = 'Wind at ' + Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultFromServer.name;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';

    setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm){
        searchWeather(searchTerm);
    }
    displayCity(searchTerm);
    document.getElementById('searchInput').value='';
    searchforecast(searchTerm);
})

$("body").on("click",".city",function(){
    var city = $(this).attr("value");
    searchWeather(city);
})

function displayCity (cityName){
    var city = $(this).attr("city-name");
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid={53d2378036e10278637205320c39dd84}";
    var cityBtn =$("<button class='city'>");
        cityBtn.text(cityName)
        cityBtn.attr("value", cityName)
        $("#city").prepend(cityBtn);
}

$("body").on("click",".forecast",function(){
    var  forecast = $(this).attr("value");
    searchWeather(forecastEl);
})



function searchforecast(searchTerm) {


    getSearchMethod(searchTerm);
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=53d2378036e10278637205320c39dd84").then(result => {
    return result.json();
    })
    .then(result => {
        console.log(result);

        $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast: </h4>").append("<div class=\"row\">");

        for(var i = 0; i < 5; i++){
            result.list[i]
            console.log(result.list[i]);
            
            const colEL = $("<div>").addClass("col-md-2");

            const cardEL = $("<card>").addClass("card bg-primary text-white");

            const cardBodyEL = $("<div>").addClass("card-body p-2");

            //extract data from current element
            const titleEl = $("<h5>").addClass("card-title").text(new Date(response.list[i].dt_txt).toLocalDateSting());
            
            const tempEL = $("<p>").addClass("card-text").text(`Temp: ${response.list[i].main.temp_max}`);
            const humidityEL = $("<p>").addClass("card-text").text(`humidity: ${response.list[i].main.humidity}`);

            //append all data together in cardEL
            cardBodyEL.append(titleEl, tempEL, humidityEL);
            cardlEL.append(cardBodyEL);

            colEL.append(cardEL);

            $("forecast .row").append(colEL);
        

        }
        
    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let tempuratureElement = document.getElementById('tempurature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');
    })
}