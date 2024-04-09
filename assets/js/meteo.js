const app = {
    init: function () {
        console.log("WeatherApp : application loading successfully");
        // Set the interval to call the function making the API call every hour || (1000 ms * 3600 = 1 hour) ||
        nIntervId = setInterval(app.fetchCityName, 1000*3600);
        // Make the first API call 
        app.fetchCityName();
    },

    fetchCityName: async function () {
        try {
            const response = await fetch("config.JSON");
            const cityName = await response.json();
            // console.log(cityName);
            const cityNameValue = cityName.city;
            // console.log(cityNameValue);
            app.fetchWeatherData(cityNameValue);
        } catch (error) {
            console.error("Erreur rencontrée lors de la récupération du nom de la ville : " + error);
        }
    },

    fetchWeatherData: async function (cityNameValue) {
        const APIKEY = '0be0093e777d8e6ef27c75eb852f2943';

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&appid=${APIKEY}&units=metric&lang=fr`;

        try {
            const response = await fetch(`${url}`);
            const weatherData = await response.json();
            // console.log(weatherData);

            app.addWeatherDataToDOM(weatherData);
            
        } catch (error) {
            console.error("Erreur rencontrée lors de la récupération des données : " + error);
        }
    },

    addWeatherDataToDOM: function (weatherData) {
        const weatherContainer = document.getElementById('weather-container');

        // Set the img's src & add the weather icon to DOM
        let iconValue = weatherData.weather[0].icon;
        const weatherIcon = weatherContainer.querySelector("#weather-icon");
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconValue}@2x.png`;

        // Add the temperature to DOM
        weatherContainer.querySelector("#temperature").textContent = Math.round(weatherData.main.temp) + "°C";

        // Add the weather description to DOM
        weatherContainer.querySelector("#description").textContent = weatherData.weather[0].description;

        // Add the city name to DOM
        weatherContainer.querySelector("#localisation").textContent = weatherData.name + ", " + weatherData.sys.country;

        // Add the feelslike temperature to DOM
        weatherContainer.querySelector("#feelslike").textContent = Math.round(weatherData.main.feels_like) + "°C";

        // Add the humidity level to DOM
        weatherContainer.querySelector("#humidity").textContent = weatherData.main.humidity + "%";
    }
};

document.addEventListener('DOMContentLoaded', app.init);