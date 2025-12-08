const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	let result = 0;
	const boxes = data.split("\r\n").map((line) => line.split(",").map(Number));
	const circuits = [];
	const shortestPoints = [];

	for (let i = 0; i < boxes.length; i++) {
		const box = boxes[i];
		for (let j = i + 1; j < boxes.length; j++) {
			const distance = calculateDistance(box, boxes[j]);
			shortestPoints.push([box, boxes[j], distance]);
		}
	}
	shortestPoints.sort((a, b) => a[2] - b[2]);

	shortestPoints
		.map(([point1, poin2]) => {
			return [point1.join(","), poin2.join(",")];
		})
		.forEach(([point1, point2]) => {
			if (result !== 0) return;

			const index = circuits.findIndex((circuit) => circuit.has(point1));
			const index2 = circuits.findIndex((circuit) => circuit.has(point2));

			if (index !== -1 && index2 !== -1 && index !== index2) {
				circuits[index].forEach((point) => circuits[index2].add(point));
				circuits.splice(index, 1);
			} else if (index !== -1) {
				circuits[index].add(point1);
				circuits[index].add(point2);
			} else if (index2 !== -1) {
				circuits[index2].add(point1);
				circuits[index2].add(point2);
			} else if (index === -1 && index2 === -1) {
				circuits.push(new Set([point1, point2]));
			}

			if (circuits.length === 1 && circuits[0].size === boxes.length) {
				result = point1.split(",")[0] * point2.split(",")[0];
			}
		});
	console.log(result);
});

function calculateDistance(circuit1, circuit2) {
	const dx = circuit1[0] - circuit2[0];
	const dy = circuit1[1] - circuit2[1];
	const dz = circuit1[2] - circuit2[2];
	return dx * dx + dy * dy + dz * dz;
}
