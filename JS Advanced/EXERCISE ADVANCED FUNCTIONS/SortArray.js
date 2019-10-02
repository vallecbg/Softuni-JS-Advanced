function solve(arr, method){
    let asc = (a, b) => a - b;
    let desc = (a, b) => b - a;

    let sorts = {
        asc,
        desc
    }

    return arr.sort(sorts[method]);
}

console.log(solve([14, 7, 17, 6, 8], 'asc'))