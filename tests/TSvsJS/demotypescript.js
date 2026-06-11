"use strict";
// Different types of variables in TypeScript
// String
let name1 = "John";
const city = "New York";
var country = "USA";
// Number
let age = 25;
const price = 99.99;
var count = 10;
// Boolean
let isActive = true;
const isValid = false;
var isEnabled = true;
// Array
let numbers = [1, 2, 3, 4, 5];
const names = ["Alice", "Bob", "Charlie"];
var mixed = ["text", 123, "more"];
// Any (avoid if possible)
let value = "can be anything";
value = 123;
value = true;
// Union types
let id = 123;
id = "ABC-123";
// Tuple
let tuple = ["John", 25];
// Enum
var Status;
(function (Status) {
    Status["Active"] = "ACTIVE";
    Status["Inactive"] = "INACTIVE";
    Status["Pending"] = "PENDING";
})(Status || (Status = {}));
let userStatus = Status.Active;
let user = {
    name: "John",
    age: 30,
    email: "john@example.com"
};
let product = {
    id: 1,
    title: "Laptop",
    price: 999.99
};
// Function with types
function greet(name) {
    return `Hello, ${name}!`;
}
// Arrow function with types
const add = (a, b) => {
    return a + b;
};
// Optional and default parameters
function displayInfo(name, age = 18) {
    console.log(`Name: ${name}, Age: ${age}`);
}
// Null and Undefined
let nullValue = null;
let undefinedValue = undefined;
let nullable = "text";
nullable = null;
// Never type (function that never returns)
function throwError(message) {
    throw new Error(message);
}
// --- Calls to functions in this file ---
// greet
const greetResult = greet("Alice");
console.log('greetResult =>', greetResult);
// add
const sum = add(5, 7);
console.log('add(5,7) =>', sum);
// displayInfo (returns void)
console.log('displayInfo =>');
displayInfo('Bob', 22);
// throwError (call inside try/catch to log the error instead of crashing)
try {
    throwError('This is a test error');
}
catch (err) {
    console.log('throwError caught =>', err.message);
}
