"use strict";

class SaveStructure {
	file1ByteArray;
	file2ByteArray;
	saveStructure = {
		'fields': [],
		'totalLength': '',
		'defaultByteArray': [],
	};
	totalLength;
	
	getTotalLength() {
		return this.totalLength;
	}
	
	/** @input File with binary data. Example: FF A0 @output array, each offset is a byte, represented as an int. Example: [255, 160] */
	addFile1(file) {
		// this.file1ByteArray = this._binaryFileToByteArray(file);
		let fileReader = new FileReader();
		fileReader.readAsBinaryString(file);
		fileReader.onload = () => {
			let binaryData = fileReader.result;
			let byteArray = [];
			for (let i = 0; i < file.size; ++i) {
				byteArray.push(binaryData.charCodeAt(i) & 0xff);
			}
			this.file1ByteArray = byteArray;
		};
	}
	
	/** @input File with binary data. Example: FF A0 @output array, each offset is a byte, represented as an int. Example: [255, 160] */
	addFile2(file) {
		// this.file2ByteArray = this._binaryFileToByteArray(file);
		let fileReader = new FileReader();
		fileReader.readAsBinaryString(file);
		fileReader.onload = () => {
			let binaryData = fileReader.result;
			let byteArray = [];
			for (let i = 0; i < file.size; ++i) {
				byteArray.push(binaryData.charCodeAt(i) & 0xff);
			}
			this.file2ByteArray = byteArray;
		};
	}
	
	addToStructure(data) {
		this.saveStructure.fields.push(data);
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
		if ( ! this.file1ByteArray.length || ! this.file2ByteArray.length ) {
			return 'Error: One of your files has no data.';
		}
	
		if ( this.file1ByteArray.length != this.file2ByteArray.length ) {
			return 'Error: Your files are different sizes.';
		}
		
		if ( ! this.totalLength ) {
			this.totalLength = this.file1ByteArray.length;
		}
		
		if ( this.saveStructure.defaultByteArray.length === 0 ) {
			this.saveStructure.defaultByteArray = this.file1ByteArray;
			this.saveStructure.totalLength = this.file1ByteArray.length;
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
			'firstLength': 1,
			'firstType': 'int',
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
						data.firstOffset = int;
						
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
}

window.addEventListener('DOMContentLoaded', (e) => {
	let binary1 = document.getElementById('binary1');
	let binary2 = document.getElementById('binary2');
	let makeDiffUsingFiles = document.getElementById('make-diff-using-files');
	let diff = document.getElementById('diff');
	let add = document.getElementById('add');
	let offset = document.getElementById('offset');
	let length = document.getElementById('length');
	let type = document.getElementById('type');
	let rangeMin = document.getElementById('range-min');
	let rangeMax = document.getElementById('range-max');
	let name = document.getElementById('name');
	let notes = document.getElementById('notes');
	let fileStructure = document.getElementById('file-structure');
	
	let saveStructure = new SaveStructure();
	
	binary1.addEventListener('change', function(e) {
		saveStructure.addFile1(binary1.files[0]);
	});
	
	binary2.addEventListener('change', function(e) {
		saveStructure.addFile2(binary2.files[0]);
	});
	
	makeDiffUsingFiles.addEventListener('click', (e) => {
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
		let data = saveStructure.getDiff();
		
		diff.value = data.diff;
		offset.value = data.firstOffset;
		length.value = data.firstLength;
		type.value = data.firstType;
		rangeMin.value = data.firstRangeMin;
		rangeMax.value = data.firstRangeMax;
	});
	
	add.addEventListener('click', (e) => {
		let data = {
			'offset': offset.value,
			'length': length.value,
			'type': type.value,
			'rangeMin': rangeMin.value,
			'rangeMax': rangeMax.value,
			'name': name.value,
			'notes': notes.value,
		};
		
		saveStructure.addToStructure(data);
		
		fileStructure.value = saveStructure.getStructure();
	});
});