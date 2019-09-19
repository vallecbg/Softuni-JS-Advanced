function calculate(...parameters){
    let array = Object.assign(...parameters);
    let number = array[0];
    for(let i = 1; i < array.length; i++){
        let command = array[i];
        switch (command){
            case "chop": 
                number /= 2;
            break;
            case "dice":
                number = Math.sqrt(number);
            break;
            case "spice":
                number++;
            break;
            case "bake":
                number *= 3;
            break;
            case "fillet":
                number *= 0.8;
            break;
        }

        console.log(number.toFixed(1).replace(/[.,]0$/, ""));
    }
}

// calculate(['32', 'chop', 'chop', 'chop', 'chop', 'chop']);
calculate(['9', 'dice', 'spice', 'chop', 'bake', 'fillet']);