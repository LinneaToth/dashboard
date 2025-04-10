"use strict"
//Makes sure the textarea is synchronised with the notes stored in localStorage
export class Notepad {
    constructor() {
        this.notes = document.querySelector("#notepad");
        this.notes.value = localStorage.getItem("notepad") || "John Doe Dashboard";
        this.notes.addEventListener("input", () => {
            localStorage.setItem("notepad", this.notes.value);
        })
    }
}