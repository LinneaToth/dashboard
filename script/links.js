"use strict"


function addLink(linkName = "No name", linkUrl = "URL missing") {
    if (getAllStoredLinks().length < 6) {
        console.log("link is being added.. wait for it")
        let index = getAllStoredLinks().length;
        const faviconURL = getFaviconURL(linkUrl);

        localStorage.setItem(`link${index}`, [linkName, linkUrl, faviconURL])
    } else {
        alert("Cannot store more links!");
    }
}

function getFaviconURL(domain) {

    if (domain != "URL missing") {

        if (domain.lastIndexOf("https://") != -1) {
            domain = domain.slice(domain.lastIndexOf("https://") + 8);
            console.log(domain);
        }

        let faviconURL = `https://www.google.com/s2/favicons?domain=https://${domain}&sz=128`
        return faviconURL;

    } else {
        return `https://cdn.pixabay.com/photo/2017/01/31/20/34/image-2027072_960_720.png`
    }

}

function getAllStoredLinks() {
    const allStoredItems = { ...localStorage }; //puts everything from local storage in an object
    const allKeys = Object.keys(allStoredItems); //Returns an array with all of local storage keys
    const storedLinks = allKeys.filter(onlyLinks);

    function onlyLinks(key) {
        return key.includes("link");
    }

    return storedLinks;

}


function linkToDom(linkName = "No name", linkUrl = "URL missing") {

}

export { addLink, getAllStoredLinks };
