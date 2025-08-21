const setup = () => {
    const wijzigButton = document.getElementById('wijzigButton');
    const text = document.getElementById('tekst');
    const inputVeld = document.getElementById('inputVeld');
    wijzigButton.addEventListener('click', function()
    {
        const nieuweText = inputVeld.value;
    })
}



window.addEventListener("load", setup);