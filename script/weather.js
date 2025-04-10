import { Section } from "./sectionClass.js";

"use strict"

export class WeatherMaker extends Section {

    constructor() {
        super();
        this.iconsLegend = new Map([ //A map made from the API:s weather codes, and matched to description and icons found on Pixabay
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

    async init(url) {
        this.url = url;
        await this.weatherDOM();
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

    //Gets weather from open-meteo
    async getWeather() {
        if (this.currentLocation === true) {
            const coordinates = await this.getCurrentLocation();
            [this.lat, this.long] = coordinates;
        }
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.long}&daily=weather_code,temperature_2m_max&timezone=Europe%2FBerlin&forecast_days=3`); //https://open-meteo.com/en/docs
        const weatherData = await weatherResponse.json();
        return weatherData;
    }

    //Putting elements together and adding them to the page
    async weatherDOM() {
        this.weatherContainer.innerHTML = "";
        let weatherHeader = ("Weather " + (this.currentLocation ? "here" : "in " + this.otherLocation));
        const h2 = this.buildElement("h2", weatherHeader);
        this.weatherContainer.appendChild(h2);

        const weatherData = await this.getWeather();

        for (let i = 0; i < 3; i++) { //For earch day. We only need three. 
            const weatherCode = weatherData.daily.weather_code[i];
            const tempMax = this.buildElement("p", "Max " + Math.ceil(weatherData.daily.temperature_2m_max[i]) + "°C", null, "tempmax");
            const article = this.buildElement("article", null, `w${i}`);
            const day = this.buildElement("h3");

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
            const weather = this.buildElement("img", null, null, "icon");
            weather.src = `./img/weather-icons/${this.iconsLegend.get(weatherCode)?.img}`
            weather.alt = `${this.iconsLegend.get(weatherCode)?.desc}`
            const weatherTxt = this.buildElement("p", this.iconsLegend.get(weatherCode)?.desc, null, "weather-text");
            article.append(weather, day, tempMax, weatherTxt)
            this.weatherContainer.appendChild(article);
        }

        //For setting the location
        this.locationBtn = this.buildElement("button", "Location", "open-location-options-btn");
        const locationIcon = this.buildElement("i", null, null, ["fa-solid", "fa-location-dot"]);
        this.locationBtn.prepend(locationIcon);

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

    //Getting search results from user's input. 
    async changeLocation(input) {
        if (input) {
            this.otherLocation = input;
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=10&language=en&format=json`)
            let searchResult = await response.json();


            if (!searchResult.results || searchResult.results.length === 0) {
                alert(`No results found for "${input}". Try another city.`);
                return;
            }

            searchResult = searchResult.results;

            const select = this.buildElement("select");
            const option = this.buildElement("option", `Search results for ${input}:`);
            select.appendChild(option);

            this.newLocationInput.classList.toggle("hidden");
            this.changeLocationBtn.classList.toggle("hidden");

            //Adding results to select element, as options
            for (let location of searchResult) {
                const option = this.buildElement("option", `${location.name}, ${location.country}`);
                option.value = location.id;
                select.appendChild(option);
            }

            //When one search result is selected, weather forecast is fetched for chosen location
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

        } else {
            alert("Please enter a location in the search field!")
        }
    }
}
