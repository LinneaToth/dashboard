"use strict"

export class Backgrounder {
    constructor() {
        this.body = document.querySelector("body");
        this.search = document.querySelector("#themed-bg-input");
        this.searchBtn = document.querySelector("#themed-bg-btn");
        this.randomBgBtn = document.querySelector("#random-bg-btn");
        this.keyBtn = document.querySelector("#api-key-btn")
        this.apiKey; //is there one? Can be true or false
        this.apiKeyValue; //Will be set by the user or gotten from localstorage. 
    }

    async init() {
        await this.apiKeyChecker();
        this.getCurrentWindowDim();
        this.setRandomBg();
        this.searchBtn.addEventListener("click", async () => {
            try {
                console.log("button was clicked!");
                const input = this.search.value;
                let url;

                if (input) {
                    console.log("This was your input:", input);
                    url = await this.getBackgroundURL(input);
                    console.log(url, "was what we got back");
                } else {
                    url = this.getRandomBackgroundURL();
                }

                this.changeBackground(url);

            } catch (e) {
                alert("Something went wrong with your background search!", e.message);
                console.log(e);
            }
        });

        this.randomBgBtn.addEventListener("click", () => {
            this.setRandomBg();
        });

        this.keyBtn.addEventListener("click", () => {
            this.apiKeySet();

        });
    }

    setRandomBg() {
        const url = this.getRandomBackgroundURL();
        this.changeBackground(url);
    }

    getCurrentWindowDim() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    async apiKeyChecker() {
        if (localStorage.getItem("apiKeyValue")) {
            if (await this.validApi()) {
                this.apiKey = true;
                this.search.disabled = false;
                this.searchBtn.disabled = false;
                this.searchBtn.innerText = "Search!";
                this.keyBtn.remove();
            } else {
                this.apiKey = false;
                this.search.disabled = true;
                this.searchBtn.disabled = true;
            }
        } else {
            this.apiKey = false;
            this.search.disabled = true;
            this.searchBtn.disabled = true;
        }
    }

    async apiKeySet() {
        let key = prompt("Please enter your personal PixaBay API Key:")
        if (await this.validApi(key)) {
            localStorage.setItem("apiKeyValue", key);
            this.apiKey = true;
        }
        await this.apiKeyChecker();
    }

    async apiKeyGet() {
        return localStorage.getItem("apiKeyValue");
    }

    async validApi(key = null) {
        if (!key) {
            key = localStorage.getItem("apiKeyValue");
        }

        try {
            const response = await fetch(`https://pixabay.com/api/?key=${key}`);
            return response.ok;
        } catch (error) {
            console.log("Something when wrong trying to validate your API-key!", error)
        }
    }

    getRandomBackgroundURL() {
        this.getCurrentWindowDim();
        return `https://picsum.photos/${this.width}/${this.height}?random&t=${+new Date().getTime()}`; //The last part is added to generate a new link for each request, so the browser doesn't use the cached one
    }


    changeBackground(url) {
        this.body.style = `background-image: url("${url}");`
    }

    async getBackgroundURL(userInput = null) {
        await this.apiKeyChecker();

        if (userInput === null || this.apiKey === false) {
            console.log("no input, lets await something random")
            const url = await this.getRandomBackgroundURL();
            return url;

        } else if (userInput && this.apiKey === true) {
            try {
                let key = localStorage.getItem("apiKeyValue");
                const imgResult = await fetch(`https://pixabay.com/api/?key=${key}&q=${userInput}`);
                const imgObj = await imgResult.json();

                console.log("img obj: " + imgObj);

                if (imgObj.hits.length > 0) {
                    const validHits = imgObj.hits.filter(hit => hit.largeImageURL);

                    if (validHits.length === 0) {
                        console.log("no valid hits with large image found");
                        return this.getRandomBackgroundURL();
                    }
                    const randomIndex = Math.floor(Math.random() * validHits.length);
                    const imgUrl = validHits[randomIndex].largeImageURL;
                    return imgUrl;
                } else {
                    alert(`No search hits for "${userInput}"`);
                    const url = await this.getRandomBackgroundURL();
                    this.search.value = "";
                    return url;
                }
            } catch (error) {
                console.log("Something went wrong over at the background fetching!", error);
            }

        }
    }
}

// ---------------------------------------------------------

// const getBackgroundURL = async function (search) {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     console.log(search);
//     let personalAccessKey = null;

//     if (search) {
//         if (!localStorage.getItem("personalAccessKeyPixaBay")) {
//             personalAccessKey = prompt("Please enter your personal access key at PixaBay to use this feature");

//             localStorage.setItem("personalAccessKeyPixaBay", personalAccessKey);

//         } else {
//             personalAccessKey = localStorage.getItem("personalAccessKeyPixaBay");
//         }


//         const searchString = !search ? "q=image_type=photo" : search + "&image_type=photo";
//         console.log(searchString)

//         try {
//             console.log(`https://pixabay.com/api/?key=${personalAccessKey}&q=${searchString}`)
//             const imgResult = await fetch(`https://pixabay.com/api/?key=${personalAccessKey}&q=${searchString}`);
//             console.log(imgResult);
//             const imgObj = await imgResult.json();
//             console.log(imgObj);

//             if (imgObj.hits.length > 0) {

//                 let hitsIndex = Math.floor(Math.random() * 19);
//                 //it always returns an array of 20 items

//                 //Sometimes a large image is not provided in the search result. This runs until it gets a hit where there actually is one!
//                 while (!imgObj.hits[hitsIndex].largeImageURL) {
//                     hitsIndex = Math.floor(Math.random() * 19);
//                 }

//                 let imgUrl = imgObj.hits[hitsIndex].largeImageURL;

//                 return imgUrl;
//             } else {

//                 alert(`No search hits for "${search}"`);
//                 return `https://pixabay.com/api/?key=${personalAccessKey}&q=*`;
//             }

//         }
//         catch (error) {
//             console.log(error);
//         }
//     } else if (!search) {

//         console.log("you're getting an image from picsum..")
//         return `https://picsum.photos/${width}/${height}?random&t=${+new Date().getTime()}`; //The last part is added to generate a new link for each request, so the browser doesn't use the cached one
//     }
// }

// const changeBackground = async function (userInput) {
//     const url = await getBackgroundURL(userInput);
//     const body = document.querySelector("body");
//     body.style = `background-image: url("${url}");`
// }



// export { changeBackground }