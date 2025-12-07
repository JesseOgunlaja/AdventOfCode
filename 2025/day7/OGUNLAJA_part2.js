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
	const queue = [{ x: lines[0].indexOf("S"), y: 0, score: 1 }];

	while (queue.length > 0) {
		const { x, y, score } = queue.shift();

		if (y + 1 === lines.length) {
			total += score;
			continue;
		} else if (lines[y + 1][x] === ".") {
			queue.push({ x, y: y + 1, score });
		} else {
			const leftIndex = queue.findIndex(
				({ x: innerX, y: innerY }) => innerX === x - 1 && innerY === y + 1,
			);
			if (leftIndex !== -1)
				queue[leftIndex] = {
					x: x - 1,
					y: y + 1,
					score: queue[leftIndex].score + score,
				};
			else queue.push({ x: x - 1, y: y + 1, score });

			const rightIndex = queue.findIndex(
				({ x: innerX, y: innerY }) => innerX === x + 1 && innerY === y + 1,
			);
			if (rightIndex !== -1)
				queue[rightIndex] = {
					x: x + 1,
					y: y + 1,
					score: queue[rightIndex].score + score,
				};
			else queue.push({ x: x + 1, y: y + 1, score });
		}
	}
    
	console.log(total);
});
