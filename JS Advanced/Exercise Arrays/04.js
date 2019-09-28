function solve(arr){
    let rotations = arr.pop() % arr.length;

    for(let i = 0; i < rotations; i++){
        arr.unshift(arr.pop());
    }

    console.log(arr.join(" "));
}

solve(['Banana', 
'Orange', 
'Coconut', 
'Apple', 
'15']

)