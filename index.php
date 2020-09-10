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
		<div class="label-this-region">
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