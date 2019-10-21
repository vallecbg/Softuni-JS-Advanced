const PizzUni = require('../PizzUni.js')
let expect = require("chai").expect;
let assert = require("chai").assert;

describe("Test", function () {
    let pizz;
    this.beforeEach(function () {
        pizz = new PizzUni();
    })

    it("Should create instance", function(){
        expect(pizz.registeredUsers).to.deep.equal([]);
        expect(pizz.availableProducts).to.deep.equal({
            pizzas: ['Italian Style', 'Barbeque Classic', 'Classic Margherita'],
            drinks: ['Coca-Cola', 'Fanta', 'Water']
        });
        expect(pizz.orders).to.deep.equal([]);
    })
})

describe("Constructor tests", function () {
    it("Register duplicate email", function(){
        let pizz = new PizzUni();
        let email = "gosho@abv.bg"
        pizz.registerUser(email);

        expect(() => pizz.registerUser(email)).to.throw(Error, `This email address (${email}) is already being used!`);
    }),
    it("Register email success", function(){
        let pizz = new PizzUni();
        let email = "gosho@abv.bg"
        pizz.registerUser(email);

        expect(pizz.registeredUsers.length).to.equal(1);
        expect(pizz.registeredUsers[0].email).to.equal("gosho@abv.bg");
        expect(pizz.registeredUsers[0].orderHistory).to.deep.equal([]);
        expect(pizz.registeredUsers[0]).to.deep.equal({ email: 'gosho@abv.bg', orderHistory: [] });
    })

    it("Make Order user not registered", function(){
        let pizz = new PizzUni();

        expect(() => pizz.makeAnOrder("asdasd@abv.bg")).to.throw(Error, `You must be registered to make orders!`);
    })
    it("Make Order pizza not found", function(){
        let pizz = new PizzUni();
        let email = "gosho@abv.bg"
        pizz.registerUser(email);

        expect(() => pizz.makeAnOrder(email, "wrongPizza")).to.throw(Error, `You must order at least 1 Pizza to finish the order.`);
    })
    it("Make Order drink not found", function(){
        let pizz = new PizzUni();
        let email = "gosho@abv.bg"
        pizz.registerUser(email);

        let index = pizz.makeAnOrder(email, "Italian Style", "wrongDrink")
        expect(index).to.equal(0);
        expect(pizz.orders).to.deep.equal([ { orderedPizza: 'Italian Style',
        email: 'gosho@abv.bg',
        status: 'pending' } ]);
        expect(pizz.registeredUsers[0].orderHistory).to.deep.equal([ { orderedPizza: 'Italian Style' } ])
        
    })
    it("Make Order with found drink", function(){
        let pizz = new PizzUni();
        let email = "gosho@abv.bg"
        pizz.registerUser(email);

        let index = pizz.makeAnOrder(email, "Italian Style", "Coca-Cola")
        expect(index).to.equal(0);
        expect(pizz.orders[0].orderedDrink).to.equal("Coca-Cola");
        expect(pizz.orders).to.deep.equal([ { orderedPizza: 'Italian Style',
        orderedDrink: 'Coca-Cola',
        email: 'gosho@abv.bg',
        status: 'pending' } ]);
        expect(pizz.registeredUsers[0].orderHistory).to.deep.equal([ { orderedPizza: 'Italian Style', orderedDrink: 'Coca-Cola' } ]);
        
    })

    it("Make many orders, complete them and get details", function(){
        let pizz = new PizzUni();
        let email1 = "gosho1@abv.bg"
        let email2 = "gosho2@abv.bg"
        let email3 = "gosho3@abv.bg"
        pizz.registerUser(email1);
        pizz.registerUser(email2);
        pizz.registerUser(email3);

        let index1 = pizz.makeAnOrder(email1, "Italian Style", "Coca-Cola")
        let index2 = pizz.makeAnOrder(email2, "Barbeque Classic", "Fanta")
        let index3 = pizz.makeAnOrder(email3, "Classic Margherita", "Water")
        let index4 = pizz.makeAnOrder(email3, "Classic Margherita");
        let index5 = pizz.makeAnOrder(email3, "Classic Margherita");


        expect(index1).to.equal(0);
        expect(index2).to.equal(1);
        expect(index3).to.equal(2);
        expect(index4).to.equal(3);
        expect(index5).to.equal(4);



        // console.log(pizz.registeredUsers[0].orderHistory);
        // console.log(pizz.registeredUsers[1].orderHistory);
        // console.log(pizz.registeredUsers[2].orderHistory);

        expect(pizz.registeredUsers[0].orderHistory).to.deep.equal([ { orderedPizza: 'Italian Style', orderedDrink: 'Coca-Cola' } ]);
        expect(pizz.registeredUsers[1].orderHistory).to.deep.equal([ { orderedPizza: 'Barbeque Classic', orderedDrink: 'Fanta' } ]);
        expect(pizz.registeredUsers[2].orderHistory).to.deep.equal([ { orderedPizza: 'Classic Margherita', orderedDrink: 'Water' },
        { orderedPizza: 'Classic Margherita' },
        { orderedPizza: 'Classic Margherita' } ]);

        let order1 = pizz.completeOrder(index1);
        expect(order1).to.be.deep.equal({ orderedPizza: 'Italian Style',
        orderedDrink: 'Coca-Cola',
        email: 'gosho1@abv.bg',
        status: 'completed' });

        pizz.completeOrder(index2);
        pizz.completeOrder(index3);

        let order4 = pizz.completeOrder(index4);
        expect(order4).to.be.deep.equal({ orderedPizza: 'Classic Margherita',
        email: 'gosho3@abv.bg',
        status: 'completed' });


        let details1 = pizz.detailsAboutMyOrder(index1);
        expect(details1).to.be.equal("Status of your order: completed");

        let details5 = pizz.detailsAboutMyOrder(index5);
        expect(details5).to.be.equal("Status of your order: pending");
    })

    it('Details about order wrong id', function(){
        let pizz = new PizzUni();

        expect(pizz.detailsAboutMyOrder(-5)).to.deep.equal(undefined);
    })
})