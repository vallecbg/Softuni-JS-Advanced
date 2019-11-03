  
function carFactory(order) {
    let car = {
        model: order.model,
        engine: {power: 90, volume: 1800},
        carriage: {
            type: order.carriage,
            color: order.color
        },
        wheels: []
    };
    if (order.power > 90 && order.power <= 120) {
        car.engine.power = 120;
        car.engine.volume = 2400
    } else if (order.power >= 200) {
        car.engine.power = 200;
        car.engine.volume = 3500
    }
    let wheelsize = Math.floor(order.wheelsize);
    if (wheelsize % 2 == 0)
        wheelsize--;
    for (let i = 0; i < 4; i++)
        car.wheels.push(wheelsize);
    return car;
}

console.log(carFactory({ model: 'VW Golf II',
power: 90,
color: 'blue',
carriage: 'hatchback',
wheelsize: 14 }
));

console.log(carFactory({ model: 'Opel Vectra',
power: 110,
color: 'grey',
carriage: 'coupe',
wheelsize: 17 }
));