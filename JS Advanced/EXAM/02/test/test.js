let SkiResort = require('../solution.js');
let expect = require("chai").expect;
let assert = require("chai").assert;

describe("Test", function () {
    let ski;
    this.beforeEach(function () {
        ski = new SkiResort("ski");
    })

    it("Should create instance", function () {
        expect(ski.name).to.equal("ski");
        expect(ski.voters).to.equal(0);
        expect(ski.hotels).to.deep.equal([]);
        expect(ski.bestHotel).to.equal("No votes yet");
    })

    it("Should have instance type", function () {

    })
})

describe("Constructor tests", function () {
    it("Build hotel throw error invalid name", function () {
        let res = new SkiResort("Some");

        expect(() => res.build("", 55)).to.throw(Error, `Invalid input`);
    })

    it("Build hotel throw error invalid beds", function () {
        let res = new SkiResort("Some");

        expect(() => res.build("asd", -5)).to.throw(Error, `Invalid input`);
    })

    it("Build successful hotel", function () {
        let res = new SkiResort("Some");

        let output = res.build("asd", 10);

        expect(output).to.be.equal(`Successfully built new hotel - asd`)
        expect(res.hotels).to.be.deep.equal([{
            name: 'asd',
            beds: 10,
            points: 0
        }]);
        expect(res.hotels).to.have.length(1);
    })
    //TODO: test best hotel with arguments


    it("Book invalid name", function(){
        let res = new SkiResort("Some");

        expect(() => res.book("", 2)).to.throw(Error, "Invalid input");
    })

    it("Book invalid beds", function(){
        let res = new SkiResort("Some");

        expect(() => res.book("asd", -5)).to.throw(Error, "Invalid input");
    })

    it("Book hotel not found", function(){
        let res = new SkiResort("Some");

        expect(() => res.book("asd", 5)).to.throw(Error, "There is no such hotel");
    })

    it("Book hotel no free space", function(){
        let res = new SkiResort("Some");
        res.build("aaa", 1);

        expect(() => res.book("aaa", 5)).to.throw(Error, "There is no free space");
    })

    it("Book successfully a hotel", function(){
        let res = new SkiResort("Some");
        res.build("aaa", 5);

        let output = res.book("aaa", 2);
        expect(output).to.be.equal("Successfully booked");
        expect(res.hotels).to.be.deep.equal([ { name: 'aaa', beds: 3, points: 0 } ]);
        expect(res.hotels[0].beds).to.be.equal(3);
    })


    it("Leave invalid name", function(){
        let res = new SkiResort("Some");

        expect(() => res.leave("", 2)).to.throw(Error, "Invalid input");
    })
    it("Leave invalid beds", function(){
        let res = new SkiResort("Some");

        expect(() => res.leave("asd", -5)).to.throw(Error, "Invalid input");
    })
    it("Leave hotel not found", function(){
        let res = new SkiResort("Some");

        expect(() => res.leave("asd", 5)).to.throw(Error, "There is no such hotel");
    })

    it("Leave successfully the hotel", function(){
        let res = new SkiResort("Some");
        res.build("aaa", 5);

        let output = res.leave("aaa", 3, 5);
        expect(output).to.be.equal("3 people left aaa hotel");

        expect(res.hotels).to.be.deep.equal([ { name: 'aaa', beds: 8, points: 15 } ]);
    })

    it("Average grade success", function(){
        let res = new SkiResort("Some");
        res.build("aaa", 5);
        res.leave("aaa", 3, 5);
        res.leave("aaa", 3, 10);
        res.leave("aaa", 3, 3.50);


        let output = res.averageGrade();
        expect(output).to.be.equal("Average grade: 6.17");
    })

    it("Average grade no voters", function(){
        let res = new SkiResort("Some");
        res.build("aaa", 5);

        let output = res.averageGrade();
        expect(output).to.be.equal("No votes yet");
    })

    it("Get best hotel successfully", function(){
        let res = new SkiResort("Some");
        res.build("hotel1", 5);
        res.build("hotel2", 5);
        res.build("hotel3", 5);
        res.leave("hotel1", 3, 10);
        res.leave("hotel2", 3, 5);
        res.leave("hotel3", 3, 1);

        let output = res.bestHotel;
        expect(output).to.be.equal("Best hotel is hotel1 with grade 30. Available beds: 8");
    })
})