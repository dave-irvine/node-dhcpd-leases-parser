var chai = require("chai"),
    expect = chai.expect,
    fs = require("fs");

describe("hostParser()", function () {
    var parser,
        testBlock;

    before(function() {
        parser = require("../src/").hostParser;
    });

    it("should return an array", function () {
        testBlock = "";
        expect(parser(testBlock)).to.be.an("array");
    });

    it("should not parse commented entries", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/hosts/1_commented_entry.txt").toString();

        expect(parser(testBlock)).to.have.length(0);
    });

    it("should return 1 element when passed 1 entry", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/hosts/1_valid_entry.txt").toString();

        expect(parser(testBlock)).to.have.length(1);
    });

    it("should return 1 element per parsed entry", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/hosts/3_valid_entries.txt").toString();

        expect(parser(testBlock)).to.have.length(3);
    });

    it("should return objects in the array", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/hosts/1_valid_entry.txt").toString();

        expect(parser(testBlock)[0]).to.be.an("object");
    });

    it("should return an object with 'name' property in the array", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/hosts/1_valid_entry.txt").toString();

        var parsedArray = parser(testBlock),
            parsedElement = parsedArray[0];

        expect(parsedElement).to.have.property("name");
    });

    it("should have a 'name' property correctly parsed", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/hosts/1_valid_entry.txt").toString();

        var parsedArray = parser(testBlock),
            parsedElement = parsedArray[0];

        expect(parsedElement.name).to.equal("test");
    });

    it("should return an object with 'ip-address' property in the array", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/hosts/1_valid_entry.txt").toString();

        var parsedArray = parser(testBlock),
            parsedElement = parsedArray[0];

        expect(parsedElement).to.have.property("ip-address");
    });

    it("should have a 'ip-address' property correctly parsed", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/hosts/1_valid_entry.txt").toString();

        var parsedArray = parser(testBlock),
            parsedElement = parsedArray[0];

        expect(parsedElement["ip-address"]).to.equal("192.168.0.1");
    });

    it("should return an object with 'mac-address' property in the array", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/hosts/1_valid_entry.txt").toString();

        var parsedArray = parser(testBlock),
            parsedElement = parsedArray[0];

        expect(parsedElement).to.have.property("mac-address");
    });

    it("should have a 'mac-address' property correctly parsed", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/hosts/1_valid_entry.txt").toString();

        var parsedArray = parser(testBlock),
            parsedElement = parsedArray[0];

        expect(parsedElement["mac-address"]).to.equal("aa:bb:cc:dd:ee:ff");
    });

    it("should return an object with 'options' property in the array", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/hosts/1_valid_entry.txt").toString();

        var parsedArray = parser(testBlock),
            parsedElement = parsedArray[0];

        expect(parsedElement).to.have.property("options");
    });

    it("should have an 'options' property that is an object", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/hosts/1_valid_entry.txt").toString();

        var parsedArray = parser(testBlock),
            parsedElement = parsedArray[0];

        expect(parsedElement.options).to.be.an("object");
    });

    it("should have an 'options' property that is an object even if there are no options", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/hosts/1_valid_entry_no_options.txt").toString();

        var parsedArray = parser(testBlock),
            parsedElement = parsedArray[0];

        expect(parsedElement.options).to.be.an("object");
    });

    it("should have an 'options' property that populated with option keys", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/hosts/1_valid_entry.txt").toString();

        var parsedArray = parser(testBlock),
            parsedElement = parsedArray[0],
            parsedOptions = parsedElement.options;

        expect(parsedOptions).to.have.property("host-name");
    });

    it("should have an 'options' property that populated with option values", function () {
        testBlock = fs.readFileSync(__dirname + "/fixtures/hosts/1_valid_entry.txt").toString();

        var parsedArray = parser(testBlock),
            parsedElement = parsedArray[0],
            parsedOptions = parsedElement.options;

        expect(parsedOptions["host-name"]).to.equal("test");
    });
});