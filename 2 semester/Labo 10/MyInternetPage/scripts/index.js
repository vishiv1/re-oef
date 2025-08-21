const setup = () => {
    let button = document.getElementById('button');
    button.addEventListener('click',go )
    initializeStart(localStorage.getItem("Storage"));

}

let global = {
    Storage: [],
};

let go = () => {
    valideerInput()
}

let valideerInput = () => {
     let input = document.getElementById('input').value;
     if(!input.startsWith('/')){
         alert('Invalid Command');
     } else {
         if (input.charAt(1) === "g" && input.charAt(2) === " "){
             console.log('Google gevonden!');
             let inputCopy = input;
             let text = inputCopy.substring(3);
             text = text.split(" ").join("+");
             let link = `https://www.google.com/search?q=${text}`
             addBox(link, text);
             window.open(link);
             saveToStorage();

         } else if(input.charAt(1) === "y" && input.charAt(2) === " "){
             console.log('YouTube gevonden!');
             let inputCopy = input;
             let text = inputCopy.substring(3);
             text = text.split(" ").join("+");
             let link = `https://www.youtube.com/results?search_query=${text}`;
             addBox(link, text);
             window.open(link);
             saveToStorage();

         } else if(input.charAt(1) === "i" && input.charAt(2) === " "){
             console.log('Instagram gevonden!');
             let inputCopy = input;
             let text = inputCopy.substring(3);
             text = text.split(" ").join("+");
             let link = `https://www.instagram.com/explore/tags/${text}`;
             addBox(link, text);
             window.open(link);
             saveToStorage();

         } else if(input.charAt(1) === "t" && input.charAt(2) === " "){
             console.log('Twitter gevonden!');
             let inputCopy = input;
             let text = inputCopy.substring(3);
             text = text.split(" ").join("+");
             let link = `https://twitter.com/hashtag/${text}`;
             addBox(link, text);
             window.open(link);
             saveToStorage();
         } else {
             console.log('Niets gevonden!');
             alert("Unknown command prefix");
         }
     }
}

const addBox = (link, text) => {
    let cards = document.getElementById('cards');
    let cardsContainer = document.createElement("div");
    cardsContainer.classList.add('card');
    cardsContainer.classList.add('kaart');
    cardsContainer.classList.add('text-white')
    cardsContainer.style.width = "18rem";

    let container = document.createElement("div");
    container.classList.add("card-body");
    let cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    let cardText = document.createElement("p");
    cardText.classList.add("card-text");
    let cardLink = document.createElement("a");
    cardLink.classList.add("btn");

    cardLink.innerText = "GO!"
    cardLink.href = link;
    cardLink.target = "_blank"
    if(link.includes("google")){
        cardTitle.innerText = "Google";
        cardText.innerText = text;
        container.classList.add("bg-primary");
        cardLink.classList.add("btn-info");
    }
    else if (link.includes("youtube")){
        cardTitle.innerText = "Youtube";
        cardText.innerText = text;
        container.classList.add("bg-danger");
        cardLink.classList.add("btn-primary");
    }
    else if (link.includes("twitter")){
        cardTitle.innerText = "Twitter";
        cardText.innerText = text;
        container.classList.add("bg-dark");
        cardLink.classList.add("btn-secondary");
    }
    else if (link.includes("instagram")){
        cardTitle.innerText = "Instagram";
        cardText.innerText = text;
        container.classList.add("bg-warning");
        cardLink.classList.add("btn-secondary");
    }
    container.appendChild(cardTitle);
    container.appendChild(cardText);
    container.appendChild(cardLink);
    cardsContainer.appendChild(container);
    cards.appendChild(cardsContainer)
}

const saveToStorage = () => {
    global.Storage = [];
    let childs = document.getElementsByClassName('kaart');
    for(let i = 0; i < childs.length; i++){
        let link = childs[i].querySelector("a").getAttribute("href");
        let text = childs[i].querySelector("p").innerText;
        let info = [];
        info.push(text);
        info.push(link);
        global.Storage.push(info);

    }
    let string = JSON.stringify(global.Storage);
    localStorage.setItem("Storage", string);
}

const initializeStart = (start) =>{
    let arrayToPush = JSON.parse(start);
    if(arrayToPush !== null){
        for(let i = 0; i < arrayToPush.length; i++) {
            addBox(arrayToPush[i][1], arrayToPush[i][0]);
        }
    }
}


window.addEventListener("load", setup);