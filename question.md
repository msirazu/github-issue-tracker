1️⃣ What is the difference between var, let, and const?

Answer:
var: var can be reassign and redeclare from anywhere. var is function scoped/global scoped. var is also hoisting. we will not use it anymore.

let: let can be reassign but not redeclare. let is block scoped. let is hoisting but in tdz. give error if access before initializing.

const: const can not be reassign and redeclare. const is block scoped. const is hoisting but in tdz. give error if access before initializing.

2️⃣ What is the spread operator (...)?

Answer: 
spread operator is a method for creating a new array or object from copying existing array or object.
example: 
let nums = [1, 2, 3];
let newNums = [...numbers, 4, 5];

3️⃣ What is the difference between map(), filter(), and forEach()?

Answer:
map: map is creating new array and can change element.
filter: filter is creating new array with the condition given. return new array with all element fullfiled the condition.
forEach: forEach do not return anything. just use for update or print. its like loop in array.

4️⃣ What is an arrow function?

Answer: 
arrow function is shorthand of function.
example: const getSum = (a, b) => a + b;

5️⃣ What are template literals?

Answer: template literals start and end with backtick. we can write dynamic variable inside it and more features.
example: `my name is ${myName}`