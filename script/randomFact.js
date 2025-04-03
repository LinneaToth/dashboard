
export class RandomFactDeliverer {
    constructor(url) {
        this.url = url;
        this.factText = document.querySelector("#fact");
        this.fact = "Prepare for useless education!";
        this.changeBtn = document.querySelector("#change-fact-button");
    }

    async init() {
        await this.randomFactAdder();
        this.changeBtn.addEventListener("click", this.randomFactAdder.bind(this)) //Binding the listener to the object context
    }

    async getRandomFactData() {
        try {
            const response = await fetch(this.url);
            this.randomObj = await response.json();
            this.fact = this.randomObj.text;
        } catch (error) {
            this.fact = "Random fact fetch failed, too bad";
            console.log("no facts were fetched, this seems to be the reason: ", error);
        }
    }

    async randomFactAdder() {
        await this.getRandomFactData();
        this.factText.innerText = this.randomObj.text;
    }
}


