/*
 * Example file input listener for csv parser
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

	function csvReadEvent(e){
		var fileContents = e.target.result;
		console.log(CSV.parse(fileContents));
	}
	document.getElementById('csv_file_input').addEventListener('change', handleFile, false);

})();