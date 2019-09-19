function order(...parameters){
    let arrayInput = Object.assign(...parameters);
    let income = 0;
    for(let i = 0; i < arrayInput.length; i++){
        let array = Object.assign(arrayInput)[i].split(", ");

        let coins = array[0];
        let drink = array[1];
        
        let total = 0;

        let milk = false;
        let sugarAmount = 0;
        if (drink == "coffee"){
            var coffeeType = array[2];
            if(coffeeType == "caffeine"){
                total += 0.8;
            }
            else if(coffeeType == "decaf"){
                total += 0.9;
            }
            sugarAmount = array[3];
        }
        else if(drink == "tea"){
            total += 0.8;
            sugarAmount = array[2];
        }

        if(array[2] == "milk"){
            milk = true;
            sugarAmount = array[3];
        }
        else if(array[3] == "milk"){
            milk = true;
            sugarAmount = array[4];
        }

        if(milk){
            total = total + (total * 0.10);
            total = Math.round(total * 10) / 10;
        }

        if(sugarAmount > 0){
            total += 0.10;
        }

        if(coins - total >= 0.00){
            console.log(`You ordered ${drink}. Price: $${total.toFixed(2)} Change: $${(coins - total).toFixed(2)}`);
            income += total;
        }
        else{
            console.log(`Not enough money for ${drink}. Need $${Math.abs(coins - total).toFixed(2)} more.`);
        }
    }

    console.log(`Income Report: $${income.toFixed(2)}`);
}

order(['8.00, coffee, decaf, 4', '1.00, tea, 2'])

