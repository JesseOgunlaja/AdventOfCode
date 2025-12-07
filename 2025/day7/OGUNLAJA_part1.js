const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	let total = 0;

	const lines = data.split("\r\n");
	let queue = [{ x: lines[0].indexOf("S"), y: 0 }];

	while (queue.length > 0) {
		const { x, y } = queue.shift();
		if (y + 1 === lines.length) continue;
		else if (lines[y + 1][x] === ".") {
			queue.push({ x, y: y + 1 });
		} else {
			total += 1;
			queue.push({ x: x - 1, y: y + 1 });
			queue.push({ x: x + 1, y: y + 1 });
		}

		queue = Array.from(new Set(queue.map((pos) => JSON.stringify(pos)))).map(
			(pos) => JSON.parse(pos),
		);
	}
	console.log(total);
});
