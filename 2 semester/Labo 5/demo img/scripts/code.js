const setup = () => {

    document.getElementById("imgPhoto").addEventListener("mouseover", change);
    document.getElementById("imgPhoto").addEventListener("mouseout", mouseOut);
}

const change = () => {
    let photo = document.getElementById("imgPhoto");
    photo.src = "maclaren2.jpg";
    photo.alt = "maclaren";
    photo.className = "size";
    document.getElementById("txtTekst").innerHTML = "photo";
}

const mouseOut = () => {
    let photo = document.getElementById("imgPhoto");
    photo.src = "McLaren-720S-1024x555.jpg";
    photo.alt = "maclaren";
    photo.className = "size";
    document.getElementById("txtTekst").innerHTML = "Maclaren";
}
window.addEventListener("load", setup);
