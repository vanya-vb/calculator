class Calculator {
    constructor(prevOperandTextEl, curOperandTextEl) {
        this.prevOperandTextEl = prevOperandTextEl;
        this.curOperandTextEl = curOperandTextEl;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previuosOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }

        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') {
            return;
        }

        if (this.previuosOperand !== '') {
            this.compute();
        }

        this.operation = operation;
        this.previuosOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previuosOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) {
            return;
        }

        switch (this.operation) {
            case '+': computation = prev + current; break;
            case '-': computation = prev - current; break;
            case 'x': computation = prev * current; break;
            case '÷': computation = prev / current; break;
            default: return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previuosOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.curOperandTextEl.innerText = this.getDisplayNumber(this.currentOperand);

        if (this.operation != null) {
            this.prevOperandTextEl.innerText = `${this.getDisplayNumber(this.previuosOperand)} ${this.operation}`;
        } else {
            this.prevOperandTextEl.innerText = '';
        }
    }
}

// capture elements in variables
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const prevOperandTextEl = document.querySelector('[data-previous-operand]');
const curOperandTextEl = document.querySelector('[data-current-operand]');

const calculator = new Calculator(prevOperandTextEl, curOperandTextEl);

// event listeners on buttons
numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText);
        calculator.updateDisplay();
    });
});

equalsBtn.addEventListener('click', btn => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearBtn.addEventListener('click', btn => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteBtn.addEventListener('click', btn => {
    calculator.delete();
    calculator.updateDisplay();
});


