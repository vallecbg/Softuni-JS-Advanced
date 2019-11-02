function getFibonator(){
    let previousEl = 0;
    let current = 1;

    return function(){
        const result = previousEl + current;
        previousEl = current;
        current = result;

        return previousEl;
    }
}

let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13
