const setup = () => {

    let li = document.querySelectorAll("li");

    for (let i = 0; i < li.length; i++) {
      //  li[i].classList.add("listItem");
        li[i].setAttribute("class", "style");
    }

    let img = document.createElement("img");
    img.src = "images/foto.jpg";
    document.body.appendChild(img);
}




window.addEventListener("load", setup);