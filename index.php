<!DOCTYPE html>
<html lang="en-us">
	<head>
		<meta charset="utf-8" />
		<title>Saved Game Analyzer</title>
		<link rel="stylesheet" href="style.css" />
		<script type="module" src="script.js"></script>
	</head>
	<body>
		<h1>
			Saved Game Analyzer
		</h1>
		<h2>
			Tool 1 - Diff & Structure Tool
		</h2>
		<p>
			Web tool to reverse engineer saved game files. For games that use SIMPLE, BINARY saved game formats. This tool will do diffs, labeling, etc.
		</p>
		<p class="file-picker">
			<strong>Saved Game File 1:</strong> (Hint: use drag and drop)<br />
			<input id="binary1" type="file" name="binary1" />
		</p>
		<p class="file-picker">
			<strong>Saved Game File 2:</strong><br />
			<input id="binary2" type="file" name="binary2" />
		</p>
		<p class="file-picker">
			<button id="make-diff-using-files">Make Diff</button>
		</p>
		<p>
			<strong>Diff:</strong><br />
			<textarea id="diff"></textarea>
		</p>
		<p>
			<strong>Label this region?</strong><br />
			Offset (Bytes): <input type="text" id="offset" /><br />
			Length (Bytes): <input type="text" id="length" /><br />
			Type: <input type="text" id="type" /><br />
			Default Value: <input type="text" id="default-value" disabled /><br />
			Range Min: <input type="text" id="range-max" /><br />
			Range Max: <input type="text" id="range-min" /><br />
			Name: <input type="text" id="name" /><br />
			Notes: <input type="text" id="notes" /><br />
			<button id="add">Add</button>
		</p>
		<p>
			<strong>File Structure So Far (JSON):</strong><br />
			<textarea id="file-structure" class="wrap" ></textarea>
			<button id="save-structure-file">Save Structure File</button>
			<button id="load-structure-file">Load Structure File</button>
		</p>
		<p>
			When you are ready, head on over to <a href="">Tool 2 - Custom Saved Game Tool</a>
	</body>
</html>