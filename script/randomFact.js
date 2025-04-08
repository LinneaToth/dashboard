import { Section } from "./sectionClass.js";

"use strict"


export class RandomFactDeliverer extends Section {
    constructor(url) {
        super();
        this.factText = document.querySelector("#fact");
        this.fact = "Prepare for useless education!";
        this.changeBtn = document.querySelector("#change-fact-button");
    }

    async init(url) {
        this.url = url;
        await this.randomFactAdder();
        this.changeBtn.addEventListener("click", this.randomFactAdder.bind(this)) //Binding the listener to the object context
    }

    async getRandomFactData() {
        try {
            let newFactNeeded = true;
            while (newFactNeeded) {
                const response = await fetch(this.url);
                this.randomObj = await response.json();
                if (this.randomObj.length < 300) {
                    newFactNeeded = false;
                }
                console.log(this.randomObj);
                // this.fact = this.randomObj.fact;
            }
        } catch (error) {
            this.fact = "Random fact fetch failed, too bad";
            console.log("no facts were fetched, this seems to be the reason: ", error);
        }
    }

    async randomFactAdder() {
        await this.getRandomFactData();
        this.factText.innerText = this.randomObj.fact;
    }
}




// export class RandomFactDeliverer extends Section {
//     constructor(url) {
//         super();
//         this.factText = document.querySelector("#fact");
//         this.fact = "Prepare for useless education!";
//         this.changeBtn = document.querySelector("#change-fact-button");
//     }

//     async init(url) {
//         this.url = url;
//         await this.randomFactAdder();
//         this.changeBtn.addEventListener("click", this.randomFactAdder.bind(this)) //Binding the listener to the object context
//     }

//     async getRandomFactData() {
//         try {
//             const response = await fetch(this.url);
//             this.randomObj = await response.json();
//             this.fact = this.randomObj.text;
//         } catch (error) {
//             this.fact = "Random fact fetch failed, too bad";
//             console.log("no facts were fetched, this seems to be the reason: ", error);
//         }
//     }

//     async randomFactAdder() {
//         await this.getRandomFactData();
//         this.factText.innerText = this.randomObj.text;
//     }
// }


