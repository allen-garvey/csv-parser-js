/*
 * Core CSV Parser
 */

function parse(csv){
	if(!csv || typeof csv !== 'string'){
		return [];
	}
	return parseString(csv);
}
function parseString(csvString){
	//fix newlines from excel, Windows and oddly, apple numbers
	csvString = csvString.replace(/\r\n/g, "\n");
	var rows = csvString.split(/[\r\n]/);
	
	return rows.map(parseRow);
}

function parseRow(row){
	var parsed = [];

	var isCurrentlyInQuotedCell = false;
	var quoteSequenceLength = 0;
	var cellContent = '';
	for (var i = 0; i < row.length; i++) {
		var char = row[i];
		if(!isCurrentlyInQuotedCell && char === '"'){
			//don't add opening quote to string
			isCurrentlyInQuotedCell = true;
			quoteSequenceLength = 1;
			cellContent = '';
		}
		else if(isCurrentlyInQuotedCell){
			//reached end of quoted cell
			if(char === ',' && quoteSequenceLength > 1 && quoteSequenceLength % 2 === 0){
				//remove closing quote from strings
				cellContent = cellContent.replace(/"$/, '');
				parsed.push(cellContent);
				isCurrentlyInQuotedCell = false;
				cellContent = '';
			}
			else{
				if(char === '"'){
					quoteSequenceLength++;
				}
				cellContent += char;
			}
		}
		//end of non quoted cell
		else if(!isCurrentlyInQuotedCell && char === ','){
			parsed.push(cellContent);
			cellContent = '';
		}
		//in the middle of non-quoted cell
		else{
			cellContent += char;
		}
	}
	//still have to add last line
	parsed.push(cellContent.replace(/"$/, ''));
	return parsed.map(function(item){return unescapeQuotes(item);});
}

function unescapeQuotes(content){
	return content.replace(/("")/g, '"');
}


//export wrapper for parser
var parser = {};
parser.parse = parse;
