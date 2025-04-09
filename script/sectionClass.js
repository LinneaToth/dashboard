export class Section {
    constructor() {
    }

    async fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        }
        catch (e) {
            console.log(e);
        }
    }

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