"use strict";

class SaveStructure {
	file1ByteArray;
	file2ByteArray;
	saveStructure;
	
	addFile1(file) {
		this.file1ByteArray = this._binaryFileToByteArray(file);
	}
	
	addFile2(file) {
		this.file2ByteArray = this._binaryFileToByteArray(file);
	}
	
	addString1(string) {
		this.file1ByteArray = this._stringToByteArray(string);
	}
	
	addString2(string) {
		this.file2ByteArray = this._stringToByteArray(string);
	}
	
	addToStructure(data) {
		this.saveStructure.push(data);
	}
	
	getStructure() {
		return JSON.stringify(this.saveStructure);
	}
	
	_stringToByteArray(string) {
		let byteArray = [];
		for (let i = 0; i < string.length; ++i) {
			byteArray.push(string.charCodeAt(i) & 0xff);
		}
		return byteArray;
	}
	
	getDiff() {
		console.log("getDiff");
		console.log(this.file1ByteArray);
		console.log(this.file2ByteArray);
		
		if ( ! this.file1ByteArray.length || ! this.file2ByteArray.length ) {
			return 'Error: One of your files has no data.';
		}
	
		if ( this.file1ByteArray.length != this.file2ByteArray.length ) {
			return 'Error: Your files are different sizes.';
		}
		
		let len = this.file1ByteArray.length;
		let entireFileBuffer = '';
		let lineBuffer1 = '';
		let lineBuffer2 = '';
		let offset = '';
		let startOfFirstOccurrence = true;
		let data = {
			'diff': entireFileBuffer,
			'firstOffset': offset,
			'firstLength': '',
			'firstType': '',
			'firstDefault': '',
			'firstRangeMin': '',
			'firstRangeMax': '',
		};
		for ( let i = 0; i < len; i++ ) {
			// Different
			if ( this.file1ByteArray[i] !== this.file2ByteArray[i] ) {
				// First difference for current section
				if ( ! lineBuffer1 ) {
					let int = i;
					let hex = this._intToHex(int);
					offset = 'Hex: ' + hex + ' Int: ' + int;
					
					if ( startOfFirstOccurrence ) {
						data.firstOffset = hex;
						
						startOfFirstOccurrence = false;
					}
				}
				lineBuffer1 += this._padLeft(this._intToHex(this.file1ByteArray[i]), 2, '0') + ' ';
				lineBuffer2 += this._padLeft(this._intToHex(this.file2ByteArray[i]), 2, '0') + ' ';
			// Last difference for current section +1
			} else if ( lineBuffer1 ) {
				entireFileBuffer += offset + "\r\n  1: " + lineBuffer1 + "\r\n  2: " + lineBuffer2 + "\r\n\r\n";
				offset = '';
				lineBuffer1 = '';
				lineBuffer2 = '';
			}
			// Same = Noop. Continue.
		}
		
		data.diff = entireFileBuffer;
		
		return data;
	}
	
	_intToHex(int) {
		return int.toString(16).toUpperCase();
	}
	
	_padLeft(string, totalLength, charToAdd) {
		if ( string.length > totalLength ) {
			return string.slice(0, totalLength);
		}
		let numberOfChars = totalLength - string.length;
		return charToAdd.repeat(numberOfChars) + string;
	}

	_binaryUrlToByteArray(url) {
		var byteArray = [];
		var req = new XMLHttpRequest();
		req.open('GET', url, false);
		req.overrideMimeType('text\/plain; charset=x-user-defined');
		req.send(null);
		if (req.status != 200) {
			return byteArray;
		}
		for (var i = 0; i < req.responseText.length; ++i) {
			byteArray.push(req.responseText.charCodeAt(i) & 0xff)
		}
		return byteArray;
	}
	
	/** @input File with binary data. Example: FF A0 @output array, each offset is a byte, represented as an int. Example: [255, 160] */
    async _binaryFileToByteArray(file) {
		console.log(file);
		let fileReader = new FileReader();
		fileReader.readAsBinaryString(file);
		console.log(fileReader);
		let finishedReading = new Promise(resolve => {
			fileReader.onload = () => resolve(fileReader.result);
		});
		let binaryData = await finishedReading;
		console.log(binaryData);
		
		let byteArray = [];
		for (let i = 0; i < file.size; ++i) {
			byteArray.push(binaryData.charCodeAt(i) & 0xff);
		}
		return byteArray;
	}
	
