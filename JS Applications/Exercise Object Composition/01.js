(function () {
    Array.prototype.last = function () {
        return this[this.length - 1];
    };

    Array.prototype.skip = function (n) {
        return this.slice(n);
    };
    Array.prototype.take = function (n) {
        return this.slice(0, n);
    };
    Array.prototype.sum = function () {
        let sum = 0;
        for (let element of this)
            sum += element;
        return sum;
    };
    Array.prototype.average = function () {
        return this.sum() / this.length;
    };


})();

var testArray = [1, 2, 3];

console.log(testArray.last());