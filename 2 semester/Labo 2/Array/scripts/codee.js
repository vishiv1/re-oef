const setup = () => {

    let familie = ["familielid 1", "familielid 2", "familielid 3", "familielid 4"];

    console.log(familie.length);


    for (let i = 0; i < familie; i++) {
        console.log("familielid " + familie[i]);
    }
    VoegNaamToe(familie); //pass-by reference

    console.log(familie.join(" - "));
}
const   VoegNaamToe =(leden) =>
{
    let naam = prompt("voeg naam toe");
    leden.push(naam);
    for (let i = 0; i < leden.length; i++) {
        console.log("familielid "+ leden[i]);
    }


}



window.addEventListener("load", setup);