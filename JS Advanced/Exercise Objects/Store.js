function solve(input){
    input.sort();

    const products = input.reduce((result, word) => {
        // get the first letter. (this assumes no empty words in the list)
        const letter = word[0];
        
        // ensure the result has an entry for this letter
        result[letter] = result[letter] || [];
        
        // add the word to the letter index
        result[letter].push(word);

        // return the updated result
        return result;
    }, {});
    
    for (const iterator in products) {
        console.log(iterator);
        for (const val of Object.values(products[iterator])) {
            [key, value] = val.split(" : ");
            console.log(`  ${key}: ${value}`);
        }
    }
}

solve(['Banana : 2',
'Rubic\'s Cube : 5',
'Raspberry P : 4999',
'Rolex : 100000',
'Rollon : 10',
'Rali Car : 2000000',
'Pesho : 0.000001',
'Barrel : 10']
)

// solve(['Appricot : 20.4',
// 'Fridge : 1500',
// 'TV : 1499',
// 'Deodorant : 10',
// 'Boiler : 300',
// 'Apple : 1.25',
// 'Anti-Bug Spray : 15',
// 'T-Shirt : 10']
// )