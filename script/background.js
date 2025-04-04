"use strict"

export class backgroundChanger {

}

const checkKey = async function (url) {

}


const getBackgroundURL = async function (search) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    console.log(search);
    let personalAccessKey = null;

    if (search) {
        if (!localStorage.getItem("personalAccessKeyPixaBay")) {
            personalAccessKey = prompt("Please enter your personal access key at PixaBay to use this feature");

            localStorage.setItem("personalAccessKeyPixaBay", personalAccessKey);
            //const personalAccessKey = "46839803-e2eda84b6d67f6e91a5ab5635"
        } else {
            personalAccessKey = localStorage.getItem("personalAccessKeyPixaBay");
        }


        const searchString = !search ? "q=image_type=photo" : search + "&image_type=photo";
        console.log(searchString)

        try {
            console.log(`https://pixabay.com/api/?key=${personalAccessKey}&q=${searchString}`)
            const imgResult = await fetch(`https://pixabay.com/api/?key=${personalAccessKey}&q=${searchString}`);
            console.log(imgResult);
            const imgObj = await imgResult.json();
            console.log(imgObj);

            if (imgObj.hits > 0) {

                let hitsIndex = Math.floor(Math.random() * 19);
                //it always returns an array of 20 items

                //Sometimes a large image is not provided in the search result. This runs until it gets a hit where there actually is one!
                while (!imgObj.hits[hitsIndex].largeImageURL) {
                    hitsIndex = Math.floor(Math.random() * 19);
                }

                let imgUrl = imgObj.hits[hitsIndex].largeImageURL;

                return imgUrl;
            } else {
                alert(`No search hits for "${search}"`);
                return `https://pixabay.com/api/?key=${personalAccessKey}&q=*`;
            }

        }
        catch (error) {
            console.log(error);
        }
    } else if (!search) {

        console.log("you're getting an image from picsum..")
        return `https://picsum.photos/${width}/${height}?random&t=${+new Date().getTime()}`; //The last part is added to generate a new link for each request, so the browser doesn't use the cached one
    }
}

const changeBackground = async function (userInput) {
    const url = await getBackgroundURL(userInput);
    const body = document.querySelector("body");
    body.style = `background-image: url("${url}");`
}

export { changeBackground }