var menu = document.getElementById('menu');
var menuItems = document.getElementById('menu-items');
var menuClosebut = document.getElementById('menu-close');

function Handclick() {
    menuItems.style.width = '90%';
    menu.style.display = 'none';
}
function Handclose(){
      menuItems.style.width = '0%';
      menu.style.display = 'block';
}
menuClosebut.addEventListener('click',Handclose)
menu.addEventListener('click',Handclick)
/* The call */
 

function getWeather(city1) {
    const apiKey = '3a8152389a5d4c629ef03022250202';
    const city = city1;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=6`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayCurrentWeather(data)
            displayForecast(data);
            console.log(data)
        } else {
            console.error('Error fetching weather data:', xhr.statusText);
        }
    };
    xhr.onerror = function () {
        console.error('Request error');
    };
    xhr.send();
}

function displayCurrentWeather(data) {
   var currentWeather = document.getElementById('current');
    var currentdetails = document.getElementById('curr-detail');

   const dateString = data.location.localtime;
   const date = new Date(dateString);
   const dayOfWeekLong = date.toLocaleDateString('en-US', { weekday: 'long' });
   console.log(data);
   var cloudhtml = document.getElementById('cloud');
   var humidityhtml = document.getElementById('humidity');
   var windhtml = document.getElementById('wind');
   var visibilityhtml = document.getElementById('visibility');

   const humidity  = data.current.humidity+'%';
   const cloud = data.current.cloud;
   const wind = data.current.wind_mph+ 'm/h';
const visibility = data.current.vis_km + 'km';


    const currentWeatherHtml = `
         <h1 class="large-font mr-3">${data.current.temp_c}°C</h1>
                            <div class="d-flex flex-column mr-3">
                                <h2 class="mt-3 mb-0">${data.location.name}</h2>
                                <small>${dayOfWeekLong}</small>
                            </div>
                            <div class="d-flex flex-column text-center">
                                <h3 class=" mt-4"></h3>
                                <small>${data.current.condition.text}</small>
                            </div>
    
`;
   
    currentWeather.innerHTML =  currentWeatherHtml;
    cloudhtml.innerHTML = cloud;
    humidityhtml.innerHTML = humidity; 
    windhtml.innerHTML = wind;
    visibilityhtml.innerHTML = visibility
    
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '';
 
    data.forecast.forecastday.forEach(day => {
        const date = new Date(day.date);
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        const weatherHtml = `
       
        <div class="col-4 col-lg-4">
                                <div class=" items">
                                    <h2 class="py-2">${dayOfWeek}</h2>
                                    <div class="line my-3"></div>
                                    <div class="px-2">
                                        <div class="row px-3">
                                            <p class="light-text">Temperature</p>
                                            <p class="ml-auto" id="cloud">${day.day.avgtemp_c}°C</p>
                                        </div>
                                        <div class="row px-3">
                                            <p class="light-text">Humidity</p>
                                            <p class="ml-auto" id="humidity">${day.day.avghumidity}%</p>
                                        </div>
                                        <div class="row px-3">
                                            <p class="light-text">Wind</p>
                                            <p class="ml-auto" id="wind">${day.day.maxwind_kph}m/s</p>
                                        </div>
                                        <div class="row px-3">
                                            <p class="light-text">Weather</p>
                                            <p class="ml-auto" id="visibility">${day.day.condition.text}</p>
                                        </div>
                                    </div>



                                </div>
                            </div>

    `;
        forecastDiv.innerHTML += weatherHtml;
    });
    
      



}

getWeather('lagos');
$(document).ready(function () {
    $('#weather_form').on('submit', function (event) {
        event.preventDefault();
        const city = $('#cityform').val();
        console.log(city)
        getWeather(city);

    });
});
$(document).ready(function () {
    $('.suggestion').on('click', function () {
        const searchTerm = $(this).data('term'); // Get the clicked term
        console.log(searchTerm)
        getWeather(searchTerm);

    });
});
