const input = document.querySelector('.input');
const output = document.querySelectorAll('.output');
const clear = document.querySelectorAll('.clear');
const buttons = document.querySelectorAll('.button');
buttons.forEach(buttonValue => buttonValue.addEventListener('click', event => {
    clickButton(event.target.getAttribute("data-input"));
}));

function clickButton(buttonValue){
    const containsNumber = /\d/;
    if (containsNumber.test(buttonValue)){   
        inputValue = inputValue += buttonValue;
        input.textContent = inputValue; 
    }
    if (buttonValue == "."){
        input.textContent = inputValue += ".";
    }
    if (buttonValue == "clear"){
        clearInput()
    }
    if (buttonValue == "+"){
        add()
    }
    if (buttonValue == "-"){
        substract()
    }
    if (buttonValue == "*"){
        multiply()
    }
    if (buttonValue == "/"){
        divide()
    }
    if (buttonValue == "="){
        equals()
    }
}

let memory1 = 0;
let memory2 = 0;
let inputValue = ""
let outputValue = ""

function operate(operator, num1, num2){
    if (operator == "+"){
        add(num1, num2)
    }
    if (operator == "-"){
        subtract(num1, num2)
    }
    if (operator == "*"){
        multiply(num1, num2)
    }
    if (operator == "/"){
        divide(num1, num2)
    }
}

function equals(num1, num2){

}

function add(num1, num2){
    input.textContent = `${inputValue} +`
    let sum = num1 + num2;
    console.log(sum)
}

function subtract(num1, num2){
    sum = num1 - num2;
    console.log(sum)
}

function multiply(num1, num2){
    sum = num1 * num2;
    console.log(sum)
}

function divide(num1, num2){
    sum = num1 / num2;
    console.log(sum)
}

function clearInput(){
    input.textContent = ""
    inputValue = ""
}


