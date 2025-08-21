const setup = () => {

  let element = document.createElement("p");
  element.setAttribute("class", "color");
  element.setAttribute("id", "txtPar");



  // <p class="color"> </p>

  let txtNode = document.createTextNode("Hello World!");
  element.appendChild(txtNode);
  document.querySelector('#myDIV').appendChild(element);
}



window.addEventListener("load", setup);