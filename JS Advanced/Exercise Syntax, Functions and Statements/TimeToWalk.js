function solve(x, y, z){
    let steps = Number(x);
    let footprint = Number(y);
    let speed = Number(z);

    let distanceMeters = steps * footprint;
    let speedSeconds = speed / 3.6;
    let time = distanceMeters / speedSeconds;
    let rest = Math.floor(distanceMeters / 500);

    var hours = Math.floor(time / 3600);
    var minutes = Math.floor(time / 60);
    var seconds = Math.round(time - (minutes * 60));

    console.log((hours < 10 ? "0" : "") + hours + ":" + (minutes + rest < 10 ? "0" : "") + (minutes + rest) + ":" + (seconds < 10 ? "0" : "") + seconds);

}

//solve(4000, 0.60, 5);
solve(2564, 0.70, 5.5);
