function solve(arr){
    let step = Number(arr.pop());
    for(let i = 0; i < arr.length; i += step){
        console.log(arr[i]);
    }
}

solve(['1', 
'2',
'3', 
'4', 
'5', 
'6']
)