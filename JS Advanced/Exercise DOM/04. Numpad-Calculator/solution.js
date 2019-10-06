function solve() {
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let operands = ['/', '*', '-', '+'];
    let point = '.';
    let equals = '=';
    const regex = /([0-9\.]+) ([\*\/\-\+]) ([0-9\.]+)/gm;

    let output = document.getElementById('expressionOutput');
    let res = document.getElementById('resultOutput');

    let result;
    
    document.querySelector("#calculator > div.top > button").addEventListener("click", function clear(e){
        output.innerHTML = '';
        res.innerHTML = '';
    })

    Array
    .from(document.querySelectorAll("#calculator > div.keys > button"))
    .map(x => x.addEventListener("click", function add(e){
        let val = e.target.value
        if(val === equals){
            result = calculate();
            showResult(result);
        } else {
            if(operands.includes(val)){
                output.innerHTML += ` ${val} `;
            } else {
                output.innerHTML += val;
            }
        
        }
    }));

    function showResult(result){
        res.innerHTML = result;
    }

    function calculate(){
        let m;
        let leftNum;
        let operand;
        let rightNum;
        while ((m = regex.exec(output.innerHTML)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                switch(groupIndex){
                    case 1: {leftnum = Number(match)} break;
                    case 2: {operand = match} break;
                    case 3: {rightNum = Number(match)} break;
                }
            });
        }

        let sum;
        switch(operand){
            case '+': {sum = leftnum + rightNum} break;
            case '-': {sum = leftnum - rightNum} break;
            case '/': {sum = leftnum / rightNum} break;
            case '*': {sum = leftnum * rightNum} break;
        }
        //CHeck if needed
        if(sum === undefined || sum === Infinity){
            sum = NaN;
        }
        return sum;
    }
}