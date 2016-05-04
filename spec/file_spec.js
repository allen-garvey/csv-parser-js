var fs = require('fs');
var CSV = require(__dirname + '/../dist/csv-parser-node.js');
var mock_dir = __dirname + '/mock/';
var parse = CSV.parse;


describe("CSV File Test Suite", function() {
  	it("Test Excel CSV file", function() {
  		var testFile1 = fs.readFileSync(mock_dir + 'excel_test.csv', 'utf8');
  		expect(parse(testFile1)).toEqual([ [ 'Hello, there', 'Cell 2' ], [ '"Hello, there with quotes"', 'Some more information' ], [ '[bracketsn and such]', 'Commas, anyone? \'I didn\'t think so, baby,"She said"\',' ] ]);
  	});

  	it("Test Excel CSV file", function() {
  		var testFile1 = fs.readFileSync(mock_dir + 'numbers_test.csv', 'utf8');
  		expect(parse(testFile1)).toEqual([ [ 'Header', 'Header2', '' ], [ 'Some text', 'One, two, “three”', 'hello, there' ], [ 'Second column', ',there “there”', '' ], ['', 'empty before', ''] ]);
  	});
});




