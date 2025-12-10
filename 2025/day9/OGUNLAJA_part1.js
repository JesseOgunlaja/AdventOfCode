const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	const points = data.split("\r\n").map((line) => line.split(",").map(Number));
	let largest = 0;

	for (let i = 0; i < points.length; i++) {
		const point1 = points[i];
		for (let j = i + 1; j < points.length; j++) {
			const point2 = points[j];
			const area =
				(Math.abs(point1[0] - point2[0]) + 1) *
				(Math.abs(point1[1] - point2[1]) + 1);
			if (area > largest) {
				largest = area;
			}
		}
	}

	console.log(largest);
});
