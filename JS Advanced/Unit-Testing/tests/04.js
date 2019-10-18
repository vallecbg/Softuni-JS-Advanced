// const mathEnforcer = require('../index.js')
// let expect = require("chai").expect;
// let assert = require("chai").assert;

// describe('mathEnforcer', function(){
//     describe('addFive', function(){
//         it('should return undefined with not a number', function(){
//             expect(mathEnforcer.addFive("aaa")).to.equal(undefined);
//         })
//         it('should return correct result', function(){
//             expect(mathEnforcer.addFive(5)).to.equal(10);
//         })
//         it('should return correct result with negative value', function(){
//             expect(mathEnforcer.addFive(-5)).to.equal(0);
//         })
//         it('should return correct result with floating point value', function(){
//             expect(mathEnforcer.addFive(5.50)).to.be.closeTo(10.50, 0.01);
//         })
//     })
//     describe('subtractTen', function(){
//         it('should return undefined with not a number', function(){
//             expect(mathEnforcer.subtractTen("aaa")).to.equal(undefined);
//         })
//         it('should return correct result', function(){
//             expect(mathEnforcer.subtractTen(15)).to.equal(5);
//         })
//         it('should return correct result with negative value', function(){
//             expect(mathEnforcer.subtractTen(-5)).to.equal(-15);
//         })
//         it('should return correct result with floating point value', function(){
//             expect(mathEnforcer.subtractTen(15.50)).to.be.closeTo(5.50, 0.01);
//         })
//     })
//     describe('sum', function(){
//         it('should return undefined with not a number first parameter', function(){
//             expect(mathEnforcer.sum("aaa", 1)).to.equal(undefined);
//         })
//         it('should return undefined with not a number second parameter', function(){
//             expect(mathEnforcer.sum(1, "eadas")).to.equal(undefined);
//         })
//         it('should return correct result', function(){
//             expect(mathEnforcer.sum(1, 1)).to.equal(2);
//         })
//         it('should return correct result', function(){
//             expect(mathEnforcer.sum(-5, 1)).to.equal(-4);
//         })

//         it('should return correct result with floating point value parameters', function(){
//             expect(mathEnforcer.sum(1.50, 1.60)).to.be.closeTo(3.10, 0.01);
//         })
//     })
// })