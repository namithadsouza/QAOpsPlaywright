// Different types of variables in TypeScript

// String
let name1: string = "John";
const city: string = "New York";
var country = "USA";

// Number
let age: number = 25;
const price: number = 99.99;
var count = 10;

// Boolean
let isActive: boolean = true;
const isValid: boolean = false;
var isEnabled = true;

// Array
let numbers: number[] = [1, 2, 3, 4, 5];
const names: Array<string> = ["Alice", "Bob", "Charlie"];
var mixed: (string | number)[] = ["text", 123, "more"];

// Any (avoid if possible)
let value: any = "can be anything";
value = 123;
value = true;

// Union types
let id: string | number = 123;
id = "ABC-123";

// Tuple
let tuple: [string, number] = ["John", 25];

// Enum
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING"
}

let userStatus: Status = Status.Active;

// Type alias
type User = {
  name: string;
  age: number;
  email?: string;
};

let user: User = {
  name: "John",
  age: 30,
  email: "john@example.com"
};

// Interface
interface Product {
  id: number;
  title: string;
  price: number;
  inStock?: boolean;
}

let product: Product = {
  id: 1,
  title: "Laptop",
  price: 999.99
};

// Function with types
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Arrow function with types
const add = (a: number, b: number): number => {
  return a + b;
};

// Optional and default parameters
function displayInfo(name: string, age: number = 18): void {
  console.log(`Name: ${name}, Age: ${age}`);
}

// Null and Undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;
let nullable: string | null = "text";
nullable = null;

// Never type (function that never returns)
function throwError(message: string): never {
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
} catch (err) {
  console.log('throwError caught =>', (err as Error).message);
}