	/*
    _binaryFileToByteArray(file) {
		let fileReader = new FileReaderSync();
		fileReader.readAsBinaryString(file);
		let binaryData = fileReader.result;
		
		let byteArray = [];
		for (let i = 0; i < file.size; ++i) {
			byteArray.push(binaryData.charCodeAt(i) & 0xff);
		}
		return byteArray;
	}
	*/
	
	/*
    binaryFileToByteArray(file) {
		let fileReader = new FileReader();
		fileReader.readAsBinaryString(file);
		fileReader.onloadend = function(){
			let binaryData = fileReader.result;
		}
		
		let byteArray = [];
		for (let i = 0; i < file.size; ++i) {
			byteArray.push(binaryData.charCodeAt(i) & 0xff);
		}
		return byteArray;
	}
	*/
	
	/*
    async binaryFileToByteArray(file) {
		let byteArray = [];
		
		let fileReader = new FileReader();
		console.log(JSON.stringify(fileReader));
		// Async sucks. I shouldn't need a complicated function for this. I'd prefer to do it synchronously.
		let finishedReading = new Promise(resolve => {
			console.log(JSON.stringify(fileReader));
			console.log('---');
			fileReader.readAsText(file);
			fileReader.onload(() => resolve(fileReader.result));
		});
		let binaryData = await finishedReading;
		
		for (let i = 0; i < file.size; ++i) {
			byteArray.push(binaryData.charCodeAt(i) & 0xff);
		}
		return byteArray;
	}
	*/
}

function processFiles(binary1, binary2, saveStructure) {
	// check that both files have been selected
	if ( ! binary1.value || ! binary2.value ) {
		return;
	}
	
	// check that both files have data
	if ( ! binary1.files[0].size || ! binary2.files[0].size ) {
		window.alert('Error: One of your files has no data.');
		return;
	}
		
	// make sure both files are the same size
	if ( binary1.files[0].size !== binary2.files[0].size ) {
		window.alert('Error: Your files are different sizes.');
		return;
	}
	
	// process files
	console.log(binary1.files[0]);
	saveStructure.addFile1(binary1.files[0]);
	saveStructure.addFile2(binary2.files[0]);
	return saveStructure.getDiff();
}

window.addEventListener('DOMContentLoaded', (e) => {
	let binary1 = document.getElementById('binary1');
	let binary2 = document.getElementById('binary2');
	let binary1TextArea = document.getElementById('binary1-textarea');
	let binary2TextArea = document.getElementById('binary2-textarea');
	let makeDiff = document.getElementById('make-diff');
	let diff = document.getElementById('diff');
	let add = document.getElementById('add');
	
	let saveStructure = new SaveStructure();
	
	binary1.addEventListener('change', function(e) {
		diff.value = processFiles(binary1, binary2, saveStructure);
	});
	
	binary2.addEventListener('change', function(e) {
		diff.value = processFiles(binary1, binary2, saveStructure);
	});
	
	makeDiff.addEventListener('click', function(e) {
		let string1 = binary1TextArea.value;
		let string2 = binary2TextArea.value;
	
		// check that both files have been selected
		if ( ! string1 || ! string2 ) {
			return;
		}
		
		// check that both files have data
		if ( ! string1.length || ! string2.length ) {
			window.alert('Error: One of your files has no data.');
			return;
		}
			
		// make sure both files are the same size
		if ( string1.length !== string2.length ) {
			window.alert('Error: Your files are different sizes.');
			return;
		}
		
		// process files
		saveStructure.addString1(string1);
		saveStructure.addString2(string2);
		let data = saveStructure.getDiff();
		
		diff.value = data.diff;
		document.getElementById('offset').value = data.firstOffset;
		document.getElementById('length').value = data.firstLength;
		// TODO: type, firstType
		document.getElementById('default-value').value = data.firstDefault;
		document.getElementById('range-min').value = data.firstRangeMin;
		document.getElementById('range-max').value = data.firstRangeMax;
		// document.getElementById('notes').value = data.;
	});
	
	add.addEventListener('click', (e) => {
		let data = {
			
		};
		
		saveStructure.addToStructure(data);
		
		document.getElementById('file-structure').value = saveStructure.getStructure();
	});
});