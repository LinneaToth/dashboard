import { Section } from "./sectionClass.js";

"use strict"

export class WeatherMaker extends Section {

    constructor() {
        super();
        this.iconsLegend = new Map([
            [0, { img: "clear.png", desc: "Clear" }],
            [1, { img: "partly.png", desc: "Mostly clear" }],
            [2, { img: "partly.png", desc: "Partly cloudy" }],
            [3, { img: "cloudy.png", desc: "Overcast" }],
            [45, { img: "cloudy.png", desc: "Fog" }],
            [48, { img: "cloudy", desc: "Icy fog" }],
            [51, { img: "rain.png", desc: "Light drizzle" }],
            [53, { img: "rain.png", desc: "Drizzle" }],
            [55, { img: "rain.png", desc: "Heavy drizzle" }],
            [80, { img: "rain.png", desc: "Light showers" }],
            [81, { img: "rain.png", desc: "Showers" }],
            [82, { img: "rain.png", desc: "Heavy showers" }],
            [61, { img: "rain.png", desc: "Light rain" }],
            [63, { img: "rain.png", desc: "Rain" }],
            [65, { img: "rain.png", desc: "Heavy rain" }],
            [56, { img: "icy.png", desc: "Light freezing drizzle" }],
            [57, { img: "icy.png", desc: "Freezing drizzle" }],
            [66, { img: "icy.png", desc: "Light freezing rain" }],
            [67, { img: "icy.png", desc: "Freezing rain" }],
            [77, { img: "icy.png", desc: "Snow grains" }],
            [85, { img: "icy.png", desc: "Light snow showers" }],
            [86, { img: "icy.png", desc: "Snow showers" }],
            [71, { img: "icy.png", desc: "Light snow" }],
            [73, { img: "icy.png", desc: "Snow" }],
            [75, { img: "icy.png", desc: "Heavy snow" }],
            [95, { img: "thunder.png", desc: "Thunderstorm" }],
            [96, { img: "thunder.png", desc: "Thunderstorm with hail" }],
            [99, { img: "thunder.png", desc: "Thunderstorm with hail" }],
        ]);
        this.lat;
        this.long;
        this.currentLocation = true;
        this.otherLocation;
        this.searchVisible = true;
        this.weatherContainer = document.getElementById("weather");
    }

    init(url) {
        this.url = url;
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

    async getCurrentLocation() {
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
            const coordinates = await this.getCurrentLocation();
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
        let weatherHeader = ("Weather " + (this.currentLocation ? "here" : "in " + this.otherLocation));
        const h2 = this.buildElement("h2", weatherHeader);
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
        }

        this.locationBtn = this.buildElement("button", "Location", "open-location-options-btn");

        this.locationContainer = this.buildElement("aside", null, "location-container", "hidden");
        this.currentLocationBtn = this.buildElement("button", "Here", "current-location-btn");

        this.locationBtn.addEventListener("click", () => {
            this.locationContainer.classList.toggle("hidden");
            this.locationBtn.classList.toggle("hidden");
        })

        this.currentLocationBtn.addEventListener("click", () => {
            this.currentLocation = true;
            this.weatherDOM();
        });


        this.changeLocationBtn = this.buildElement("button", "Search", "change-location-btn");

        this.changeLocationBtn.addEventListener("click", () => {
            let value = this.newLocationInput.value;
            this.changeLocation(value);
        });

        this.newLocationInput = this.buildElement("input")
        this.newLocationInput.type = "text";
        this.newLocationInput.placeholder = "Name of city"

        this.locationContainer.append(this.currentLocationBtn, this.newLocationInput, this.changeLocationBtn)
        this.weatherContainer.append(this.locationBtn, this.locationContainer);
    }

    async changeLocation(input) {
        if (input) {
            this.otherLocation = input;
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=10&language=en&format=json`)
            let searchResult = await response.json();
            searchResult = searchResult.results;
            console.log(searchResult);

            const select = document.createElement("select");
            const option = document.createElement("option");
            option.innerText = `Search results for ${input}:`;
            select.appendChild(option);

            this.newLocationInput.classList.toggle("hidden");
            this.changeLocationBtn.classList.toggle("hidden");

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
                this.locationBtn.classList.toggle("hidden");
            })

            this.locationContainer.appendChild(select);
            select.active();
        } else {
            alert("Please enter a location in the search field!")
        }
    }
}
