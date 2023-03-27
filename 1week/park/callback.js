function test2 (number, number2, callback) {
  let a = number;
  let b = number2;
  return callback(a, b);
}

function append (first, second) {
  return first + second;
}

function subtract (first, second) {
  return first - second;
}

function multiply (first, second) {
  return first * second;
}

function divide (first, second) {
  return first / second;
}


console.log(test2(10, 20, append));

console.log(test2(30, 40, subtract));

console.log(test2(50, 60, multiply));

console.log(test2(70, 80, divide));
