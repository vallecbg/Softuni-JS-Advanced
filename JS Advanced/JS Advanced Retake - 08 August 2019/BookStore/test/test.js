const BookStore = require('../BookStore.js')
let expect = require("chai").expect;
let assert = require("chai").assert;

describe("Test", function () {
    let book;
    this.beforeEach(function () {
        book = new BookStore("asd");
    })

    it("Should create instance", function () {
        expect(book.name).to.equal("asd");
        expect(book.books).to.deep.equal([]);
        expect(book.workers).to.deep.equal([]);
    })
})

describe("Constructor tests", function () {
    it("Create instance with no name", function(){
        let store = new BookStore();
        expect(store.name).to.be.deep.equal(undefined)
        expect(store.books).to.deep.equal([]);
        expect(store.workers).to.deep.equal([]);
    })
    it("StockBooks tests", function () {
        let store = new BookStore("Store");

        store.stockBooks([]);
        expect(store.books).to.deep.equal([]);
        expect(store.books).to.have.length(0);

        store.stockBooks(['Inferno-Dan Braun', 'Harry Potter-J.Rowling', 'Uncle Toms Cabin-Hariet Stow', 'The Jungle-Upton Sinclear']);

        expect(store.books).to.deep.equal([{
                title: 'Inferno',
                author: 'Dan Braun'
            },
            {
                title: 'Harry Potter',
                author: 'J.Rowling'
            },
            {
                title: 'Uncle Toms Cabin',
                author: 'Hariet Stow'
            },
            {
                title: 'The Jungle',
                author: 'Upton Sinclear'
            }
        ])
        expect(store.books).to.have.length(4);

        store.stockBooks(['Harry Potter-J.Rowling']);

        expect(store.books).to.deep.equal([{
                title: 'Inferno',
                author: 'Dan Braun'
            },
            {
                title: 'Harry Potter',
                author: 'J.Rowling'
            },
            {
                title: 'Uncle Toms Cabin',
                author: 'Hariet Stow'
            },
            {
                title: 'The Jungle',
                author: 'Upton Sinclear'
            },
            {
                title: 'Harry Potter',
                author: 'J.Rowling'
            }
        ])
        expect(store.books).to.have.length(5);
    })

    it('Hire and create new worker', function () {
        let store = new BookStore("Store");

        let message = store.hire("Ivan", "Obshtak");

        expect(message).to.equal(`Ivan started work at Store as Obshtak`)
        expect(store.workers).to.deep.equal([{
            name: 'Ivan',
            position: 'Obshtak',
            booksSold: 0
        }]);
        expect(store.workers).to.have.length(1);
    })

    it("Hire many workers", function () {
        let store = new BookStore("Store");

        let message1 = (store.hire('George', 'seller'));
        let message2 = (store.hire('Ina', 'seller'));
        let message3 = (store.hire('Tom', 'juniorSeller'));

        expect(message1).to.equal("George started work at Store as seller");
        expect(message2).to.equal("Ina started work at Store as seller");
        expect(message3).to.equal("Tom started work at Store as juniorSeller");

        expect(store.workers).to.deep.equal([{
                name: 'George',
                position: 'seller',
                booksSold: 0
            },
            {
                name: 'Ina',
                position: 'seller',
                booksSold: 0
            },
            {
                name: 'Tom',
                position: 'juniorSeller',
                booksSold: 0
            }
        ]);

    })

    it('Hire throw error duplicate worker', function () {
        let store = new BookStore("Store");

        store.hire("Ivan", "Obshtak");

        expect(store.workers).to.have.length(1);
        expect(() => store.hire("Ivan", "Obshtak")).to.throw(Error, "This person is our employee");
    })

    it("Test undefined", function () {
        let store = new BookStore("Store");

        let message = store.hire();

        expect(message).to.equal("undefined started work at Store as undefined");

        let message1 = store.hire("Ivan");

        expect(message1).to.equal("Ivan started work at Store as undefined");
    })

    it("fire and hire again", function () {
        let store = new BookStore("Store");

        store.hire("Ivan", "maza4");

        let fireMessage = store.fire("Ivan");
        expect(fireMessage).to.equal("Ivan is fired");
        expect(store.workers).to.have.length(0);
        expect(store.workers).to.deep.equal([]);

        let message = store.hire("Ivan", "maza4");
        expect(message).to.equal("Ivan started work at Store as maza4");
        expect(store.workers).to.have.length(1);
        expect(store.workers).to.deep.equal([{
            name: 'Ivan',
            position: 'maza4',
            booksSold: 0
        }]);
    })

    it("Fire worker not found", function () {
        let store = new BookStore("Store");

        expect(() => store.fire("Ivan")).to.throw(Error, "Ivan doesn't work here")
    })

    it("Sell book not found", function () {
        let store = new BookStore("Store");

        expect(() => store.sellBook("aa", "aa")).to.throw(Error, 'This book is out of stock');
    })

    it("Sell book worker not found", function () {
        let store = new BookStore("Store");
        store.stockBooks(['Harry Potter-J.Rowling']);

        expect(() => store.sellBook("Harry Potter", "asd")).to.throw(Error, `asd is not working here`)

    })

    it("Sell book and print workers successful", function () {
        let store = new BookStore("Store");
        store.stockBooks(['Harry Potter-J.Rowling']);
        store.hire("Ivan", "mazach");

        store.sellBook("Harry Potter", "Ivan");

        expect(store.books).to.deep.equal([]);
        expect(store.books).to.have.length(0);

        expect(store.workers).to.deep.equal([{
            name: 'Ivan',
            position: 'mazach',
            booksSold: 1
        }]);
        expect(store.workers).to.have.length(1);

        expect(store.printWorkers()).to.equal("Name:Ivan Position:mazach BooksSold:1");
    })
})