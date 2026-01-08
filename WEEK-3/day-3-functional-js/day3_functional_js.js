const numbers = [5, 10, 15, 20, 25];


// Task 1 — Using map()

const squared = numbers.map(n => n * 2);

console.log("Original:", numbers);
console.log("Doubled using map:", squared);

//using filter()

const greaterThan10 = numbers.filter(n => n > 10);

console.log("Filtered (>10):", greaterThan10);



// Task 2 — Reusable utilities

const names = ["abinshah", "rahman", "ninav"];

const capitalize = name => name[0].toUpperCase() + name.slice(1);

const formattedNames = names.map(capitalize);

console.log("Formatted Names:", formattedNames);


//Task 3 — Refactor function to pure function

let score = 10;

function addBonus(points) {
  score += points; // modifies external state
}

addBonus(5);
console.log("Score =", score);

// Refactored to pure function

function addBonusPure(score, points) {
  return score + points;
}

const newScore = addBonusPure(10, 5);

console.log("Original Score = 10");
console.log("After Bonus =", newScore);
    