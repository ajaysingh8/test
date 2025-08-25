interface button {
  type: string; 
  value: string;
}

interface history {
  operation: Function;
  leftNum: number;
  rightNum number
  result?: string;
}

const add: Function = (a: number, b: number): number => a + b;
const subtract: Function = (a: number, b: number): number => a - b;
const divide: Function = (a: number, b: number): number => a / b;
const multiply: Function = (a: number, b: number): number => a * b;
const power: Function = (a: number, b: number): number => Math.pow(a, b);

const operations: { [index: string]: Function } = {
  "+": add,
  "-": subtract,
  "*": multiply,
  "/": divide,
  "^": power,
  "%": "modulus",
};

class Calculator {
  currentTotal: number;
  currentOperator: string;
  lastOperator: string;
  displayShouldClear: boolean;
  onDisplayUpdateHandlers: Function[];
  onDisplay: string;
  history: history[];

  constructor() {
    this.history = [];
    this.onDisplayUpdateHandlers = [];
    this.clear();
  }

  fireDisplayUpdateHandlers = (): void => {
    this.onDisplayUpdateHandlers.forEach((func) => func(this.onDisplay, 123));
  };

  numberPressed = (btn: button) => {
    if (this.displayShouldClear) {
      this.clear();
      this.displayShouldClear = false;
    }

    if (this.onDisplay === null) {
      this.onDisplay = btn.type;
      this.fireDisplayUpdateHandlers();
      return;
    }

    this.onDisplay = this.onDisplay + btn.value;
    this.fireDisplayUpdateHandlers();
    return;
  };

  evaluate = () => {
    if (!this.currentOperator && !this.lastOperator) return;

    let leftNum = this.currentTotal;
    let rightNum = parseFloat(this.onDisplay);

    const operation = operations[this.currentOperator || "??"];

    const result = operation(leftNum, rightNum);
    this.currentTotal = null;
    this.onDisplay = result;
    this.fireDisplayUpdateHandlers();
    this.displayShouldClear = true;

    this.history.push({ operation, leftNum });
    return result;
  };

  clear = () => {
    this.onDisplay = undefined;
    this.fireDisplayUpdateHandlers();
    this.currentTotal = "0";
    this.currentOperator = null;
    this.lastOperator = null;
    this.displayShouldClear = true;
  };
}

export default Calculator;
