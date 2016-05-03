var CSV = require(__dirname + '/../dist/csv-parser-node.js');

var parse = CSV.parse;


describe("Invalid Input Test Suite", function() {
	it("No input given to parser", function() {
		expect(parse('')).toEqual([]);
	});
	it("Null given to parser", function() {
		expect(parse(null)).toEqual([]);
	});
	it("Undefined given to parser", function() {
		expect(parse(undefined)).toEqual([]);
	});
	it("Number given to parser", function() {
		expect(parse(1)).toEqual([]);
	});
	it("Object given to parser", function() {
		expect(parse({})).toEqual([]);
	});
	it("Empty string given to parser", function() {
		expect(parse('')).toEqual([]);
	});

});
