function solve(arr) {
    let areEqual = check(arr);

    console.log(areEqual);
}

function check(arr){
    let sum = 0;
    arr[0].forEach(x => sum += x);
    for(let row = 1; row < arr.length; row++){
        let currentSum = 0;
        arr[row].forEach(x => currentSum += x);
        if(sum != currentSum) return false;
    }

    for(let col = 0; col < arr[0].length; col++){
        let currentSum = 0;
        
        for(let row = 0; row < arr.length; row++){
            currentSum += arr[row][col];
        }
        if(sum != currentSum) return false;
    }

    return true;
}

solve([[4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]]
)