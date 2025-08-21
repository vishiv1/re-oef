const setup = () => {
    let btnValideer=document.getElementById("button");
    btnValideer.addEventListener("click", valideer);
};

const valideer = () => {
    valideerVoornaam();
    valideerNaam();
    valideerGeboortedatum();
    valideerEmail();
    valideerAantalKinderen();
    isAllesJuist();
};
let voornaamJuist = false;
let naamJuist = false;
let emailJuist = false;
let geboortedatumJuist = false;
let aantalKinderenJuist = false;
const valideerVoornaam = () => {
    let txtVoornaam = document.getElementById("voornaam");
    let errorVoornaam = document.getElementById("errorVoornaam");
    let voornaam = txtVoornaam.value.trim();
    if (voornaam.length > 30) {
        txtVoornaam.className="error";
        errorVoornaam.innerHTML = "max. 30 karakters";
        voornaamJuist = false;
    } else {
        txtVoornaam.className="";
        errorVoornaam.innerHTML = "";
        voornaamJuist = true;
    }
};

const valideerNaam = () => {
    let txtNaam = document.getElementById("naam");
    let errorNaam = document.getElementById("errorNaam");
    let naam = txtNaam.value.trim();
    if (naam.length > 50) {
        txtNaam.className="error";
        errorNaam.innerHTML = "max. 50 karakters";
        naamJuist = false;
    } else if(naam.length === 0){
        txtNaam.className="error";
        errorNaam.innerHTML = "Verplicht veld";
        naamJuist = false;
    } else {
        txtNaam.className="";
        errorNaam.innerHTML = "";
        naamJuist = true;
    }
};
const isGetal = (tekst) => {
    return !isNaN(tekst);
}
const isEmail = (email) =>{
    let emailRegex = /^.+\@.+\..+$/;
    return emailRegex.test(email);
}

const valideerGeboortedatum = () =>{
    let txtGeboortedatum = document.getElementById("geboortedatum");
    let errorGeboortedatum = document.getElementById("errorGeboortedatum");
    let geboortedatum = txtGeboortedatum.value.trim();
    let [jaar, maand, dag] = geboortedatum.split("-");

    if(geboortedatum === ""){
        txtGeboortedatum.className="error";
        errorGeboortedatum.innerHTML = "Verplicht veld";
        geboortedatumJuist = false;
    } else if(!isGetal(jaar) || !isGetal(maand) || !isGetal(dag)){
        txtGeboortedatum.className="error";
        errorGeboortedatum.innerHTML = "formaat is niet jjjj-mm-dd";
        geboortedatumJuist = false;
    } else if(jaar.length !== 4 || maand.length !== 2 || dag.length !== 2){
        txtGeboortedatum.className="error";
        geboortedatumJuist = false;
        errorGeboortedatum.innerHTML = "formaat is niet jjjj-mm-dd";
    } else if(!geboortedatum.match(/^\d{4}-\d{2}-\d{2}$/)){
        txtGeboortedatum.className="error";
        errorGeboortedatum.innerHTML = "formaat is niet jjjj-mm-dd";
        geboortedatumJuist = false;
    } else {
        txtGeboortedatum.className="";
        errorGeboortedatum.innerHTML = "";
        geboortedatumJuist = true;
    }
}
const valideerEmail = () =>{
    let txtEmail = document.getElementById("email");
    let errorEmail = document.getElementById("errorEmail");
    let email = txtEmail.value.trim();

    if(email === ""){
        txtEmail.className="error";
        errorEmail.innerHTML = "Verplicht veld";
        emailJuist = false;
    }
    else if(email.indexOf("@") === -1){
        txtEmail.className="error";
        errorEmail.innerHTML = "geen geldig email adres";
        emailJuist = false;
    }
    else if(!isEmail(email)){
        txtEmail.className="error";
        errorEmail.innerHTML = "geen geldig email adres";
        emailJuist = false;
    }
    else{
        txtEmail.className="";
        errorEmail.innerHTML = "";
        emailJuist = true;
    }
}
const valideerAantalKinderen = () =>{
    let aantalKinderen = document.getElementById("aantalKinderen");
    let errorAantalKinderen = document.getElementById("errorAantalKinderen");
    let aantal = parseInt(aantalKinderen.value.trim());

    /*if(!isGetal(aantal)){
        aantalKinderen.className="error";
        errorAantalKinderen.innerHTML = "geen getal";
    }
    else */
    //dit leek nodig omdat je anders letters kuns opgeven, maar staat niet in de opgave.
    if(aantal < 0){
        aantalKinderen.className="error";
        errorAantalKinderen.innerHTML = "geen positief getal";
        aantalKinderenJuist = false;
    } else if(aantal > 99){
        aantalKinderen.className="error";
        errorAantalKinderen.innerHTML = "is te vruchtbaar";
        aantalKinderenJuist = false;
    } else {
        aantalKinderen.className="";
        errorAantalKinderen.innerHTML = "";
        aantalKinderenJuist = true;
    }
}
const isAllesJuist = () =>{
    let textProficiat = document.getElementById("proficiat");
    if(voornaamJuist && naamJuist && emailJuist && geboortedatumJuist && aantalKinderenJuist){
        textProficiat.innerHTML = "Proficiat"
    }
    else {
        textProficiat.innerHTML = "";
    }
}
window.addEventListener("load", setup);