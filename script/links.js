import { Section } from "./sectionClass.js"

"use strict"

export class Linker extends Section {
    constructor() {
        super();
        this.links = [];
        this.container = document.querySelector("#quick-links");
    }

    init() {
        this.checkForStoredLinks();
        this.domBuilder();
        // this.addBtn.addEventListener("click", () => {
        //     const linkName = document.querySelector("#link-name").value;
        //     const linkURL = document.querySelector("#link-url");
        // });
    }

    checkForStoredLinks() {
        let storedLinks = localStorage.getItem("links");
        let parsedStoredLinks = JSON.parse(storedLinks) || [];

        if (parsedStoredLinks.length > 0) {
            this.links = parsedStoredLinks;
        } else {
            // this.links = [
            //     { linkName: "Placehold", linkUrl: "https://placehold.co/", faviconURL: "https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://placehold.co/&size=128" }]
            console.log("There are no links to add")
        }
    }


    clearLocalStorageLinks() {
        localStorage.removeItem("links");
    }

    getAmtLinks() {
        this.checkForStoredLinks();
        const amt = this.links.length;
        if (amt >= 0) {
            return Number(amt || 0);
        } else {
            return 0;
        }
    }

    saveLinksToLocalStorage() {
        localStorage.setItem("links", JSON.stringify(this.links));
    }

    getFaviconURL(domain) {

        if (domain != "URL missing") {

            if (domain.lastIndexOf("https://") != -1) {
                domain = domain.slice(domain.lastIndexOf("https://") + 8);
                console.log(domain);
            }


            if (domain.lastIndexOf("http://") != -1) {
                domain = domain.slice(domain.lastIndexOf("http://") + 7);
                console.log(domain);
            }

            let faviconURL = `https://www.google.com/s2/favicons?domain=https://${domain}&sz=40`
            return faviconURL;

        } else {
            return `https://cdn.pixabay.com/photo/2017/01/31/20/34/image-2027072_960_720.png`
        }
    }

    addLink(linkNameInput = "No name", linkUrlInput = "URL missing") {

        if (this.links.length < 4) {
            const favIconURL = this.getFaviconURL(linkUrlInput);
            console.log(favIconURL);
            this.links.push({ "linkName": linkNameInput, "linkUrl": linkUrlInput, "faviconURL": favIconURL });
            console.log(this.links);
            this.saveLinksToLocalStorage();
        } else {
            alert("Maximum amount of stored links has been reached");
        }
    }

    linkCardBuilder(linkObj, index) {
        const article = this.buildElement("article");
        const favicon = this.buildElement("img", null, null, "favicon");
        favicon.src = linkObj.faviconURL;
        const linkName = this.buildElement("h3", linkObj.linkName);
        const anchorTag = this.buildElement("a");
        anchorTag.href = linkObj.linkUrl;
        anchorTag.appendChild(linkName);

        const removeLinkBtn = this.buildElement("button", "✖", null, "rembovebtn");

        removeLinkBtn.addEventListener("click", () => {
            article.remove();
            this.links.splice(index, 1);
            this.saveLinksToLocalStorage();
        })

        article.append(favicon, anchorTag, removeLinkBtn);
        return article;
    }

    domBuilder() {
        this.container.innerHTML = "";
        const heading = this.buildElement("h2", "Quick Links");
        this.container.append(heading);
        console.log("dom builder says hello")

        for (let i = 0; i < this.links.length; i++) {
            const card = this.linkCardBuilder(this.links[i], i);
            this.container.append(card);
        }

        const addContainer = this.buildElement("aside", null, "add-links-container");
        const addLinkInputName = this.buildElement("input", null, "input-link-name");
        addLinkInputName.type = "text";
        addLinkInputName.placeholder = "Site name";
        const addLinkInputUrl = this.buildElement("input", null, "input-link-url");
        addLinkInputUrl.type = "text";
        addLinkInputUrl.placeholder = "Link to site";
        const addLinkInputButton = this.buildElement("button", "Add Link", "link-input-btn");

        addContainer.append(addLinkInputName, addLinkInputUrl, addLinkInputButton);
        this.container.append(addContainer);

        addLinkInputButton.addEventListener("click", () => {
            const name = addLinkInputName.value;
            const url = addLinkInputUrl.value;
            this.addLink(name, url);
            this.domBuilder();
        })

    }
}


// function addLink(linkName = "No name", linkUrl = "URL missing") {
//     if (getAllStoredLinks().length < 6) {
//         console.log("link is being added.. wait for it")
//         let index = getAllStoredLinks().length;
//         const faviconURL = getFaviconURL(linkUrl);

//         localStorage.setItem(`link${index}`, [linkName, linkUrl, faviconURL])
//     } else {
//         alert("Cannot store more links!");
//     }
// }

// function getFaviconURL(domain) {

//     if (domain != "URL missing") {

//         if (domain.lastIndexOf("https://") != -1) {
//             domain = domain.slice(domain.lastIndexOf("https://") + 8);
//             console.log(domain);
//         }

//         let faviconURL = `https://www.google.com/s2/favicons?domain=https://${domain}&sz=128`
//         return faviconURL;

//     } else {
//         return `https://cdn.pixabay.com/photo/2017/01/31/20/34/image-2027072_960_720.png`
//     }

// }

// function getAllStoredLinks() {
//     const allStoredItems = { ...localStorage }; //puts everything from local storage in an object
//     const allKeys = Object.keys(allStoredItems); //Returns an array with all of local storage keys
//     const storedLinks = allKeys.filter(onlyLinks);

//     function onlyLinks(key) {
//         return key.includes("link");
//     }

//     return storedLinks;

// }


// function linkToDom(linkName = "No name", linkUrl = "URL missing") {

// }

// export { addLink, getAllStoredLinks };
