var chai = require("chai"),
    expect = chai.expect,
    fs = require("fs");

describe("leaseParser()", function () {
    var parser,
        testBlock;

    before(function () {
        parser = require("../src/").leaseParser;
    });

    it("should return an array", function () {
        testBlock = "";
        expect(parser(testBlock)).to.be.an("array");
    });

    it("should not parse commented entries", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/leases/1_commented_entry.txt").toString();

        expect(parser(testBlock)).to.have.length(0);
    });

    it("should return 1 element when passed 1 entry", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/leases/1_valid_entry.txt").toString();

        expect(parser(testBlock)).to.have.length(1);
    });

    it("should return 1 element per parsed entry", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/leases/3_valid_entries.txt").toString();

        expect(parser(testBlock)).to.have.length(3);
    });

    it("should return objects in the array", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/leases/1_valid_entry.txt").toString();

        expect(parser(testBlock)[0]).to.be.an("object");
    });

    it("should return an object with 'ip-address' property in the array", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/leases/1_valid_entry.txt").toString();

        var parsedArray = parser(testBlock),
            parsedElement = parsedArray[0];

        expect(parsedElement).to.have.property("ip-address");
    });

    it("should have a 'ip-address' property correctly parsed", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/leases/1_valid_entry.txt").toString();

        var parsedArray = parser(testBlock),
            parsedElement = parsedArray[0];

        expect(parsedElement["ip-address"]).to.equal("192.168.0.1");
    });

    it("should return an object with 'mac-address' property in the array", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/leases/1_valid_entry.txt").toString();

        var parsedArray = parser(testBlock),
            parsedElement = parsedArray[0];

        expect(parsedElement).to.have.property("mac-address");
    });

    it("should have a 'mac-address' property correctly parsed", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/leases/1_valid_entry.txt").toString();

        var parsedArray = parser(testBlock),
            parsedElement = parsedArray[0];

        expect(parsedElement["mac-address"]).to.equal("aa:bb:cc:dd:ee:ff");
    });
});