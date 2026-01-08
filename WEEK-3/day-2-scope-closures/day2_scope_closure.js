sayHello();   // ?
function sayHello() {
  console.log("Hello from function hoisting");
}


greet();  // ?
var greet = function() {
  console.log("Hi");
};


// Task 2 — Closure Counter

function createCounter() {
  let count = 0; // private variable

  return function() {
    count++;
    console.log("Counter =", count);
  };
}

const counter1 = createCounter();
counter1();
counter1();
counter1();

const counter2 = createCounter();
counter2();


// Task 3 — Scope Explanation

var x = 10;   // global scope

if (true) {
  let y = 20;  // block scope
  var z = 30;  // function / global scope (var leaks)
}

console.log(x);  // 10 (accessible)
// console.log(y); //   Error — block scoped
console.log(z);  // 30 (var escapes block)
