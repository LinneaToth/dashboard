export class Notepad {
    constructor() {
        this.notes = document.querySelector("#notepad");
        this.notes.value = localStorage.getItem("notepad") || "";
        this.notes.addEventListener("input", () => {
            console.log(notes.value);
            localStorage.setItem("notepad", notes.value);
        })
    }
}