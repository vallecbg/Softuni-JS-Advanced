// //2.	Even or Odd
// function isOddOrEven(string) {
//     if (typeof(string) !== 'string') {
//         return undefined;
//     }
//     if (string.length % 2 === 0) {
//         return "even";
//     }

//     return "odd";
// }
// module.exports = isOddOrEven;

// //3.	Char Lookup
// function lookupChar(string, index) {
//     if (typeof(string) !== 'string' || !Number.isInteger(index)) {
//         return undefined;
//     }
//     if (string.length <= index || index < 0) {
//         return "Incorrect index";
//     }

//     return string.charAt(index);
// }
// module.exports = lookupChar;

// //4. Math Enforcer
// let mathEnforcer = {
//     addFive: function (num) {
//         if (typeof (num) !== 'number') {
//             return undefined;
//         }
//         return num + 5;
//     },
//     subtractTen: function (num) {
//         if (typeof (num) !== 'number') {
//             return undefined;
//         }
//         return num - 10;
//     },
//     sum: function (num1, num2) {
//         if (typeof (num1) !== 'number' || typeof (num2) !== 'number') {
//             return undefined;
//         }
//         return num1 + num2;
//     }
// };

// module.exports = mathEnforcer;

// //5. String Builder
// class StringBuilder {
//     constructor(string) {
//         if (string !== undefined) {
//             StringBuilder._vrfyParam(string);
//             this._stringArray = Array.from(string);
//         } else {
//             this._stringArray = [];
//         }
//     }

//     append(string) {
//         StringBuilder._vrfyParam(string);
//         for (let i = 0; i < string.length; i++) {
//             this._stringArray.push(string[i]);
//         }
//     }

//     prepend(string) {
//         StringBuilder._vrfyParam(string);
//         for (let i = string.length - 1; i >= 0; i--) {
//             this._stringArray.unshift(string[i]);
//         }
//     }

//     insertAt(string, startIndex) {
//         StringBuilder._vrfyParam(string);
//         this._stringArray.splice(startIndex, 0, ...string);
//     }

//     remove(startIndex, length) {
//         this._stringArray.splice(startIndex, length);
//     }

//     static _vrfyParam(param) {
//         if (typeof param !== 'string') throw new TypeError('Argument must be string');
//     }

//     toString() {
//         return this._stringArray.join('');
//     }
// }

// module.exports = StringBuilder;

// //6.	Payment Package
// class PaymentPackage {
//     constructor(name, value) {
//         this.name = name;
//         this.value = value;
//         this.VAT = 20; // Default value    
//         this.active = true; // Default value
//     }

//     get name() {
//         return this._name;
//     }

//     set name(newValue) {
//         if (typeof newValue !== 'string') {
//             throw new Error('Name must be a non-empty string');
//         }
//         if (newValue.length === 0) {
//             throw new Error('Name must be a non-empty string');
//         }
//         this._name = newValue;
//     }

//     get value() {
//         return this._value;
//     }

//     set value(newValue) {
//         if (typeof newValue !== 'number') {
//             throw new Error('Value must be a non-negative number');
//         }
//         if (newValue < 0) {
//             throw new Error('Value must be a non-negative number');
//         }
//         this._value = newValue;
//     }

//     get VAT() {
//         return this._VAT;
//     }

//     set VAT(newValue) {
//         if (typeof newValue !== 'number') {
//             throw new Error('VAT must be a non-negative number');
//         }
//         if (newValue < 0) {
//             throw new Error('VAT must be a non-negative number');
//         }
//         this._VAT = newValue;
//     }

//     get active() {
//         return this._active;
//     }

//     set active(newValue) {
//         if (typeof newValue !== 'boolean') {
//             throw new Error('Active status must be a boolean');
//         }
//         this._active = newValue;
//     }

//     toString() {
//         const output = [
//             `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
//             `- Value (excl. VAT): ${this.value}`,
//             `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
//         ];
//         return output.join('\n');
//     }
// }

// module.exports = PaymentPackage;

//7.**Warehouse - Unit Testing
class Warehouse {

    get capacity() {
        return this._capacity;
    }

    set capacity(givenSpace) {

        if (typeof givenSpace === 'number' && givenSpace > 0) {
            return this._capacity = givenSpace;
        } else {
            throw `Invalid given warehouse space`;
        }
    }

    constructor(capacity) {
        this.capacity = capacity;
        this.availableProducts = {'Food': {}, 'Drink': {}};
    }

    addProduct(type, product, quantity) {

        let addedQuantity = ((this.capacity - this.occupiedCapacity()) - quantity);
        let output;

        if (addedQuantity >= 0) {

            if (this.availableProducts[type].hasOwnProperty(product) === false) {
                this.availableProducts[type][product] = 0;
            }

            this.availableProducts[type][product] += quantity;
            output = this.availableProducts[type];

        } else {
            throw `There is not enough space or the warehouse is already full`;
        }

        return output;
    }

    orderProducts(type) {

        let output;
        let sortedKeys = Object.keys(this.availableProducts[type])
            .sort((a, b) => this.availableProducts[type][b] - this.availableProducts[type][a]);

        let newObj = {};

        for (let product of sortedKeys) {

            if (newObj.hasOwnProperty(product) === false) {
                newObj[product] = 0;
            }

            newObj[product] += this.availableProducts[type][product];
        }

        this.availableProducts[type] = newObj;
        output = this.availableProducts[type];

        return output;
    }

    occupiedCapacity() {

        let output = 0;
        let productsCount = Object.keys(this.availableProducts['Food']).length +
            Object.keys(this.availableProducts['Drink']).length;

        if (productsCount > 0) {

            let quantityInStock = 0;

            for (let type of Object.keys(this.availableProducts)) {

                for (let product of Object.keys(this.availableProducts[type])) {

                    quantityInStock += this.availableProducts[type][product];
                }
            }

            output = quantityInStock;
        }

        return output;
    }

    revision() {

        let output = "";

        if (this.occupiedCapacity() > 0) {

            for (let type of Object.keys(this.availableProducts)) {
                output += `Product type - [${type}]\n`;
                for (let product of Object.keys(this.availableProducts[type])) {
                    output += `- ${product} ${this.availableProducts[type][product]}\n`;
                }
            }
        } else {
            output = 'The warehouse is empty';
        }

        return output.trim();
    }

    scrapeAProduct(product, quantity) {

        let type = Object.keys(this.availableProducts).find(t =>          Object.keys(this.availableProducts[t]).includes(product));
        let output;

        if (type !== undefined) {

            if (quantity <= this.availableProducts[type][product]) {
                this.availableProducts[type][product] -= quantity;
            } else {
                this.availableProducts[type][product] = 0;
            }

            output = this.availableProducts[type];

        } else {
            throw `${product} do not exists`;
        }

        return output;
    }
}
module.exports = Warehouse;