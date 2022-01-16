const allKeys = document.querySelectorAll('.button')
const numberKey = document.querySelectorAll('[data-num]');
const operatorKey = document.querySelectorAll('[data-op]');
const decimalKey = document.querySelector('[data-decimal]');
const equalsKey = document.querySelector('[data-equals]');
const backspaceKey = document.querySelector('.backspace');
const clearKey = document.querySelector('[data-clear]');
const inputField = document.querySelector('.input');
const outputField = document.querySelector('.output');
const calculations = document.querySelector('.calculations');
const previousCalculations = [];
let userInput = '';
let storedOutput = ''
let currentOperation = null;
let previousOperation = null;

// set up listener on each number key, input value of key on press
numberKey.forEach((key) => key.addEventListener('click', () => inputNumber(key.textContent)))

// set up listener on each operator key, input value of key on press
operatorKey.forEach((key) => key.addEventListener('click', () => inputOperator(key.textContent)))

// set up listeners for all other keys
decimalKey.addEventListener('click', inputDecimal)
equalsKey.addEventListener('click', equals)
backspaceKey.addEventListener('click', backspace)
clearKey.addEventListener('click', clearData)

// when num key pressed, append value to end of input string
function inputNumber(input){
    if (inputField.textContent == '0'){
        inputField.textContent = ''
    }
    inputField.textContent += input;
}

// when decimal key pressed, check if decimal present, if not then append to end of input string
function inputDecimal(){
    if (inputField.textContent == ''){
        inputField.textContent = '0'
    }
    else if (inputField.textContent.includes('.')){
        return;
    }
    else inputField.textContent += '.'
}

function inputOperator(operator){
    currentOperation = operator; 
    if (inputField.textContent == '0' && storedOutput == ''){
        return;
    }
    // if there is no input, do nothing
    if (inputField.textContent == '0'){
        previousOperation = operator;
        outputField.textContent = `${storedOutput} ${currentOperation}`
        return;
    }
    // setup for start of program - initial operation is measured against null so have ignore 
    if (previousOperation == null ){
        previousOperation = currentOperation;
        operate(previousOperation)
    }
    else 
        operate(operator)
        previousOperation = operator;
}

function operate(operator){
    // if output stored of previous calculation, use that for calculation
    if (storedOutput != ""){
        a = storedOutput;
        b = inputField.textContent;
        compute(operator, a, b);
    }
    // if there is no previous calculation, use stored number + current input for calculation
    else if (outputField.textContent != "" && previousOperation != null){
        a = userInput;
        b = inputField.textContent;
        compute(operator, a, b);
    }
    updateDisplay(operator);
 }  

 function equals(){
     if (userInput == ''){
         return
     }
     if (inputField.textContent == '0' && currentOperation == null){
        return;
     }
     else if (currentOperation == null){
         storedOutput = inputField.textContent;
         outputField.textContent = `${storedOutput} = ${inputField.textContent}`
         updateCalculations(`${inputField.textContent} = ${storedOutput}`)
         clearDisplay();
     }
     else if (storedOutput != ''){
         a = parseFloat(storedOutput);
         b = parseFloat(inputField.textContent)
         compute(currentOperation, a, b)
         clearDisplay();
         currentOperation = null;
     }
     else if (storedOutput == '' && userInput != ''){
        a = parseFloat(userInput);
        b = parseFloat(inputField.textContent)
        compute(currentOperation, a, b)
        clearDisplay();
        currentOperation = null;
    }
     else if (storedOutput == ''){
        a = parseFloat(userInput);
        b = parseFloat(inputField.textContent)
        compute(currentOperation, a, b)
        clearDisplay();
        currentOperation = null;
    }
 }

function compute(operator, a, b){
    a = parseFloat(a);
    b = parseFloat(b);
    if (operator == '+'){
        add(a, b)
    }
    else if (operator == '-'){
        subtract(a, b)
    }
    else if (operator == '×'){
        multiply(a, b)
    }
    else if (operator == '÷'){
        divide(a, b)
    }
    else if (operator == '%'){
        percent(a, b)
    }
}

function add(a, b){
    storedOutput = Math.round((a + b) * 100) / 100;
    outputField.textContent = `${storedOutput}`;
    updateCalculations(`${a} + ${b} = ${storedOutput}`)
    cleanUp();
}

function subtract(a, b){
    storedOutput = Math.round((a - b) * 100) / 100;
    outputField.textContent = `${storedOutput}`;
    updateCalculations(`${a} - ${b} = ${storedOutput}`);
    cleanUp();
    
}

function multiply(a, b){
    storedOutput = Math.round((a * b) * 100) / 100;
    outputField.textContent = `${storedOutput}`;
    updateCalculations(`${a} × ${b} = ${storedOutput}`)
    cleanUp();
}

function divide(a, b){
    if (a == '0' || b == '0' || a == '0' && b == '0'){
        updateCalculations(`Cannot divide by zero.`);
        storedOutput = userInput;
        outputField.textContent = `${storedOutput}`;
        return;
    }
    else 
        storedOutput = Math.round((a / b) * 100) / 100;
        outputField.textContent = `${storedOutput}`;
        updateCalculations(`${a} ÷ ${b} = ${storedOutput}`)
        cleanUp();
}

function percent(a, b){
    if (a == '0' || b == '0' || a == '0' && b == '0'){
        updateCalculations(`Cannot get a percentage of zero.`);
        storedOutput = userInput;
        outputField.textContent = `${storedOutput}`;
        return;
    }
    storedOutput = Math.round(((100 * a) / b) * 100) / 100;
    outputField.textContent = `${storedOutput}`;
    updateCalculations(`${a} % ${b} = ${storedOutput}`)
}

