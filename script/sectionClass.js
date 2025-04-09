export class Section {
    //workaround, creating an abstract class in JS, since JavaScript doesn't have native abstract classes
    constructor() {
        if (this.constructor === Section) {
            throw new Error("It isn't possible to create instances of this class!");
        }
    }

    //Fetching data from url, returning JSON
    async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch data from " + url);
            }
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
        }
    }

    //Builds DOM-elements 
    buildElement(type, innerText = null, id = null, cls = null) {
        const builtElement = document.createElement(type);
        if (innerText) {
            builtElement.innerText = innerText;
        }
        if (id) {
            builtElement.id = id;
        }
        if (cls) {
            if (typeof (cls) === "object") {
                for (let cl of cls) {
                    builtElement.classList.add(cl);
                }
            } else if (typeof (cls) === "string") {
                builtElement.classList.add(cls);
            }
        }
        return builtElement;
    }
}