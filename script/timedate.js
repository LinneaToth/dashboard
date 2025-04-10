"use strict"

export class DateTime {
    constructor() {
        this.timer();
    }

    //using recursion to update the time every second, to ensure the actual time is on display
    timer() {
        const dateElement = document.querySelector("#date");
        const timeElement = document.querySelector("#time");

        let date = new Date().toLocaleDateString("sv-SE"); //Formatting the date in a way familiar to Swedes
        let time = new Date().toTimeString();
        time = time.slice(0, time.lastIndexOf(":"));

        dateElement.innerText = date;
        timeElement.innerText = time;

        setTimeout(this.timer.bind(this), 1000); //"this" context of the object is lost when timer() calls itself unless bound 
    }
}