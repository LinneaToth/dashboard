import { changeBackground } from "./background.js";
import { weatherItems } from "./weather.js";
import { dateTime } from "./timedate.js";
import { addLink, getAllStoredLinks } from "./links.js";
import { RandomFactDeliverer } from "./randomFact.js";

"use strict"

//Changing the name title
const nameText = document.querySelector("#name-text");
nameText.value = localStorage.getItem("nameText") || "John Doe Dashboard";

nameText.addEventListener("input", () => {
    console.log(nameText.value);
    localStorage.setItem("nameText", nameText.value);
})


//Notepad functionality
const notes = document.querySelector("#notepad");
notes.value = localStorage.getItem("notepad") || "";

notes.addEventListener("input", () => {
    console.log(notes.value);
    localStorage.setItem("notepad", notes.value);
})

//Date & time functionality
dateTime();

//Link functionality
const addLinkBtn = document.querySelector("#add-link-button");
const addLinkForm = document.querySelector("#links-form");

addLinkBtn.addEventListener("click", () => {
    const linkName = document.querySelector("#link-name").value;
    const linkURL = document.querySelector("#link-url");

    addLink(linkName, linkURL);

    getAllStoredLinks();
    console.log({ ...localStorage })
})

//linkItems();

//Background funktionality
changeBackground(); //makes sure there is a background to begin with
const randomBgBtn = document.querySelector("#random-bg-btn");
const themedBgBtn = document.querySelector("#themed-bg-btn");
const themedBgInput = document.querySelector("#themed-bg-input");

randomBgBtn.addEventListener("click", () => {
    changeBackground()
})

themedBgBtn.addEventListener("click", () => {
    console.log(themedBgInput.value);
    changeBackground(themedBgInput.value);
    if (!themedBgInput.value) {
        alert("You didn't wish for something specific, so I will get a random picture for you!")
    }
})

//Weather
weatherItems();

//Random fact
const randomiser = new RandomFactDeliverer("https://uselessfacts.jsph.pl/api/v2/facts/random");
randomiser.init();