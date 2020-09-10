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
		<p>
			Web tool to reverse engineer saved game files. For games that use SIMPLE, BINARY saved game formats with NO CHECKSUM. This tool will do diffs, labeling, etc.
		</p>
		<p>
			Load 2 saved game files with 1 setting changed, see the diff, label the field, and it will be added to a structure. Label enough of these and you will have a fairly well mapped out saved game structure. You can then use the structure to create your own saved games.
		</p>
		<div class="two-columns">
			<div class="fifty-percent-wide">
				<strong>Saved Game File 1:</strong><br />
				<span class="hint">Hint: Use Drag N Drop</span><br />
				<input id="binary1" type="file" name="binary1" />
			</div>
			<div class="fifty-percent-wide">
				<strong>Saved Game File 2:</strong><br />
				<span class="hint">Hint: Use Drag N Drop</span><br />
				<input id="binary2" type="file" name="binary2" />
			</div>
		</div>
		<p>
			<button id="make-diff-using-files">Make Diff</button>
		</p>
		<p>
			<strong>Diff:</strong><br />
			<textarea id="diff"></textarea>
		</p>
		<div class="two-columns">
			<div>
				<strong>Label this region?</strong><br />
				
				<table>
					<tbody>
						<tr>
							<td>
								Offset (Int):
							</td>
							<td>
								<input type="text" id="offset" />
							</td>
						</tr>
						<tr>
							<td>
								Length (Int):
							</td>
							<td>
								<input type="text" id="length" />
							</td>
						</tr>
						<tr>
							<td>
								Type:
							</td>
							<td>
								<input type="text" id="type" />
							</td>
						</tr>
						<tr>
							<td>
								Default Value:
							</td>
							<td>
								<input type="text" id="default-value" disabled />
							</td>
						</tr>
						<tr>
							<td>
								Range Min (Hex):
							</td>
							<td>
								<input type="text" id="range-max" />
							</td>
						</tr>
						<tr>
							<td>
								Range Max (Hex):
							</td>
							<td>
								<input type="text" id="range-min" />
							</td>
						</tr>
						<tr>
							<td>
								Name:
							</td>
							<td>
								<input type="text" id="name" />
							</td>
						</tr>
						<tr>
							<td>
								Notes:
							</td>
							<td>
								<input type="text" id="notes" />
							</td>
						</tr>
					</tbody>
				</table>
				
				<button id="add">Add</button>
			</div>
			<div>
				<select size="15">
					<option>Test</option>
				</select>
			</div>
		</div>
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