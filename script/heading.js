"use strict"

export class Heading {
    constructor() {
        //Ensures that the stored heading is in sync with what is displayed on the page 
        this.nameElement = document.querySelector("#name-text");
        this.nameElement.value = localStorage.getItem("nameText") || "John Doe Dashboard";
        //Listens for updates to the text and stores it
        this.nameElement.addEventListener("input", () => {
            localStorage.setItem("nameText", this.nameElement.value);
        });

        //To make it fit a smaller screen
        this.mqBreakPointMobile = window.matchMedia("(max-width: 750px");
        this.mqBreakPointMobile.addEventListener("change", this.headingAdjuster);
        this.headingAdjuster(this.mqBreakPointMobile);
    }

    //Changes the setup of the heading to make it fit a smaller screen
    headingAdjuster(event) {
        if (event.matches) {
            this.nameElement.rows = "2";
            this.nameElement.columns = "18";
        }
    }
}