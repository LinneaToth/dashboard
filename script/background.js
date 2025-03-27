"use strict"

const getBackgroundURL = async function (search = null) {
    const personalAccessKey = "46839803-e2eda84b6d67f6e91a5ab5635"
    const searchString = !search ? "q=image_type=photo" : search + "&image_type=photo";
    console.log(searchString)

    const imgResult = await fetch(`https://pixabay.com/api/?key=${personalAccessKey}{&q=${searchString}`);
    console.log(imgResult);
    const imgUrl = await imgResult.json();

    console.log(imgUrl)
}

export { getBackgroundURL }