import './style.css';

const apiKey = "0085e2529c794fe54e1b0c3f0f266a4f"
let weatherData;

const getWeatherData = async function(location) {
    try {
        const call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`, {mode: 'cors'});
        console.log(call);
        data = await call.json();
        console.log(data);
        weatherData = data.main;
        console.log(weatherData);
        return weatherData;

    } catch(error) {
        console.log(error);
        console.log("hi");
    };
}

const formInput = function() {
    const form = document.querySelector("form");
    const input = document.querySelector("#location");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        getWeatherData(input.value);
    })
};

formInput();