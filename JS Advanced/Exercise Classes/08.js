class Kitchen {
    constructor(budget) {
        this.budget = budget;
        this.menu = [];
        this.productsInStock = [];
        this.actionsHistory = [];
    }
    
    loadProducts([...products]) {
        let log = [];
        for (let product of products) {
            let [productName, productQuantity, productPrice] = product.split(' ');

            productQuantity = Number(productQuantity);
            productPrice = Number(productPrice);

            if (this.budget - productPrice >= 0) {
                if (this.productsInStock[productName]) {
                    this.productsInStock[productName] += productQuantity;
                } else {
                    this.productsInStock[productName] = productQuantity;
                }

                this.budget -= productPrice;
                log.push(`Successfully loaded ${productQuantity} ${productName}`)
            } else {
                log.push(`There was not enough money to load ${productQuantity} ${productName}`)
            }
        }

        this.actionsHistory = [...this.actionsHistory, ...log]
        return this.actionsHistory.join('\n');
    }

    addToMenu(meal, neededProducts, price) {
        if (!this.menu[meal]) {
            this.menu[meal] = ({
                products: neededProducts,
                price: price
            })
            return (`Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals in the menu, other ideas?`);
        } else {
            return (`The ${meal} is already in our menu, try something different.`)
        }
    }

    showTheMenu() {
        let output = [];
        for (const product of Object.keys(this.menu)) {
            output.push(`${product} - $ ${this.menu[product].price}`)
        }
        if (output.length === 0) {
            return 'Our menu is not ready yet, please come later...';
        } else {
            return output.join('\n') + '\n';
        }
    }

    makeTheOrder(meal) {
        if (!this.menu[meal]) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`;
        }

        let neededProducts = this.menu[meal].products;
        for (const product of neededProducts) {
            let [productName, productQuantity] = product.split(' ');
            productQuantity = Number(productQuantity);

            if (this.productsInStock[productName] < productQuantity ||
                !this.productsInStock[productName]) {
                return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
            }
        }

        for (const product of neededProducts) {
            let [productName, productQuantity] = product.split(' ');
            productQuantity = Number(productQuantity);

            this.productsInStock[productName] -= productQuantity;
        }
        this.budget += this.menu[meal].price;
        return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`;
    }
}

let kitchen = new Kitchen(1000);
console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));
console.log(kitchen.addToMenu('Pizza', ['Strawberries 1'], 15.55));
console.log(kitchen.showTheMenu());
console.log(kitchen.makeTheOrder("Pizza"));