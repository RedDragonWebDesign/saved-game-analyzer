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
		<p>
			<strong>Saved Game File 1:</strong><br />
			<input id="binary1" type="file" name="binary1" />
		</p>
		<p>
			<strong>Saved Game File 2:</strong><br />
			<input id="binary2" type="file" name="binary2" />
		</p>
		<p>
			<strong>Diff:</strong><br />
			<textarea id="diff"></textarea>
		</p>
		<p>
			<strong>Label this region?</strong><br />
			Offset (Bytes): <input type="text" /><br />
			Length (Bytes): <input type="text" /><br />
			Type: <select></select><br />
			Default Value: <input type="text" /><br />
			Range Min: <input type="text" /><br />
			Range Max: <input type="text" /><br />
			Notes: <input type="text" /><br />
			<button id="add">Add</button>
		</p>
		<p>
			<strong>File Structure So Far (JSON):</strong><br />
			<textarea id="file-structure">Bytes: 0
Structure:</textarea>
			<button id="save-structure-file">Save Structure File</button>
		</p>
		<p>
			When you are ready, head on over to <a href="">Tool 2 - Custom Saved Game Tool</a>
	</body>
</html>