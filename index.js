import "./css/style.css";
import Forecast from "./javascript/forecast";
import Snackbar from "./javascript/snackbar";
import { format } from "date-fns";

const forecast = document.querySelector(".forecast");
const map = document.querySelector(".map");
const load = document.querySelector(".load");
const getForecast = new Forecast();
const snackbar = new Snackbar();
snackbar.init();

function weatherPamphlet(cityData, weatherData){
    const image = document.querySelector(".image");
    const parish = document.querySelector(".parish");
    const details = document.querySelector(".details");

    image.style.background = `url("./img/places/${cityData.AdministrativeArea.EnglishName}.jpg")`;
    image.style.backgroundSize = "cover";
    parish.textContent = cityData.AdministrativeArea.EnglishName;

    details.innerHTML = `
    <img src="./img/icons/${weatherData.WeatherIcon}.svg" alt="weather-icon">
    <p class="weather">${weatherData.WeatherText}</p>
    <p class="town">${cityData.EnglishName}</p>
    <p class="temp">${weatherData.Temperature.Metric.Value}&deg;C</p>
    <p class="sponsor">Powered by AccuWeather</p>
    `;
}

function forecastBarBuilder(forecastdata){
    let parentHtmlTemplate = "";
    forecastdata.forEach(comingHour =>{
        const date = new Date(comingHour.DateTime);
        const theHour = format(date, "h") + format(date, "aaa");
        const childHtmlTemplate = `
        <div class="time">
            <div class="upper">
                <span class="time-hour">${theHour}</span>
                <div class="img-circle">
                    <img src="img/icons/${comingHour.WeatherIcon}.svg" alt="weather icon">
                </div>
            </div>
            <span class="hourly-forecast">${comingHour.IconPhrase}</span>
        </div>
        `;

        parentHtmlTemplate += childHtmlTemplate;

    });
    return parentHtmlTemplate;
}

function forecastBar(forecastData){
    forecast.innerHTML = forecastBarBuilder(forecastData);
}

const updateUI = function(data){
    const {cityData, weatherData, forecastData} = data;
    weatherPamphlet(cityData, weatherData);
    forecastBar(forecastData);

    load.classList.toggle("process");

};

const errorHandling = (err) =>{
    snackbar.show(err.message, "#8b283c", "white", 4000);
    load.classList.toggle("process");
};

map.addEventListener("click", e =>{
    if(e.target.classList.contains("pin")){
        const cityName = e.target.getAttribute("title");
        load.classList.toggle("process");
        getForecast.fetchData(cityName)
            .then(data => updateUI(data))
            .catch((err) => errorHandling(err));
    }
});

load.classList.toggle("process");
    getForecast.fetchData("kingston")
        .then(data => updateUI(data))
        .catch((err) => errorHandling(err));

// check

if(!localStorage.snackbar){
    snackbar.
        show("Click a pin on the map to see the weather forecast in that area", "white", "steelblue", 15000);
    localStorage.setItem("snackbar", "true");
}

