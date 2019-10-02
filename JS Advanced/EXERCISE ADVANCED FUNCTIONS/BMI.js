function solve(name, age, weight, height){
    let bmi = Math.round(weight / (Math.pow((height/100), 2)));

    let status = "";

    if(bmi < 18.5){
        status = "underweight";
    }
    else if (bmi >= 18.5 && bmi < 25){
        status = "normal"
    }
    else if (bmi >= 25 && bmi < 30){
        status = "overweight"
    }
    else if (bmi >= 30){
        status = "obese"
    }

    let result = {
        name,
        personalInfo:{
            age,
            weight,
            height
        },
        BMI: bmi,
        status
    }

    if(status === "obese"){
        result["recommendation"] = 'admission required';
    }

    return result;
}

console.log(solve("Peter", 29, 75, 182));
console.log(solve("Honey Boo Boo", 9, 57, 137));
console.log(solve("Vallec", 16, 56, 166));