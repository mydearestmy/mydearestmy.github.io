// number variable 0 - infinity dont use quotes
let a = 10;
let b = 30;
console.log(a, b);
let c = a + b;
console.log(c);
let grade = 72;
if (grade > 70) {
  console.log("Yay you got HD");
} else {
  console.log("you just passed the course");
}

let weather = "sunny";
if (weather === "sunny") {
  console.log("what a nice pleasant sunny weather");
} else {
  console.log("sorry no sun today");
}

// + addition as well as joining
// - subtract
// * multiplication
// / division

//string variables
const myName = "Kaitlyn";
console.log(myName);
const myCity = "Melbourne";
const msg = `
<h1> I live in ${myCity} </h1>
`;

// boolen variable TRUE FALSE
let isThisSunday = false;
let isItAfternoon = true;

// object { name:vale, name:value}
const myStudentRecord = {
  name: "Sam",
  id: 1234,
  course: "OART1013",
  isLocal: false,
};
console.log(myStudentRecord);
console.log(myStudentRecord.course);

// arrays
// let sName1 = "Rohit";
// let sName2 = "Jim";
// let sName3 = "Alice";

let sNames = ["Rohit", "Jim", "Sarah", "Alice"];
// console.log("hello", students[0]);
// console.log("hello", students[1]);
// console.log("hello", students[2]);
// console.log("hello", students[3]);
for (let i=0, i<students.length, i++)
{
  console.log("HELLO", studeents[i]);
}
console.log(sNames[0]);

let numbers = [2, 4, 6, 8, 10];
console.log(numbers[3]);
