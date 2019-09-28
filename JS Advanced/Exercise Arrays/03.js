function solve(arr){
    let num = 1;
    let numbers = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === "add"){
            numbers.push(num);
        }
        else if(arr[i] === "remove"){
            numbers.pop();
        }

        num++;
    }

    numbers.length > 0 ? console.log(numbers.join("\n")) : console.log("Empty");
}

solve(['remove', 
'remove', 
'remove']

)