const setup = () => {

  let p = document.getElementById("para");

  console.log(p.nodeName, p.nodeType);

  console.log(p.firstChild.nodeName, p.firstChild.nodeValue);

  console.log(p.firstElementChild, p.firstElementChild.nodeType);

  console.log(p.nextElementSibling.nodeName, p.nextElementSibling.nodeValue);
}



window.addEventListener("load", setup);