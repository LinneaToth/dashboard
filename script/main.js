import { getBackgroundURL } from "./background.js";
import { weatherItems } from "./weather.js";
import { dateTime } from "./timedate.js";
import { addLink, getAllStoredLinks } from "./links.js";
import { pixabayKey } from "./config.js";

"use strict"

dateTime();


const addLinkForm = document.querySelector("#links-form");
const addLinkBtn = document.querySelector("#add-link-button");



addLinkBtn.addEventListener("click", () => {
    console.log("click");
    const addLinkName = document.querySelector("#link-name");
    const addLinkURL = document.querySelector("#link-url");

    const linkName = addLinkName.value;
    const linkURL = addLinkURL.value;

    addLink(linkName, linkURL);

    getAllStoredLinks();
    console.log({ ...localStorage })
})

async function populatePage() {
    await weatherItems();
}

populatePage();