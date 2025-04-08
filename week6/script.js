const topHeading = document.querySelector("h1");
// console.log(topHeading);
// console.log(topHeading.textContent);
topHeading.textContent = "This is my new top heading";
topHeading.style.color = "red";

const header = document.querySelector("header");
console.log(header);
console.log(header.textContent);
console.log(header.innerHTML);
header.innerHTML = "<h1>Top heading</h1>";

const allParas = document.querySelector("p");
console.log(allParas);
for (let i = 0; i < allParas.length; i++) {
  console.log(allParas[i].textContent);
  allParas[i].style.border = "1px solid blue";
  allParas[i].style.backgroundColor = "beige";
}

const mySubHeading = document.querySelector("#first-subheading");
console.log(mySubHeading);
console.log(mySubHeading.textContent);

const allSubHeadings = document.querySelector("h2");
console.log(allSubHeadings);
for (let i = 0; i < allSubHeadings.length; i++) {
  console.log(allSubHeadings[i].textContent);
}
