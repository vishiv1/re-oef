const setup = () => {
    let button = document.getElementById('button');
    button.addEventListener('click',go )
    initializeStart(localStorage.getItem("Storage"));
}

const createElementWithClassName =(element, className) => {
    let e = document.createElement(element);
    e.setAttribute("class", className);
    return e;
}

const createLinkButton = (url) =>{
    let linkGo = document.createElement('a');
    linkGo.SetAttribute("href",url);
    linkGo.setAttribute('target','_blank');
    linkGo.setAttribute('class', 'btn btn-primary');
    linkGo.appendChild(document.createTextNode("Go!"));
    return linkGo;
}

const createCardAndAppend = (title,commandoSuffix, url) =>{
    let card = createElementWithClassName("div", "card");
    card.classList.add(title.toLowerCase()+"-card");
    let cardBody = createElementWithClassName("div", "card-body");
    let cardTitle = document.createElement("h5", "card-title", title);
    let cardText = createElementWithClassName("p", "card-text", commandoSuffix);
    let linkGo = createElementWithClassName("url");
    linkGo.classList.add(title.toLowerCase()+"-button");
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(linkGo);
    cardBody.appendChild(cardBody);
    col4.appendChild(card);

    let row = document.querySelector("#resultContainer > .row");
    row.appendChild(col4)
}

const google = (commandoSuffix) =>{
    let url = "https://www.google.com/search?q=" + encodeURIComponent(commandoSuffix);
    windows.open(url, '_blank');
    createCardAndAppend("Google", commandoSuffix, url);
}

const instagram = (commandoSuffix) =>{
    let url = "https://www.google.com/search?q=" + encodeURIComponent(commandoSuffix);
    windows.open(url, '_blank');
    createCardAndAppend("Instagram", commandoSuffix, url);
}

// opmaak card https://getbootstrap.com/docs/5.0/components/card/#using-grid-markup
const createCardAndAppend = (title, commandoSuffix, url) => {
    let col4 = createElementWithClassName("div","col-4");
    let card = createElementWithClassName("div","card");
    card.classList.add(title.toLowerCase()+"-card");
    let cardBody = createElementWithClassName("div","card-body");
    let cardTitle = createElementWithClassNameAndText("h5",
        "card-title", title);
    let cardText = createElementWithClassNameAndText("p",
        "card-text", commandoSuffix);
    let linkGo = createLinkButton(url);
    linkGo.classList.add(title.toLowerCase()+"-button");
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(linkGo);
    card.appendChild(cardBody);
    col4.appendChild(card);

    let row = document.querySelector("#resultContainer > .row");
    row.appendChild(col4);
};





const createElementWithClassName = (element, className) => {
    let e = document.createElement(element);
    e.setAttribute("class", className);
    return e;
};


const createElementWithClassNameAndText = (element, className, text) => {
    let e = createElementWithClassName(element, className);
    e.appendChild(document.createTextNode(text));
    return e;
};

window.addEventListener("load", setup);