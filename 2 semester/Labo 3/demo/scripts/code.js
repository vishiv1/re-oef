const setup = () => {
    let btnTry = document.getElementById("btnTry");

    // Event-based programming
    btnTry.addEventListener("mouseover", mouseHover);
    btnTry.addEventListener("click", onClick);
    btnTry.addEventListener("mouseout", mouseOut);

    // eventListeners CSS
    document.getElementById("btnWithoutBullets")
        .addEventListener("click", withoutBullets);

    document.getElementById("btnWithBullets")
        .addEventListener("click", withBullets);

    //eventListeners difference between "textContent" and "innerHTML"

    document.getElementById("btnContent")
        .addEventListener("click", changeContent);

}



// mouseHoverFunction
const mouseHover = () => {
    document.getElementById("event").innerHTML += "Mouse Hovered!<br>";

}

// onClickFunction
const onClick = () => {
    document.getElementById("event").innerHTML += "Mouse Clicked!<br>";
}

// mouseOutFunction

const mouseOut = () => {
    document.getElementById("event").innerHTML += "Mouse Out!<br>";
}


const withoutBullets = () => {

    let listItems = document.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++) {
        //1ste manier
        // listItems[i].style.listStyleType = "none";
        // listItems[i].style.backgroundColor = "red";

        //2de manier
        // listItems[i].className = "listItemsStyleNone colorRed";



        //3 de manier
        listItems[i].classList.remove("listItemsStyleDisc");
        listItems[i].classList.remove("colorWhite");
        listItems[i].classList.add("listItemsStyleNone");
        listItems[i].classList.add("colorRed");
    }
}

const withBullets = () => {
    let listItems = document.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++) {
        //1ste manier
        // listItems[i].style.listStyleType = "disk";
        // listItems[i].style.backgroundColor = "white";

        //2de manier
        //listItems[i].className = "listItemsStyleDisk colorWhite";

        //3de manier
        listItems[i].classList.add("listItemsStyleDisc");
        listItems[i].classList.add("colorWhite");
    }
}



// difference between "textContent" and "innerHTML"
const changeContent = () => {
    document.getElementById("textContent")
        .textContent ="<a href='https://www.vives.be'>VIVES</a>";
    document.getElementById("innerHTML")
        .innerHTML ="<a href='https://www.vives.be'>VIVES</a>";
}



window.addEventListener("load", setup);