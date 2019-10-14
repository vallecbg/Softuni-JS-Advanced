class Stringer{
    constructor(innerString, innerLength) {
        this.innerString = innerString;
        this.innerLength = Number(innerLength);
    }

    increase(length){
        this.innerLength += length;
    }

    decrease(length){
        this.innerLength = Math.max(0, this.innerLength - length);
    }

    toString(){
        if(this.innerString.length > this.innerLength){
            return this.innerString.substring(0, this.innerLength) + "...";
        } else {
            return this.innerString;
        }
    }
}

function solve(){
    let test = new Stringer("Test", 5);
console.log(test.toString()); // Test

test.increase(3);
console.log(test.toString()); // Te...

test.decrease(20);
console.log(test.toString()); // ...

test.increase(4); 
console.log(test.toString()); // Test

}

solve();