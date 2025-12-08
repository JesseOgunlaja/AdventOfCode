const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

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
	shortestPoints.splice(1000);

	shortestPoints
		.map(([point1, poin2]) => {
			return [point1.join(","), poin2.join(",")];
		})
		.forEach(([point1, point2]) => {
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
			// console.log(circuits);
		});
	// console.log(circuits);
	circuits.sort((a, b) => b.size - a.size).splice(3);
	console.log(circuits.reduce((a, b) => a * b.size, 1));
});

function calculateDistance(circuit1, circuit2) {
	const dx = circuit1[0] - circuit2[0];
	const dy = circuit1[1] - circuit2[1];
	const dz = circuit1[2] - circuit2[2];
	return dx * dx + dy * dy + dz * dz;
}
