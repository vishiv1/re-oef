const setup = () => {

let par = document.querySelectorAll("p")[0];

let y = par.childNodes[0];
par.removeChild(y);
let textNode = document.createTextNode("Good Job");
par.appendChild(textNode);
}




window.addEventListener("load", setup);