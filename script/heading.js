"use strict"

export class Heading {
    constructor() {
        this.nameElement = document.querySelector("#name-text");
        this.nameElement.value = localStorage.getItem("nameText") || "John Doe Dashboard";
        this.nameElement.addEventListener("input", () => {
            localStorage.setItem("nameText", this.nameElement.value);
        });

        this.mqBreakPointMobile = window.matchMedia("(max-width: 750px");
        this.mqBreakPointMobile.addEventListener("change", this.headingAdjuster);

        this.headingAdjuster(this.mqBreakPointMobile);
    }

    headingAdjuster(event) {
        const windowWidth = window.screen.width;

        if (event.matches) {
            this.nameElement.rows = "2";
            this.nameElement.columns = "18";
        }
    }
}