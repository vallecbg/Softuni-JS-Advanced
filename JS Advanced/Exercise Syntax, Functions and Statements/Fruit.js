function solve(type, weight, price){
    let weightKg = (weight / 1000);
    let totalPrice = (weightKg * price);
    console.log(`I need $${totalPrice.toFixed(2)} to buy ${weightKg.toFixed(2)} kilograms ${type}.`);
}

console.log(solve('orange', 2500, 1.80));