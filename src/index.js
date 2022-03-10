import './style.css';

const apiKey = "0085e2529c794fe54e1b0c3f0f266a4f"

const getWeatherData = async function(location) {
    const call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`, {mode: 'cors'})
    .then(async (data) => {
        if (data.ok) {
            data = await data.json()
            console.log(data);
            let weatherData = {'main': data.main, 'name': data.name, 'weather': data.weather, 'wind': data.wind};
            console.log(weatherData);
            displayData(weatherData);
        } else {
            throw new Error(data.status + " Failed Fetch ");
        }
    }).catch(e => {
        errorMsg();
    })
}

getWeatherData('auckland')

const formInput = function() {
    const form = document.querySelector("form");
    const input = document.querySelector("#locationInput");
    const msg = document.querySelector("#errorMessage");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        getWeatherData(input.value);
        form.reset();
        msg.style.display = "none";
    })
};

formInput();

const errorMsg = function() {
    const msg = document.querySelector("#errorMessage");
    msg.style.display = "block";
}

const displayData = function(object) {
    const weatherCondition = document.querySelector("#weather");
    const location = document.querySelector("#location");
    const temperature = document.querySelector("#temperature");
    const feelsLike = document.querySelector("#feelsLike");
    const humidity = document.querySelector("#humidity");
    const wind = document.querySelector("#wind")

    weatherCondition.textContent = `${object.weather[0].description.toUpperCase()}`
    location.textContent = `${object.name}`
    temperature.textContent = `${Math.round(object.main.temp)} °C`

    feelsLike.textContent = `${Math.round(object.main.feels_like)} °C`
    humidity.textContent = `${object.main.humidity} %`
    wind.textContent = `${object.wind.speed} km/h`
}

displayData