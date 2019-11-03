(function () {
    String.prototype.isEmpty = function () {
        return this == '';
    };
    String.prototype.ensureStart = function (str) {
        if (this.startsWith(str))
            return this.toString();
        return str + this.toString();
    };
    String.prototype.ensureEnd = function (str) {
        if (this.endsWith(str))
            return this.toString();
        return this.toString() + str;
    };
    String.prototype.truncate = function (n) {
        if (this.length < 4)
            return '.'.repeat(n);
        if (this.length <= n)
            return this.toString();
        if (this.indexOf(' ') == -1) {
            return this.slice(0, n - 3) + '...';
        }
        let tokens = this.split(' ');
        let result = tokens[0];
        for (let i = 1; i < tokens.length; i++) {
            if (result.length + tokens[i].length + 4 > n) // space + '...'
                return result + '...';
            result += ` ${tokens[i]}`;
        }
    };
    String.format = function (str) {
        for (let i = 1; i < arguments.length; i++)
            str = str.replace('{' + (i - 1) + '}', arguments[i]);
        return str;
    }
})();

let str = 'my string';
str = str.ensureStart('my');
console.log(str);
str = str.ensureStart('hello ');
console.log(str);
str = str.truncate(16);
console.log(str);
str = str.truncate(14);
console.log(str);
str = str.truncate(8);
console.log(str);
str = str.truncate(4);
console.log(str);
str = str.truncate(2);
console.log(str);
str = String.format('The {0} {1} fox', 'quick', 'brown');
console.log(str);
str = String.format('jumps {0} {1}', 'dog');
console.log(str);