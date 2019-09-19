function calculate(...parameters){
    let array = Object.assign(...parameters);
    let speed = array[0];
    let area = array[1];

    function zone(area) {
        if(area == 'motorway') {return 130;}
        else if(area=='interstate'){return 90;}
        else if(area=='city'){return 50;}
        else if(area=='residential'){return 20;}
    }

    let speedDiff = speed - zone(area);

    if(speedDiff > 0 && speedDiff <= 20){
        console.log("speeding");
    }
    else if(speedDiff > 20 & speedDiff <= 40){
        console.log("excessive speeding");
    }
    else if(speedDiff > 40){
        console.log("reckless driving");
    }
}

calculate([40, 'city']);