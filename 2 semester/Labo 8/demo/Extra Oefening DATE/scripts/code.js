const setup = () => {

  console.log("setup");
  let evenement = {
    naam: "Codeer Workshop Javascript",
    datum: new Date(2025, 3, 15), // 15 april 2025
    locatie: "Kortrijk",
    deelnemers: ["John", "Maria", "Ahmed", "Sophie"]
  }
  toonEvenementInfo(evenement);

}

const toonEvenementInfo = (event)=>{
  console.log("Evenement naam: "+ event.naam);
  console.log("Evenement datum: "+ event.datum);
  console.log("Evenement locatie: "+ event.locatie);
  console.log("Evenement deelnemers: "+ event.deelnemers);
}

const dageToEvenement = (event)=>{
  return Math.cell((event.datum - new Date())/ (1000 * 3600 *24));
}


window.addEventListener("load", setup);