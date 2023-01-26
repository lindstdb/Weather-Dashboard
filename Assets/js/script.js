
document.getElementById("search-btn").addEventListener("click", function(){
    var city = document.getElementById("search-city").value;
    var apiKey = "89d50142569fa3c82f98613f7f3059b0";
    var limit = 1;
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=" + limit + "&appid=" + apiKey;
    
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        var lat = data[0].lat;
        var lon = data[0].lon;
        var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
        

        fetch(weatherUrl)
          .then(function(response) {
            return response.json();
          })
          .then(function(weatherData) {
            var cityName = weatherData.city.name;
            var currentWeather = weatherData.list[0];
            var date = currentWeather.dt_txt;
            var icon = "http://openweathermap.org/img/wn/" + currentWeather.weather[0].icon + ".png";
            var temperature = currentWeather.main.temp;
            var humidity = currentWeather.main.humidity;
            var windSpeed = currentWeather.wind.speed;
            
            let currentWeatherHTML = `
            <div class="col-sm-6">
            <div class="card">
            <div class="card-body">
            <h5 class="card-title">${cityName} ${date}<img src="${icon}"></h5>
            <ul class="">
                <li>Temperature: ${temperature}&#8457;</li>
                <li>Humidity: ${humidity}%</li>
                <li>Wind Speed: ${windSpeed} mph</li>
            </ul>
            </div>
            </div>
            </div>`;
            $('#current-weather').html(currentWeatherHTML);
            
            
          
            let fiveDayForecastHTML = `
            <h2>5-Day Forecast:</h2>
            <div id="fiveDayForecastUl" class="d-inline-flex flex-wrap ">`;
            for (let i = 1; i < weatherData.list.length; i++) {
              var forecast = weatherData.list[i];
              var forecastDate = weatherData.list[i].dt_txt;
              var forecastIcon = "http://openweathermap.org/img/wn/" + forecast.weather[0].icon + ".png";
              var forecastTemperature = forecast.main.temp;
              var forecastHumidity = forecast.main.humidity;
              var forecastWindSpeed = forecast.wind.speed;
              
              
              if (fiveDayForecastHTML += `
              <div class="weather-card card m-2 p0">
              <ul class="list-unstyled p-3">
                  <li>${forecastDate}</li>
                  <li class="weather-icon"><img src="${forecastIcon}"></li>
                  <li>Temp: ${forecastTemperature}&#8457;</li>
                  <br>
                  <li>Humidity: ${forecastHumidity}%</li>
                  <li>Wind Speed: ${forecastWindSpeed}</li>
              </ul>
          </div>`);}

                 // Build the HTML template
  fiveDayForecastHTML += `</div>`;
  // Append the five-day forecast to the DOM
  $('#five-day-forecast').html(fiveDayForecastHTML)
            })})});
