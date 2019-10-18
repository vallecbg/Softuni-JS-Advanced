// const lookupChar = require('../index.js')
// let expect = require("chai").expect;
// let assert = require("chai").assert;

// describe("Lookup Char tests", function(){
//     it("should return undefined non string first parameter", function(){
//         expect(lookupChar(13, 0)).to.equal(undefined);
//     }),
//     it("should return undefined non string second parameter", function(){
//         expect(lookupChar("asdasddd", "asdasd")).to.equal(undefined);
//     }),
//     it("should return undefined with floating point number second parameter", function(){
//         expect(lookupChar("asdasd", 3.23)).to.equal(undefined);
//     })

//     it("should return incorrect index with incorrect index value", function(){
//         expect(lookupChar("asdasd", 13)).to.equal("Incorrect index");
//     })
//     it("should return incorrect index with negative index value", function(){
//         expect(lookupChar("asdasd", -1)).to.equal("Incorrect index");
//     })
//     it("should return incorrect index with index value equal to string length", function(){
//         expect(lookupChar("asdasd", 6)).to.equal("Incorrect index");
//     })

//     it("should return success", function(){
//         expect(lookupChar("asdasd", 0)).to.equal("a");
//     })
//     it("should return success", function(){
//         expect(lookupChar("asdasd", 5)).to.equal("d");
//     })
// })
