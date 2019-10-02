function solve(...input) {
    let result = {};
    for (const arg of input) {
        console.log(`${typeof(arg)}: ${arg}`);
        if (!result[typeof (arg)]) {
            result[typeof (arg)] = 1;
        } else {
            result[typeof (arg)]++;
        }
    }

    Object.keys(result).sort((a, b) => result[b] - result[a]).forEach(x => console.log(`${x} = ${result[x]}`))
}

solve({ name: 'bob'}, 3.333, 9.999)