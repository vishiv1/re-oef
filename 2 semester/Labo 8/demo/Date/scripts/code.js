const setup = () => {

  let start = new Date('2025-04-01T12:10:30');
  console.log(start);

  //dag van de week
  console.log((start.getDay()));

  //maand
  console.log((start.getMonth() + 1));

  //jaar
  console.log(start.getFullYear());

  //dag
  console.log(start.getDate() + "-"
      + (start.getMonth() + 1) + "-"
      + start.getFullYear() + " " + start.getHours()
      + ":" + start.getMinutes() + ":" + start.getSeconds());

  let datum = new Date(2025,0,1);

  console.log(datum);

  let event = new Date();

  console.log("toString" + event.toString()); //gebruik jouwe tijdzone

  console.log("toISOString" + event.toString());

  console.log("toDateString" + event.toString());

  console.log("toTimeString" + event.toString());



}

const calculateBirthday= ()=> {
  let toDay = new Date();
  let birthday = new Date(2004, 10, 26, 23, 50, 12);
  console.log(birthday);

  let milliseconds = toDay - birthday;
  console.log(milliseconds);
  let oneDay = 1000 * 60 * 60 * 24;
  let countDays = milliseconds / (oneDay);
  console.log("aantal dagen: " + parseInt(countDays));
}



window.addEventListener("load", setup);