const setup = () => {
    let vraag = window.confirm("Wat is de return value van de confirm functie als de gebruiker op een van de buttons klikt?")
    console.log(vraag);

    // OK == true
    // Cancel == false

    let vraag1 = window.prompt("Wat is the value");
    console.log(vraag1);
    //OK --> antwoord == string wat je intypt
    //cANCEL --> antwoord == null
}

window.addEventListener("load", setup);