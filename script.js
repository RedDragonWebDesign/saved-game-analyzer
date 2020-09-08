"use strict";

function load_binary_resource(url) {
	var byteArray = [];
	var req = new XMLHttpRequest();
	req.open('GET', url, false);
	req.overrideMimeType('text\/plain; charset=x-user-defined');
	req.send(null);
	if (req.status != 200) return byteArray;
	for (var i = 0; i < req.responseText.length; ++i) {
		byteArray.push(req.responseText.charCodeAt(i) & 0xff)
	}
	return byteArray;
}

window.addEventListener('DOMContentLoaded', (e) => {
	let binary1 = document.getElementById('binary1');
	let binary2 = document.getElementById('binary2');
	
	// let byteArray = load_binary_resource('./binaries/gold.exe');
	// let byteArray = load_binary_resource('./binaries/reddit-weird-header.bin');
	// let byteArray = load_binary_resource('./binaries/00thruFF.bin');
	// byteArray = byteArray.slice(0, 100000);
	// vm.setBinary(byteArray);
	
	// When user selects a file
	binary2.addEventListener('change', function(e) {
		// process file upload
		// vm.setBinary(binary.value);
		// headers.value = vm.printHeaders();
		// hexViewer.value = vm.printHexViewer();
	});
	
	// binary.dispatchEvent(new Event('change'));
});