"use strict"

const dateTime = function () {
    const dateElement = document.querySelector("#date")
    const timeElement = document.querySelector("#time")

    let date = new Date();
    date = date.toLocaleDateString("sv-SE");

    let time = new Date();
    time = time.toTimeString();
    time = time.slice(0, time.lastIndexOf(":"))

    dateElement.innerText = date;
    timeElement.innerText = time;

    setTimeout(dateTime, 1000);
}


export { dateTime };