"use strict"

export class WeatherMaker {

    constructor(url) {
        this.url = url;
        this.iconsLegend = new Map([
            [0, { img: "clear.png", desc: "clear" }],
            [1, { img: "partly.png", desc: "mostly clear" }],
            [2, { img: "partly.png", desc: "partly cloudy" }],
            [3, { img: "cloudy.png", desc: "overcast" }],
            [45, { img: "cloudy.png", desc: "fog" }],
            [48, { img: "cloudy", desc: "icy fog" }],
            [51, { img: "rain.png", desc: "light drizzle" }],
            [53, { img: "rain.png", desc: "drizzle" }],
            [55, { img: "rain.png", desc: "heavy drizzle" }],
            [80, { img: "rain.png", desc: "light showers" }],
            [81, { img: "rain.png", desc: "showers" }],
            [82, { img: "rain.png", desc: "heavy showers" }],
            [61, { img: "rain.png", desc: "light rain" }],
            [63, { img: "rain.png", desc: "rain" }],
            [65, { img: "rain.png", desc: "heavy rain" }],
            [56, { img: "icy.png", desc: "light freezing drizzle" }],
            [57, { img: "icy.png", desc: "freezing drizzle" }],
            [66, { img: "icy.png", desc: "light freezing rain" }],
            [67, { img: "icy.png", desc: "freezing rain" }],
            [77, { img: "icy.png", desc: "snow grains" }],
            [85, { img: "icy.png", desc: "light snow showers" }],
            [86, { img: "icy.png", desc: "snow showers" }],
            [71, { img: "icy.png", desc: "light snow" }],
            [73, { img: "icy.png", desc: "snow" }],
            [75, { img: "icy.png", desc: "heavy snow" }],
            [95, { img: "partly.png", desc: "thunderstorm" }],
            [96, { img: "partly.png", desc: "thunderstorm with hail" }],
            [99, { img: "partly.png", desc: "thunderstorm with hail" }],
        ]);
        this.lat;
        this.long;
        this.currentLocation = true;
        this.otherLocation;
        this.weatherContainer = document.getElementById("weather");
    }

    init() {
        this.weatherDOM();
    }

    getWeekday(displacement) {
        const date = new Date();
        const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let index = date.getDay() + displacement;
        if (index > 6) { index = (index % 6) - 1 }
        let weekday = weekdayNames[index];
        return weekday;
    }

    async getLocation() {
        return new Promise((resolve, reject) => {

            if (!navigator.geolocation) {
                reject("Your browser does not support geolocation");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;
                    resolve([lat, long]); // Returns coordinates in an array
                });
        })
    }

    async getWeather() {
        if (this.currentLocation === true) {
            const coordinates = await this.getLocation();
            [this.lat, this.long] = coordinates;
            console.log("from getweather()", coordinates, this.lat, this.long);
        }
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.long}&daily=weather_code,temperature_2m_max&timezone=Europe%2FBerlin&forecast_days=3`); //https://open-meteo.com/en/docs
        const weatherData = await weatherResponse.json();
        console.log(weatherData);
        return weatherData;
    }

    async weatherDOM() {
        this.weatherContainer.innerHTML = "";
        const h2 = document.createElement("h2");
        h2.innerText = "Weather Forecast";
        this.weatherContainer.appendChild(h2);

        const weatherData = await this.getWeather();

        for (let i = 0; i < 3; i++) { //We only need three days. 
            const weatherCode = weatherData.daily.weather_code[i];
            const tempMax = document.createElement("p");
            tempMax.innerText = "Max " + Math.ceil(weatherData.daily.temperature_2m_max[i]) + "°C";
            tempMax.classList.add("tempmax");
            const article = document.createElement("article");
            article.id = `w${i}`;
            const day = document.createElement("h3");
            switch (i) {
                case 0:
                    day.innerText = "Today";
                    break;
                case 1:
                    day.innerText = "Tomorrow";
                    break;
                case 2:
                    day.innerText = this.getWeekday(2);
            }
            const tempElement = document.createElement("p");
            tempElement.innerText = tempMax;
            const weather = document.createElement("img");
            weather.classList.add("icon");
            weather.src = `./img/weather-icons/${this.iconsLegend.get(weatherCode)?.img}`
            weather.alt = `${this.iconsLegend.get(weatherCode)?.desc}`
            const weatherTxt = document.createElement("p");
            weatherTxt.classList.add("weather-text")
            weatherTxt.innerText = this.iconsLegend.get(weatherCode)?.desc;

            article.append(weather, day, tempMax, weatherTxt)
            this.weatherContainer.appendChild(article);
            console.log(article);
        }


        const currentLocationBtn = document.createElement("button");
        currentLocationBtn.innerText = "Current location";
        currentLocationBtn.id = "current-location-btn";

        currentLocationBtn.addEventListener("click", () => {
            this.currentLocation = true;
            this.weatherDOM();
        });

        const changeLocationBtn = document.createElement("button");
        changeLocationBtn.innerText = "Search";
        changeLocationBtn.id = "change-location-btn";

        changeLocationBtn.addEventListener("click", () => {
            let value = newLocationInput.value;
            this.changeLocation(value);
        });

        const newLocationInput = document.createElement("input");
        newLocationInput.type = "text";

        this.weatherContainer.append(currentLocationBtn, newLocationInput, changeLocationBtn);
    }

    async changeLocation(input) {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=10&language=en&format=json`)
        let searchResult = await response.json();
        searchResult = searchResult.results;
        console.log(searchResult);

        const select = document.createElement("select");

        for (let location of searchResult) {
            const option = document.createElement("option");
            option.value = location.id;
            option.innerText = `${location.name}, ${location.country}`;
            select.appendChild(option);
            console.log(`${location.name}, ${location.country}`)
        }

        select.addEventListener("change", () => {
            let id = select.value;
            let chosenLocation = searchResult.find((element) => Number(element.id) === Number(id));
            this.lat = chosenLocation.latitude;
            this.long = chosenLocation.longitude;

            this.currentLocation = false;
            this.weatherDOM();
        })

        this.weatherContainer.appendChild(select);
    }
}
