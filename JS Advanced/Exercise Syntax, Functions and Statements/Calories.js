function solve(...parameters){
    let array = Object.assign(...parameters);
    let result = {};
    for(let i = 0; i < array.length; i+=2){
        var name = array[i];
        var value = array[i+1];
        result[name] = Number(value);
    }
    console.log(result);
}

solve(['Yoghurt', 48, 'Rise', 138, 'Apple', 52]);