var CSV = require(__dirname + '/../csv-parser-node.js');

var parse = CSV.parse;


describe("CSV String Test Suite", function() {
	it("Single line string without quotes", function() {
		expect(parse('hello, there')).toEqual([['hello', ' there']]);
	});

	it("Single line string with quotes", function() {
		expect(parse('"hello", there')).toEqual([['hello', ' there']]);
  	});

  	it("Multi line string without quotes", function() {
		expect(parse('hello, there\nSomething,else,baby\nother')).toEqual([['hello', ' there'],['Something', 'else','baby'],['other']]);
	});

	it("Multi line string with quotes", function() {
		expect(parse('"hello", there\nSomething," else",baby\nother')).toEqual([['hello', ' there'],['Something',' else', 'baby'],['other']]);
  	});

  	it("Multi line string with quotes and commas", function() {
		expect(parse('"hello, she said to ""her""", now,fight\n"Baby, it is cool, she said, anyway",another thing\nI don\'t care, anyway')).toEqual([['hello, she said to "her"', ' now', 'fight'],['Baby, it is cool, she said, anyway', 'another thing'], ['I don\'t care', ' anyway']]);
  	});

  	it("String with single quote", function() {
		expect(parse('"To be isn""t it!, or am I crazy?"')).toEqual([['To be isn"t it!, or am I crazy?']]);
  	});

});
