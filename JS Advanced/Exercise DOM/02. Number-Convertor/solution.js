function solve() {
    const selectMenuTo = document.getElementById('selectMenuTo');

    document.querySelector("#container > button").addEventListener('click', convert);

    function convert(){
        let number = Number(document.querySelector("#input").value);
        let convertType = selectMenuTo.value;
        let result;
        if(convertType === "binary"){
            result = convertToBinary(number);
        }
        else if(convertType === "hexadecimal"){
            result = convertToHexadecimal(number).toUpperCase();
        }

        let output = document.querySelector("#result");
        output.value = result;
    }

    function convertToBinary(number){
        return (number >>> 0).toString(2);
    }

    function convertToHexadecimal(number){
        return number.toString(16);
    }

    function createSelectMenuOptions(){
        let binaryOption = document.createElement('option');
        binaryOption.textContent = 'Binary';
        binaryOption.value = 'binary';

        let hexadecimalOption = document.createElement('option');
        hexadecimalOption.textContent = 'Hexadecimal';
        hexadecimalOption.value = 'hexadecimal';

        selectMenuTo.appendChild(binaryOption);
        selectMenuTo.appendChild(hexadecimalOption);
    }

    createSelectMenuOptions();
}