import { Backgrounder } from "./background.js";
import { WeatherMaker } from "./weather.js";
import { DateTime } from "./timedate.js";
import { Linker } from "./links.js";
import { RandomFactDeliverer } from "./randomFact.js";
import { Heading } from "./heading.js";
import { Notepad } from "./notepad.js";

"use strict"

//Changing the name title
const heading = new Heading();

//Notepad functionality
const notes = new Notepad();

//Date & time functionality
const dateTime = new DateTime();

//Link functionality
const links = new Linker();

//Background funktionality
const backgroundItem = new Backgrounder();
backgroundItem.init();

//Weather
const weatherMaker = new WeatherMaker();
weatherMaker.init("https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max&timezone=Europe%2FBerlin&forecast_days=3");

//Random fact
const randomiser = new RandomFactDeliverer();
randomiser.init("https://catfact.ninja/fact");
