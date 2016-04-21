/*
 * 
 */
(function(){
    
	function handleFile(e) {
		var files = e.target.files;
		var fileReader = new FileReader();
		fileReader.onload = csvReadEvent;
		var i,f;
		for (i = 0, f = files[i]; i < files.length; ++i) {
			if(f.type !== "text/csv"){
				continue;
			}
			fileReader.readAsText(f);
		}
	}
	document.getElementById('csv_file_input').addEventListener('change', handleFile, false);


	function csvReadEvent(e){
		var fileContents = e.target.result;
		//fix newlines from excel and Windows
		fileContents = fileContents.replace(/\r/g, "\n");
		console.log(parseCSV(fileContents));
	}

	function parseCSV(csvString){
		var parsed = [];
		var rows = csvString.split('\n');
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			console.log(row);
			if(!row.match(/"/)){
				parsed.push(row.split(','));
			}
			else{
				parsed.push(parseRowWithQuotes(row));
			}
		}
		return parsed;
	}

	function parseRowWithQuotes(row){
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
		parsed = parsed.map(function(item){return unescapeQuotes(item);});

		return parsed;
	}

	function unescapeQuotes(content){
		return content.replace(/("")/g, '"');
	}
})();