const calculator = document.getElementById("calc");
const output = document.querySelector(".screen");
const previousOperations = document.querySelector(".history");

let state = {
  currentNumber: null,
  previousNumber: null,
  operator: null,
  result: null,
  justOperated: false,
  deleted: false,
};

// for keyboard events
let types = {
  number: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  operator: ["+", "-", "*", "/"],
  dot: ".",
  equal: "=",
};

let operationsArr = [{num1: null, operator: null, num2: null, result: null}];
operationsArr.shift();

const sum = (num1, num2) => {
  return Number(num1) + Number(num2);
};

const sub = (num1, num2) => {
  return Number(num1) - Number(num2);
};

const multiply = (num1, num2) => {
  return Number(num1) * Number(num2);
};

const division = (num1, num2) => {
  return Number(num1) / Number(num2);
};

const polarity = (obj) => {
  if (output.textContent === "0" || output.textContent === "") {
    output.textContent = "-";
  } else if (output.textContent.includes("-") && obj.currentNumber === null) {
    output.textContent = "";
  } else {
    output.textContent *= -1;
    obj.currentNumber = output.textContent;
  }
};

const clear = (obj) => {
  if (!obj.deleted) {
    output.textContent = null;
    obj.currentNumber = null;
    obj.previousNumber = null;
    obj.operator = null;
    obj.justOperated = false;
    obj.deleted = true;
  } else {
    for (let i = operationsArr.length; i > 0; i--) {
      operationsArr.pop();
    }
    previousOperations.textContent = "";
    obj.deleted = false;
  }
};

const del = (obj) => {
  if (output.textContent !== "0") {
    if (output.textContent.length <= 1) {
      output.textContent = "0";
    } else {
      output.textContent = output.textContent.slice(0, -1);
      obj.currentNumber = output.textContent;
    }
  }
};

const handleNumbers = (obj, input) => {
  if (output.textContent === "0") {
    output.textContent = input;
    obj.currentNumber = output.textContent;
  } else {
    if (!obj.justOperated) {
      output.textContent += input;
      obj.currentNumber = output.textContent;
    } else {
      obj.previousNumber = obj.currentNumber;
      obj.currentNumber = null;
      output.textContent = input;
      obj.currentNumber = output.textContent;
      obj.justOperated = false;
    }
  }
};

const handleDecimal = (obj, input) => {
  if (output.textContent.includes(".") === false && !obj.justOperated) {
    output.textContent += input;
  }
};

const handleOperators = (obj, input) => {
  if (output.textContent !== "0") {
    if (obj.operator === null) {
      output.textContent = null;
      obj.previousNumber = obj.currentNumber;
      obj.currentNumber = null;
      obj.operator = input;
      obj.justOperated = false;
    } else {
      if (obj.currentNumber && obj.previousNumber) {
        operation(obj);
        obj.operator = input;
      } else {
        output.textContent = null;
        obj.operator = input;
      }
    }
  } else {
    output.textContent = 0;
    return;
  }
};

const operation = (obj) => {
  switch (obj.operator) {
    case "+":
      output.textContent = sum(obj.previousNumber, obj.currentNumber);
      obj.result = output.textContent;
      operationsArr.push({
        num1: obj.previousNumber,
        operator: obj.operator,
        num2: obj.currentNumber,
        result: obj.result,
      });
      obj.operator = null;
      obj.currentNumber = output.textContent;
      obj.previousNumber = null;
      obj.justOperated = true;
      previousOperations.innerHTML = null;
      for (let i = 0; i < operationsArr.length; i++) {
        let newOperation = document.createElement("p");
        newOperation.textContent = `${operationsArr[i].num1} ${operationsArr[i].operator} ${operationsArr[i].num2} = ${operationsArr[i].result}`;
        previousOperations.appendChild(newOperation);
      }
      obj.deleted = false;
      break;
    case "-":
      output.textContent = sub(obj.previousNumber, obj.currentNumber);
      obj.result = output.textContent;
      operationsArr.push({
        num1: obj.previousNumber,
        operator: obj.operator,
        num2: obj.currentNumber,
        result: obj.result,
      });
      obj.operator = null;
      obj.currentNumber = output.textContent;
      obj.previousNumber = null;
      obj.justOperated = true;
      previousOperations.innerHTML = null;
      for (let i = 0; i < operationsArr.length; i++) {
        let newOperation = document.createElement("p");
        newOperation.textContent = `${operationsArr[i].num1} ${operationsArr[i].operator} ${operationsArr[i].num2} = ${operationsArr[i].result}`;
        previousOperations.appendChild(newOperation);
      }
      obj.deleted = false;
      break;
    case "*":
      output.textContent = multiply(obj.previousNumber, obj.currentNumber);
      obj.result = output.textContent;
      operationsArr.push({
        num1: obj.previousNumber,
        operator: obj.operator,
        num2: obj.currentNumber,
        result: obj.result,
      });
      obj.operator = null;
      obj.currentNumber = output.textContent;
      obj.previousNumber = null;
      obj.justOperated = true;
      previousOperations.innerHTML = null;
      for (let i = 0; i < operationsArr.length; i++) {
        let newOperation = document.createElement("p");
        newOperation.textContent = `${operationsArr[i].num1} ${operationsArr[i].operator} ${operationsArr[i].num2} = ${operationsArr[i].result}`;
        previousOperations.appendChild(newOperation);
      }
      obj.deleted = false;
      break;
    case "/":
      output.textContent = division(obj.previousNumber, obj.currentNumber);
      obj.result = output.textContent;
      operationsArr.push({
        num1: obj.previousNumber,
        operator: obj.operator,
        num2: obj.currentNumber,
        result: obj.result,
      });
      obj.operator = null;
      obj.currentNumber = output.textContent;
      obj.previousNumber = null;
      obj.justOperated = true;
      previousOperations.innerHTML = null;
      for (let i = 0; i < operationsArr.length; i++) {
        let newOperation = document.createElement("p");
        newOperation.textContent = `${operationsArr[i].num1} ${operationsArr[i].operator} ${operationsArr[i].num2} = ${operationsArr[i].result}`;
        previousOperations.appendChild(newOperation);
      }
      obj.deleted = false;
      break;
    default:
      return;
      break;
  }
};

calculator.addEventListener("click", (e) => {
  let type = e.target.dataset.type;
  let input = e.target.dataset.value;
  switch (type) {
    case "number":
      handleNumbers(state, input);
      break;
    case "dot":
      handleDecimal(state, input);
      break;
    case "operator":
      handleOperators(state, input);
      break;
    case "equal":
      operation(state);
      break;
    case "AC":
      clear(state);
      break;
    case "del":
      del(state);
      break;
    case "sign":
      polarity(state);
      break;
    default:
      return;
      break;
  }
});

window.addEventListener("keydown", (e) => {
  let input = e.key;
  if (types.number.includes(input)) {
    handleNumbers(state, input);
  } else if (types.operator.includes(input)) {
    handleOperators(state, input);
  } else if (types.dot === input) {
    handleDecimal(state, input);
  } else if (types.equal === input || input === "Enter") {
    operation(state);
  } else if (input === "Backspace") {
    del(state);
  }
});
