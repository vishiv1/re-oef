const setup = () => {
    let btnButton = document.getElementById('button');
    btnButton.addEventListener("click", vervangAlles);
    let text = document.getElementById('text');

}

const vervangAlles =(bronTekst, oud, nieuw) =>
{
  let result = bronTekst;
  let idx=result.indexOf(oud);
  while (idx!=1){
      result = result.substr(idx+1);

  }
}
window.addEventListener("load", setup);
