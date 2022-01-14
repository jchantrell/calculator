const numberKey = document.querySelectorAll('[data-num]');
const operatorKey = document.querySelectorAll('[data-op]');
const decimalKey = document.querySelector('[data-decimal]');
const equalsKey = document.querySelector('[data-equals]');
const backspaceKey = document.querySelector('.backspace');
const clearKey = document.querySelector('[data-clear]');
const inputField = document.querySelector('.input');
const outputField = document.querySelector('.output');

let userInput = '';
let storedInput = '';
let output = '';

// set up listener on each number key, input value of key on press
numberKey.forEach((key) => key.addEventListener('click', () => inputNumber(key.textContent)))

// set up listener on each operator key, input value of key on press
operatorKey.forEach((key) => key.addEventListener('click', () => inputOperator(key.textContent)))

// set up listeners for all other keys
decimalKey.addEventListener('click', inputDecimal)
equalsKey.addEventListener('click', equals)
backspaceKey.addEventListener('click', backspace)
clearKey.addEventListener('click', clearData)

function inputNumber(input){
    if (inputField.textContent == '0'){
        inputField.textContent = ''
    }
    inputField.textContent += input;
}

function inputOperator(operator){


}

function inputDecimal(){
    if (inputField.textContent == ''){
        inputField.textContent = '0'
    }
    else if (inputField.textContent.includes('.')){
        return;
    }
    else inputField.textContent += '.'
}

function operate(operator){
    if (inputField.textContent != "0"){
        userInput = inputField.textContent;
        outputField.textContent = userInput;
    }
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function percentage(a, b){
    if (a == '0' && b == '0'){
        outputField.textContent = "Not possible."
    }
    sum = (100 * a) / b;
    return sum;
}

function equals(a, b){

}

function clearScreen(){

}

function clearData() {
    inputField.textContent = '0';
    outputField.textContent = '';
    userInput = '';
    storedInput = '';
    output = '';
}

function backspace() {
    inputField.textContent = inputField.textContent.slice(0, -1);
    if (inputField.textContent == ''){
        inputField.textContent = '0'
    }
}