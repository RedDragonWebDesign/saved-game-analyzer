"use strict";

class SaveStructure {
	file1ByteArray = [0,  0, 10, 20, 0, 0, 50, 120, 0, 0, 1];
	file2ByteArray = [0, 10, 12, 14, 0, 0, 50, 121, 0, 0, 1];

	addFile1(file) {
		this.file1ByteArray = this.binaryFileToByteArray(file);
	}
	
	addFile2(file) {
		this.file2ByteArray = this.binaryFileToByteArray(file);
	}
	
	getDiff() {
		if ( ! this.file1ByteArray.length || ! this.file2ByteArray.length ) {
			return 'Error: One of your files has no data.';
		}
	
		if ( this.file1ByteArray.length != this.file2ByteArray.length ) {
			return 'Error: Your files are different sizes.';
		}
		
		let len = this.file1ByteArray.length;
		let entireFileBuffer = '', lineBuffer1 = '', lineBuffer2 = '', offset = '';
		for ( let i = 0; i < len; i++ ) {
			// Different
			if ( this.file1ByteArray[i] !== this.file2ByteArray[i] ) {
				// First difference for current section
				if ( ! lineBuffer1 ) {
					let int = this.padLeft(i, 8, ' ');
					let hex = this.padLeft(this.intToHex(int), 8, '0');
					offset = 'Int: ' + int + ' Hex: ' + hex;
				}
				lineBuffer1 += this.padLeft(this.intToHex(this.file1ByteArray[i]), 2, '0') + ' ';
				lineBuffer2 += this.padLeft(this.intToHex(this.file2ByteArray[i]), 2, '0') + ' ';
			// Last difference for current section +1
			} else if ( lineBuffer1 ) {
				entireFileBuffer += offset + "\r\n  1: " + lineBuffer1 + "\r\n  2: " + lineBuffer2 + "\r\n\r\n";
				offset = '';
				lineBuffer1 = '';
				lineBuffer2 = '';
			}
			// Same = Noop. Continue.
		}
		
		return entireFileBuffer;
	}
	
	intToHex(int) {
		return int.toString(16).toUpperCase();
	}
	
	padLeft(string, totalLength, charToAdd) {
		if ( string.length > totalLength ) {
			return string.slice(0, totalLength);
		}
		let numberOfChars = totalLength - string.length;
		return charToAdd.repeat(numberOfChars) + string;
	}

	binaryUrlToByteArray(url) {
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
	binaryFileToByteArray(file) {
		var byteArray = [];
		var reader = new FileReader();
		reader.readAsBinaryString(file);
		reader.onload = function(e) {
			var binaryData = reader.result;	
			for (var i = 0; i < file.size; ++i) {
				byteArray.push(binaryData.charCodeAt(i) & 0xff);
			}
			console.log(byteArray);
			return byteArray;
		}
		console.log(reader.onload);
		console.log(byteArray);
		return byteArray;
	}
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
	// saveStructure.addFile1(binary1.files[0]);
	// saveStructure.addFile2(binary2.files[0]);
	return saveStructure.getDiff();
}

window.addEventListener('DOMContentLoaded', (e) => {
	let binary1 = document.getElementById('binary1');
	let binary2 = document.getElementById('binary2');
	let diff = document.getElementById('diff');
	
	let saveStructure = new SaveStructure();
	
	binary1.addEventListener('change', function(e) {
		diff.value = processFiles(binary1, binary2, saveStructure);
	});
	
	binary2.addEventListener('change', function(e) {
		diff.value = processFiles(binary1, binary2, saveStructure);
	});
	
	diff.value = saveStructure.getDiff();
});