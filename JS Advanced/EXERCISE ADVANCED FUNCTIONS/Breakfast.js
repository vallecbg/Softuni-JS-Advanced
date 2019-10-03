function solution() {

    let robotIngridients = {

        'protein': 0,
        'carbohydrate': 0,
        'fat': 0,
        'flavour': 0

    };

    function restock([element, quantity]) {

        robotIngridients[element] += Number(quantity);
        return "Success";

    }

    function prepare([recipe, quantity]) {

        quantity = Number(quantity);
        switch (recipe) {
            case 'apple':
                if (robotIngridients['carbohydrate'] < 1 * quantity) {
                    return "Error: not enough carbohydrate in stock"
                }
                else if (robotIngridients['flavour'] < 2 * quantity) {
                    return "Error: not enough flavour in stock"
                }
                else {
                    robotIngridients['carbohydrate'] -= 1 * quantity;
                    robotIngridients['flavour'] -= 2 * quantity;
                    return "Success"
                }

            case 'lemonade':
                if (robotIngridients['carbohydrate'] < 10 * quantity) {
                    return "Error: not enough carbohydrate in stock"
                }
                else if (robotIngridients['flavour'] < 20 * quantity) {
                    return "Error: not enough flavour in stock"
                }
                else {
                    robotIngridients['carbohydrate'] -= 10 * quantity;
                    robotIngridients['flavour'] -= 20 * quantity;
                    return "Success"
                }

            case 'burger':
                if (robotIngridients['carbohydrate'] < 5 * quantity) {
                    return "Error: not enough carbohydrate in stock"
                }
                else if (robotIngridients['fat'] < 7 * quantity) {
                    return "Error: not enough fat in stock"
                }
                else if (robotIngridients['flavour'] < 3 * quantity) {
                    return "Error: not enough flavour in stock"
                }
                else {
                    robotIngridients['carbohydrate'] -= 5 * quantity;
                    robotIngridients['fat'] -= 7 * quantity;
                    robotIngridients['flavour'] -= 3 * quantity;
                    return "Success"
                }

            case 'eggs':
                if (robotIngridients['protein'] < 5 * quantity) {
                    return "Error: not enough protein in stock"
                }
                else if (robotIngridients['fat'] < 1 * quantity) {
                    return "Error: not enough fat in stock"
                }
                else if (robotIngridients['flavour'] < 1 * quantity) {
                    return "Error: not enough flavour in stock"
                }
                else {
                    robotIngridients['protein'] -= 5 * quantity;
                    robotIngridients['fat'] -= 1 * quantity;
                    robotIngridients['flavour'] -= 1 * quantity;
                    return "Success"
                }

            case 'turkey':

                if (robotIngridients['protein'] < 10 * quantity) {
                    return "Error: not enough protein in stock"
                }
                else if (robotIngridients['carbohydrate'] < 10 * quantity) {
                    return "Error: not enough carbohydrate in stock"
                }
                else if (robotIngridients['fat'] < 10 * quantity) {
                    return "Error: not enough fat in stock"
                }
                else if (robotIngridients['flavour'] < 10 * quantity) {
                    return "Error: not enough flavour in stock"
                }
                else {
                    robotIngridients['protein'] -= 10 * quantity;
                    robotIngridients['carbohydrate'] -= 10 * quantity;
                    robotIngridients['fat'] -= 10 * quantity;
                    robotIngridients['flavour'] -= 10 * quantity;
                    return "Success"
                }
        }
    }

    function report() {
        return `protein=${robotIngridients['protein']} carbohydrate=${robotIngridients['carbohydrate']} fat=${robotIngridients['fat']} flavour=${robotIngridients['flavour']}`

    }

    return function (action) {

        let tokens = action.split(" ");
        let command = tokens.shift();
        switch (command) {

            case 'restock':
                return restock(tokens);

            case 'prepare':
                return prepare(tokens);

            case 'report':
                return report();
        }

    }

}