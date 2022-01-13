let userInput = "";
let storedInput = "";
let outputValue = "";
const storedInputText = document.querySelector('.stored-input')
const inputRow = document.querySelector('.input-row')
const input = document.querySelector('.input');
const output = document.querySelector('.output');
const operator = document.querySelector('.operator');
const backspace = document.querySelector('.backspace');
const clear = document.querySelector('.clear');
const buttons = document.querySelectorAll('.button');
buttons.forEach(buttonValue => buttonValue.addEventListener('click', event => {
    clickButton(event.target.getAttribute("data-input"));
}));

function clickButton(buttonValue){
    if (buttonValue == "clear"){
        clearScreen("all")
    }
    else if (buttonValue == "backspace"){
        removeLastLetter = userInput.slice(0, -1);
        userInput = removeLastLetter;
    }
    else if (buttonValue == "+"){
        if (storedInput != 0){
            sum = add(parseInt(userInput), parseInt(storedInput))
            input.textContent = "0"
            userInput = "0"
            storedInputText.textContent = ""
            storedInput = "0"
            operator.textContent = ""
            return sum;

        }
        if (userInput != 0){
            storedInput = userInput;
            operator.textContent = buttonValue;
            storedInputText.textContent = userInput;
            userInput = 0;
        }
    }
    else if (buttonValue == "-"){
        storedInput = userInput;
        operator.textContent = buttonValue;
        operate("-")
    }
    else if (buttonValue == "*"){
        storedInput = userInput;
        operator.textContent = buttonValue;
        operate("*")
    }
    else if (buttonValue == "/"){
        storedInput = userInput;
        operator.textContent = buttonValue;
        operate("/")
    }
    else if (userInput == 0){
        userInput = buttonValue;
        input.textContent = userInput;
    }
    else
        userInput = userInput += buttonValue;
        input.textContent = userInput;
};

function operate(operator){

};

function add(num1, num2){
    sum = num1 + num2;
    output.textContent = `${userInput} + ${storedInput} = ${sum}`
};

function subtract(){

};

function multiply(){

};

function divide(){

};

function clearScreen(instruction){
    if (instruction == "all"){
        input.textContent = "0"
        userInput = "0"
        output.textContent = ""
        outputValue = ""
        operator.textContent = ""
        storedInput = ""
        storedInputText.textContent = ""
    }
    if (instruction == "input"){
        input.textContent = "0"
        userInput = "0"
    }
};


