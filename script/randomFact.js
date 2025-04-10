import { Section } from "./sectionClass.js";

"use strict"
export class RandomFactDeliverer extends Section {
    constructor() {
        super();
        this.factText = document.querySelector("#fact");
        this.fact = "Prepare for useless education!";
        this.changeBtn = document.querySelector("#change-fact-button");
    }

    async init(url) { //Separate init func since constructor can't be async
        this.url = url;
        await this.randomFactAdder(); //Makes sure there is a cat fact on display to begin with
        this.changeBtn.addEventListener("click", this.randomFactAdder.bind(this)) //Binding the listener to the object context
    }

    //Using the data fetcher from parent class to get new random fact
    async getRandomFact() {
        try {
            let newFactNeeded = true;
            while (newFactNeeded) {
                this.randomObj = await this.fetchData(this.url);
                if (this.randomObj.length < 300) {
                    newFactNeeded = false;
                }
            }
        } catch (error) {
            this.fact = "Random fact fetch failed, too bad";
            console.log("no facts were fetched, this seems to be the reason: ", error);
        }
    }

    //add fact to page
    async randomFactAdder() {
        await this.getRandomFact();
        this.factText.innerText = this.randomObj.fact;
    }
}


