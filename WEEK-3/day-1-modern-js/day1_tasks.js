// Task 1 — Arrow Functions

function normalAdd(a, b) {
  return a + b;
}

const arrowAdd = (a, b) => a + b;

console.log("Normal Function:", normalAdd(5, 3));
console.log("Arrow Function:", arrowAdd(5, 3));

// Task 2 — Template Literals

const name = "Abinshah";
const project = "Week-3 Modern JS Tasks";

console.log(`Hi ${name}, you are working on ${project}.`);


// Task 3 — Ternary Operator

const age = 20;

const statusText = age >= 18 ? "Adult" : "Minor";

console.log("Age Status:", statusText);


// Task 4 — Destructuring

const user = {
  username: "Abinshah",
  course: "CS",
  year: 2
};

const { username, course, year } = user;

console.log("User:", username);
console.log("Course:", course);
console.log("Year:", year);

const numbers = [10, 20, 30];
const [a, b, c] = numbers;

console.log("Numbers:", a, b, c);