function updateDisplay(operator){
    if (operator == null){
        outputField.textContent = `${userInput} ${currentOperation}`
    }
    if (storedOutput == ''){
        userInput = inputField.textContent;
        outputField.textContent = `${userInput} ${currentOperation}`
        clearDisplay();
        }
    else if (storedOutput != ''){
        userInput = inputField.textContent;
        outputField.textContent = `${storedOutput} ${currentOperation}`
        clearDisplay();
    }
 }

function cleanUp(){
    previousOperation = currentOperation;
    curruntOperation = null;
}

function clearDisplay(){
    inputField.textContent = '0'
}

function clearData() {
    inputField.textContent = '0';
    outputField.textContent = '';
    userInput = '';
    storedOutput = '';
    output = '';
}

function backspace() {
    inputField.textContent = inputField.textContent.slice(0, -1);
    if (inputField.textContent == ''){
        inputField.textContent = '0'
    }
}

// push calculation to list and add to a list on page
function updateCalculations(content) {
    previousCalculations.push(content)
    let li = document.createElement('li');
    li.innerText = content;
    calculations.appendChild(li);
    updateScroll(); 
}

// keep calculation list element scrolled to bottom to show most recent calculations
function updateScroll(){
    calculations.scrollTop = calculations.scrollHeight;
    inputField.scrollTop = calculations.scrollHeight;
    outputField.scrollTop = calculations.scrollHeight;
}

// setup keyboard listener - ugly function, will condense later
document.addEventListener('keydown', e => {
    if (e.key === '1') {
        inputNumber('1')
        document.querySelector('.one').classList.add('pressed');
    }
    if (e.key === '2') {
        inputNumber('2')
        document.querySelector('.two').classList.add('pressed');
    }
    if (e.key === '3') {
        inputNumber('3')
        document.querySelector('.three').classList.add('pressed');
    }1
    if (e.key === '4') {
        inputNumber('4')
        document.querySelector('.four').classList.add('pressed');
    }
    if (e.key === '5') {
        inputNumber('5')
        document.querySelector('.five').classList.add('pressed');
    }
    if (e.key === '6') {
        inputNumber('6')
        document.querySelector('.six').classList.add('pressed');
    }
    if (e.key === '7') {
        inputNumber('7')
        document.querySelector('.seven').classList.add('pressed');
    }
    if (e.key === '8') {
        inputNumber('8')
        document.querySelector('.eight').classList.add('pressed');
    }
    if (e.key === '9') {
        inputNumber('9')
        document.querySelector('.nine').classList.add('pressed');
    }
    if (e.key === '0') {
        inputNumber('0')
        document.querySelector('.zero').classList.add('pressed');
    }
    if (e.key === '.') {
        inputDecimal()
        document.querySelector('.decimal').classList.add('pressed');
    }
    if (e.key === '=' || e.key === 'Enter') {
        equals()
        document.querySelector('.equals').classList.add('pressed');
    }
    if (e.key === 'c' || e.key === 'Escape' || e.key === 'C') {
        clearData()
        document.querySelector('.clear').classList.add('pressed');
    }
    if (e.key === 'Backspace') {
        backspace()
        document.querySelector('.backspace').classList.add('pressed');
    }
    if (e.key === '%') {
        inputOperator('%')
        document.querySelector('.percent').classList.add('pressed');
    }    
    if (e.key === '+') {
        inputOperator('+')
        document.querySelector('.plus').classList.add('pressed');
    }
    if (e.key === '-') {
        inputOperator('-')
        document.querySelector('.minus').classList.add('pressed');
    } 
    if (e.key === '*') {
        inputOperator('×')
        document.querySelector('.multiply').classList.add('pressed');
    } 
    if (e.key === '/') {
        inputOperator('÷')
        document.querySelector('.divide').classList.add('pressed');
    }
});

document.addEventListener('keyup', e => {
    if (e.key === '1') {
        document.querySelector('.one').classList.remove('pressed');
    }
    if (e.key === '2') {
        document.querySelector('.two').classList.remove('pressed');
    }
    if (e.key === '3') {
        document.querySelector('.three').classList.remove('pressed');
    }1
    if (e.key === '4') {
        document.querySelector('.four').classList.remove('pressed');
    }
    if (e.key === '5') {
        document.querySelector('.five').classList.remove('pressed');
    }
    if (e.key === '6') {
        document.querySelector('.six').classList.remove('pressed');
    }
    if (e.key === '7') {
        document.querySelector('.seven').classList.remove('pressed');
    }
    if (e.key === '8') {
        document.querySelector('.eight').classList.remove('pressed');
    }
    if (e.key === '9') {
        document.querySelector('.nine').classList.remove('pressed');
    }
    if (e.key === '0') {
        document.querySelector('.zero').classList.remove('pressed');
    }
    if (e.key === '.') {
        document.querySelector('.decimal').classList.remove('pressed');
    }
    if (e.key === '=' || e.key === 'Enter') {
        document.querySelector('.equals').classList.remove('pressed');
    }
    if (e.key === 'c' || e.key === 'Escape' || e.key === 'C') {
        document.querySelector('.clear').classList.remove('pressed');
    }
    if (e.key === 'Backspace') {
        document.querySelector('.backspace').classList.remove('pressed');
    }
    if (e.key === '%') {
        document.querySelector('.percent').classList.remove('pressed');
    }    
    if (e.key === '+') {
        document.querySelector('.plus').classList.remove('pressed');
    }
    if (e.key === '-') {
        document.querySelector('.minus').classList.remove('pressed');
    } 
    if (e.key === '*') {
        document.querySelector('.multiply').classList.remove('pressed');
    } 
    if (e.key === '/') {
        document.querySelector('.divide').classList.remove('pressed');
    }
});