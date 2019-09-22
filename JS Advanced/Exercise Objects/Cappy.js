function solve(input){
    let juices = {};
    let bottles = {};

    input.forEach(line => {
        let [name, quantity] = line.split(' => ');
        quantity = Number(quantity);

        if(!juices.hasOwnProperty(name)){
            juices[name] = 0;
        }

        juices[name] += quantity;
        let currentQuantity = juices[name];

        if(currentQuantity >= 1000){
            bottles[name] = Math.trunc(currentQuantity / 1000);
        }
    });

    for (const [name, quantity] of Object.entries(bottles)) {
        console.log(`${name} => ${quantity}`);
    }
}

solve(['Kiwi => 234',
'Pear => 2345',
'Watermelon => 3456',
'Kiwi => 4567',
'Pear => 5678',
'Watermelon => 6789']
)

// solve(['Orange => 2000',
// 'Peach => 1432',
// 'Banana => 450',
// 'Peach => 600',
// 'Strawberry => 549']
// )