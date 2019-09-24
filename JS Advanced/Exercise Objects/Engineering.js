function solve(input){

    let cars = input.reduce((result, line) => {
        [brand, model, carsProduced] = line.split(" | ");
        carsProduced = Number(carsProduced);
        
        result[brand] = result[brand] || [];

        if(result[brand].find(c => c.model == model)){
            let producer = result[brand].find(c => c.model == model);
            producer.carsProduced += carsProduced;
        }
        else{
        result[brand].push({model, carsProduced});
        }

        // return the updated result
        return result;
    }, {});

    for (const brand in cars) {
        console.log(brand);
        for (const val of Object.values(cars[brand])) {
            if(Number.isNaN(val)){continue;}
            console.log(`###${val.model} -> ${val.carsProduced}`);
        }
    }

}

solve(['Audi | Q7 | 1000',
'Audi | Q6 | 100',
'BMW | X5 | 1000',
'BMW | X6 | 100',
'Citroen | C4 | 123',
'Volga | GAZ-24 | 1000000',
'Lada | Niva | 1000000',
'Lada | Jigula | 1000000',
'Citroen | C4 | 22',
'Citroen | C5 | 10']
)
// solve(['Citroen | C4 | 123',
// 'Citroen | C4 | 22',])