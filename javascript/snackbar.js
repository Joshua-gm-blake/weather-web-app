import "../css/snackbar.css";
export default class Snackbar{
    constructor(){
        this.snackbar = document.createElement("div");
    }

    init(){
        this.snackbar.classList.add("snackbar");
        document.querySelector("body").append(this.snackbar);
    }

    show(message, bg, fontColor, runtime){
        this.snackbar.style.backgroundColor = bg;
        this.snackbar.style.color = fontColor;
        this.snackbar.textContent = message;
        
        this.snackbar.classList.add("active");

        setTimeout(() => {
            this.snackbar.classList.remove("active");
        }, runtime);
    }

}