function solve(arr){
    let max = 0;
    let nums = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] >= max){
            max = arr[i];
            nums.push(arr[i]);
        }
    }

    console.log(nums.join("\n"));
}

solve([20, 
    3, 
    2, 
    15,
    6, 
    1]
    
)