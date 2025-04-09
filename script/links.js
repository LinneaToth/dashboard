import { Section } from "./sectionClass.js"

"use strict"

export class Linker extends Section {
    constructor() {
        super();
        this.links = [];
        this.container = document.querySelector("#quick-links");
        this.checkForStoredLinks();
        this.domBuilder();
    }

    checkForStoredLinks() {
        let storedLinks = localStorage.getItem("links");
        let parsedStoredLinks = JSON.parse(storedLinks) || [];

        if (parsedStoredLinks.length > 0) {
            this.links = parsedStoredLinks;
        } else {
            console.log("There are no links to add")
        }
    }

    saveLinksToLocalStorage() {
        localStorage.setItem("links", JSON.stringify(this.links));
    }

    getFaviconURL(domain) {
        if (domain != "URL missing") {
            if (domain.lastIndexOf("https://") != -1) {
                domain = domain.slice(domain.lastIndexOf("https://") + 8);
            }

            if (domain.lastIndexOf("http://") != -1) {
                domain = domain.slice(domain.lastIndexOf("http://") + 7);
            }

            let faviconURL = `https://www.google.com/s2/favicons?domain=https://${domain}&sz=40`
            return faviconURL;

        } else {
            return `https://cdn.pixabay.com/photo/2017/01/31/20/34/image-2027072_960_720.png`
        }
    }

    addLink(linkNameInput = "No name", linkUrlInput = "URL missing") {

        if (this.links.length < 5) {
            const favIconURL = this.getFaviconURL(linkUrlInput);
            this.links.push({ "linkName": linkNameInput, "linkUrl": linkUrlInput, "faviconURL": favIconURL });
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

        for (let i = 0; i < this.links.length; i++) {
            const card = this.linkCardBuilder(this.links[i], i);
            this.container.append(card);
        }

        const addLinkBtn = this.buildElement("button", " Add Link", "add-link-btn");
        const linkIcon = this.buildElement("i", null, null, ["fa-solid", "fa-link"]);
        addLinkBtn.prepend(linkIcon);

        const addForm = this.buildElement("aside", null, "add-links-container", "hidden");
        const addLinkInputName = this.buildElement("input", null, "input-link-name");
        addLinkInputName.type = "text";
        addLinkInputName.autocomplete = "off";
        addLinkInputName.placeholder = "Site name";
        const addLinkInputUrl = this.buildElement("input", null, "input-link-url");
        addLinkInputUrl.type = "text";
        addLinkInputUrl.autocomplete = "off";
        addLinkInputUrl.placeholder = "Link to site";
        const addLinkInputButton = this.buildElement("button", "Add", "link-input-btn");

        addForm.append(addLinkInputName, addLinkInputUrl, addLinkInputButton);
        this.container.append(addForm, addLinkBtn);

        addLinkBtn.addEventListener("click", () => {
            if (this.links.length < 5) {
                addLinkBtn.classList.toggle("hidden");
                addForm.classList.toggle("hidden");
            } else {
                alert("links are full!");
            }
        })

        addLinkInputButton.addEventListener("click", () => {
            if (addLinkInputName.value && addLinkInputUrl.value) {
                const name = addLinkInputName.value;
                const url = addLinkInputUrl.value;
                this.addLink(name, url);
                this.domBuilder();
                addLinkBtn.classList.toggle("hidden");
            } else {
                alert("Please provide a link name and address!");
            }
        })
    }
}
