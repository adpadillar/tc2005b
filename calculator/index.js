const display = document.querySelector(".display");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const div = document.querySelector("#div");
const mult = document.querySelector("#mult");
const eq = document.querySelector("#eq");
const prev_operation = document.querySelector("#previous-operations");
const pow = document.querySelector("#pow");
const no_op = document.querySelector("#no-operations-message");

const readableSymbols = {
  "+": "+",
  "-": "-",
  "*": "x",
  "/": "÷",
  "**": "^",
};

let buffer = "";
let stack = [];

plus.addEventListener("click", () => onOperation("+"));
minus.addEventListener("click", () => onOperation("-"));
div.addEventListener("click", () => onOperation("/"));
mult.addEventListener("click", () => onOperation("*"));
eq.addEventListener("click", evalStack);

display.textContent = "0";

const clearButton = document.querySelector("#clear");
function clearDisplay() {
  display.textContent = "0";
  buffer = "";
  stack = [];
}

function onOperation(operator) {
  stack.push(buffer, operator);
  display.textContent = `${buffer} ${readableSymbols[operator]} `;
  buffer = "";
}

function evalStack() {
  if (!buffer) return;
  stack.push(buffer);
  if (!stack.length) return;
  if (no_op) no_op.remove();
  const result = eval(stack.join(" "));
  display.textContent = result;
  const li = document.createElement("li");
  li.textContent = `${stack.join(" ")} = ${result}`;
  prev_operation.appendChild(li);
  stack = [];
  buffer = result;
}

clearButton.addEventListener("click", clearDisplay);

// NUMBER BUTTONS
const buttons = document.querySelectorAll(".button-light");
pow.addEventListener("click", () => onOperation("**"));
buttons.forEach((button) => {
  button.addEventListener("click", () => handleNumberClick(button.textContent));
});

function handleNumberClick(n) {
  buffer += n;
  if (display.textContent === "0") {
    display.textContent = "";
  }

  display.textContent += readableSymbols[n] || n;
}
