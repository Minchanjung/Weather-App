import './style.css';

const apiKey = "0085e2529c794fe54e1b0c3f0f266a4f"
let weatherData;

const getWeatherData = async function(location) {
    const call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`, {mode: 'cors'})
    .then(async (data) => {
        if (data.ok) {
            data = await data.json()
            console.log(data);
            weatherData = {'main': data.main, 'weather': data.weather};
            console.log(weatherData);
            return weatherData;
        } else {
            throw new Error(data.status + " Failed Fetch ");
        }
    }).catch(e => {
        errorMsg();
    })
}

const formInput = function() {
    const form = document.querySelector("form");
    const input = document.querySelector("#location");
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