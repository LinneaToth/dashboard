export class Notepad {
    constructor() {
        this.notes = document.querySelector("#notepad");
        this.notes.value = localStorage.getItem("notepad") || "John Doe Dashboard";
        this.notes.addEventListener("input", () => {
            console.log(this.notes.value);
            localStorage.setItem("notepad", this.notes.value);
        })
    }
}