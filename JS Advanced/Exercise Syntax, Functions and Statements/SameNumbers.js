function solve(x){
    var digit = x.toString()[0];
    let sumOfDigits = 0;
    let sameDigits = true;
    var digits = x.toString().split('').map(Number);
    for(let i = 0; i < digits.length; i++){
        if(digits[i] != digit){
            sameDigits = false;
        }
        
        sumOfDigits += digits[i];
    }

    console.log(sameDigits);
    console.log(sumOfDigits);
}

solve(2222222);