const Warehouse = require('../index.js')
let expect = require("chai").expect;
let assert = require("chai").assert;

describe("Test", function () {
    let warehouse;
    beforeEach(function () {
        warehouse = new Warehouse(5);
    });

    it('should give correct message for empty warehouse', function () {
        expect(warehouse.revision()).to.be.equal('The warehouse is empty')
    })
});

describe("Warehouse tests", function () {
    describe("Constructor tests", function(){
        it("Should throw error if typeof givenSpace !== 'number' or givenSpace <= 0", function(){
            expect(() => {
                new Warehouse(-1)
            }).to.throw();
            expect(() => {
                new Warehouse(0)
            }).to.throw();
            expect(() => {
                new Warehouse("asd")
            }).to.throw();
        })
        it("AddProduct should throw error if no space is available", function(){
            let warehouse = new Warehouse(1);
            expect(() => warehouse.addProduct('Food', "asd", 5)).to.throw();
        })
        it("Should sort products in descending order by quantity", function(){
            let warehouse = new Warehouse(12);
            warehouse.addProduct('Food', 'bread', 1);
            warehouse.addProduct('Food', 'potatoes', 2);
            warehouse.addProduct('Food', 'mushrooms', 3);
            warehouse.orderProducts('Food');
            let foods = JSON.stringify(warehouse.availableProducts.Food);
            assert.equal(foods, '{"mushrooms":3,"potatoes":2,"bread":1}')
        })
        it("Revision should return string if there are 0 products", function(){
            let warehouse = new Warehouse(5);
            expect(warehouse.revision()).to.be.equal('The warehouse is empty');
        })
        it("Throw error if product is not found", function(){
            let warehouse = new Warehouse(5);
            warehouse.addProduct("Food", "banana", 5);
            expect(() => warehouse.scrapeAProduct("wrong", 1)).to.throw('wrong do not exists');
        })
    })
})