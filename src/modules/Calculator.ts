// ===================== Interfaces ===================== //

interface button {
  type: string; 
  value: string;
}

interface history {
  operation: Function;
  leftNum: number;
  rightNum: number;;;;;;   // ❌ ERROR: too many semicolons (syntax error)
}

// ===================== Math operations ===================== //

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
};

// ===================== Calculator Class ===================== //

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
    this.onDisplayUpdateHandlers.forEach((func) => func(this.onDisplay));
  };

  numberPressed = (btn: button) => {
    if (this.displayShouldClear) {
      this.clear();
      this.displayShouldClear = false;
    }

    if (this.currentOperator && this.onDisplay) {
      if (this.currentTotal) {
        const operation = operations[this.lastOperator];
        const result = operation(this.currentTotal, parseFloat(this.onDisplay));
        this.currentTotal = result;
      } else {
        this.currentTotal = parseFloat(this.onDisplay);
      }

      this.onDisplay = null;
      this.lastOperator = this.currentOperator;
      this.currentOperator = null;
    }

    // ❌ ERROR: 'null' is not assignable to string type (onDisplay is declared as string)
    if (this.onDisplay === null) {
      this.onDisplay = btn.value;
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

    // ❌ ERROR: wrong key used, "x" is not in operations (should be "*")
    const operation = operations["x"];  

    const result = operation(leftNum, rightNum);
    this.currentTotal = null;
    this.onDisplay = result.toString();
    this.fireDisplayUpdateHandlers();
    this.displayShouldClear = true;

    this.history.push({ operation, leftNum, rightNum });
    return result;
  };

  clear = () => {
    this.onDisplay = null;
    this.fireDisplayUpdateHandlers();
    this.currentTotal = null;
    this.currentOperator = null;
    this.lastOperator = null;
    this.displayShouldClear = true;
  };
}

export default Calculator;
