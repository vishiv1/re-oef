window.addEventListener("load", setup);

const setup = () => {
  // Create an object
  let student = {}; // een leeg object
  student.firstName = "John";
  student.lastName = "Doe";
  student.age = new Date(2000, 1, 1);
  student.eyeColor = "blue";

  console.log(student.firstName);

  let student1 = {
    firstName: "John",
    lastName: "Doe",
    age: new Date(2020, 7, 11, 0, 10, 30),
    eyeColor: "blue",
  }
  console.log(student1.firstName)
  console.log(student1.age);

  // uitbreiding

  let student2 = {
    firstName: "John",
    lastName: "Doe",
    address: {
      zipCode: 8500,
      city: "Kortrijk"
    }
  }
  console.log(student2.address.zipCode);

  let students = [
    {
      firstName: "John",
      lastName: "Doe",
      address: {
        zipCode: 8500,
        city: "Kortrijk"
      }
    },
    {
      firstName: "VIVES",
      lastName: "Doe",
      address: {
        zipCode: 8500,
        city: "Kortrijk"
      }
    }
  ];
  text = JSON.stringify(students);
  console.log(text);

  textJS = JSON.parse(text);
  console.log ("JsonParse " + textJS[0].firstName + " " + textJS[1].firstName);

  tekst = JSON.stringify(students[1]);
  console.log(tekst);

}

window.addEventListener("load", setup);
