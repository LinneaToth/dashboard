"use strict"

const dateTime = function () {
    const dateElement = document.querySelector("#date")
    const timeElement = document.querySelector("#time")

    let date = new Date();
    date = date.toDateString();
    date = date.slice(date.indexOf(" "))

    let time = new Date();
    time = time.toTimeString();
    time = time.slice(0, time.lastIndexOf(":"))

    console.log(date, time)

    dateElement.innerText = date;
    timeElement.innerText = time;

    setTimeout(dateTime, 60000);
}


export { dateTime };