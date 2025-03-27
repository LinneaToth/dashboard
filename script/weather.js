const weatherContainer = document.getElementById("weather");

function getLocation() {
    function success(position) {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const coords = [lat, long];

        console.log("Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude)
        weatherContainer.innerHTML = "Latitude: " + position.coords.latitude +
            "<br>Longitude: " + position.coords.longitude;

    }

    function error() {
        alert("Sorry, no position available.");
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);

    } else {
        console.log("Geolocation is not supported by this browser.");
    }

}

const weatherAPIKey = "4b5a6563a67cba6ddbeac1b73cbc187c"

async function getWeather(lat, lon, key) {
    const weatherResponse = fetch(`api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`)
    const weatherData = weatherResponse.json();

    console.log(weatherData);
}

let coordinates = getLocation();


getWeather(...coordinates, weatherAPIKey);

export { getLocation, getWeather }