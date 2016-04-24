var fs = require('fs');
var CSV = require(__dirname + '/../csv-parser-node.js');

var parse = CSV.parse;

var testFile1 = fs.readFileSync(__dirname + '/mock/test.csv', 'utf8');


describe("CSV File Test Suite", function() {
  	it("Test CSV file", function() {
  		expect(parse(testFile1)).toEqual([ [ 'Hello, there', 'Cell 2' ], [ '"Hello, there with quotes"', 'Some more information' ], [ '[bracketsn and such]', 'Commas, anyone? \'I didn\'t think so, baby,"She said"\',' ] ]);
  	});
});



