function subtract() {
    let firstNum = Number(document.querySelector("#firstNumber").value);
    let secondNum = Number(document.querySelector("#secondNumber").value);
    
    let resultOutput = document.querySelector("#result");

    let result = firstNum - secondNum;
    resultOutput.textContent = result;
}