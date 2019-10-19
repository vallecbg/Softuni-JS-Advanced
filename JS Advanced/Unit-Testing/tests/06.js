// const PaymentPackage = require('../index.js')
// let expect = require("chai").expect;
// let assert = require("chai").assert;

// describe("PaymentPackage tests", function () {
//     it("Should throw error", function () {
//         expect(() => new PaymentPackage('HR Services')).to.throw();
//     })
//     it("Should create successful packages", function () {
//         const packages = [
//             new PaymentPackage('HR Services', 1500),
//             new PaymentPackage('Consultation', 800),
//             new PaymentPackage('Partnership Fee', 7000),
//         ];

//         let expected = "Package: HR Services\n" +
//             "- Value (excl. VAT): 1500\n" +
//             "- Value (VAT 20%): 1800\n" +
//             "Package: Consultation\n" +
//             "- Value (excl. VAT): 800\n" +
//             "- Value (VAT 20%): 960\n" +
//             "Package: Partnership Fee\n" +
//             "- Value (excl. VAT): 7000\n" +
//             "- Value (VAT 20%): 8400";

//         let actual = packages.join("\n");
//         expect(actual).to.deep.equal(expected);

//     })

//     it("constructor with 2 params", function() {
//         let actual = new PaymentPackage("str", 5);
 
//         assert.equal("str", actual.name);
//         assert.equal(5, actual.value);
//         assert.equal(20, actual.VAT);
//         assert.equal(true, actual.active)
//     });

//     it('Should have instance type', function () {
//         expect(PaymentPackage.prototype).to.have.property('name');
//         expect(PaymentPackage.prototype).to.have.property('value');
//         expect(PaymentPackage.prototype).to.have.property('VAT');
//         expect(PaymentPackage.prototype).to.have.property('active');
//         expect(PaymentPackage.prototype).to.have.property('toString');
//     })

//     it("Test set name validations", function(){
//         expect(() => new PaymentPackage(123, 123)).to.throw();
//         expect(() => new PaymentPackage("", 123)).to.throw();
//     })
//     it("Test set value validations", function(){
//         expect(() => new PaymentPackage("asdasd", "asd")).to.throw();
//         expect(() => new PaymentPackage("asdasd", -5)).to.throw();
//     })
//     it("Test set VAT validations", function(){
//         let package = new PaymentPackage('HR Services', 1500);
//         let willThrowNonNumber = () => package.VAT = "asd";
//         let willThrowNegativeNumber = () => package.VAT = -5;
//         expect(willThrowNonNumber).to.throw();
//         expect(willThrowNegativeNumber).to.throw();
//     })

//     it("Test set Active validations", function(){
//         let package = new PaymentPackage('HR Services', 1500);
//         let willThrowNonBoolean = () => package.active = "asd";
//         expect(willThrowNonBoolean).to.throw();
//     })

//     it("Test creating inactive package", function(){
//         let package = new PaymentPackage("gosho", 1000);
//         package.active = false;

//         let expected = "Package: gosho (inactive)\n"+
//         "- Value (excl. VAT): 1000\n"+
//         "- Value (VAT 20%): 1200";

//         expect(expected).to.equal(package.toString());
//     })

//     it("zero value get/set", function() {
//         let actual = new PaymentPackage("str", 5);
//         actual.value = 0;
 
//         assert.equal(actual.value, 0);
//     });
// })