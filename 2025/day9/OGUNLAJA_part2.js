const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	const MILLION = 1_000_000;
	const red = data.split("\r\n").map((line) => line.split(",").map(Number));
	const crossesByY = new Map();
	const perimeter = new Set(red.map(([x, y]) => x * MILLION + y));

	for (let i = 0; i < red.length; i++) {
		const [x1, y1] = red[i];
		const [x2, y2] = red[i + 1] || red[0];

		if (x1 === x2) {
			for (let y = Math.min(y1, y2); y < Math.max(y1, y2); y++) {
				perimeter.add(x1 * MILLION + y);

				const crosses = crossesByY.get(y);
				if (crosses) crosses.push(x1);
				else crossesByY.set(y, [x1]);
			}
		} else if (y1 === y2) {
			for (let x = Math.min(x1, x2); x < Math.max(x1, x2); x++) {
				perimeter.add(x * MILLION + y1);
			}
		}
	}

	for (const arr of crossesByY.values()) arr.sort((a, b) => a - b);

	function isOutside(x, y) {
		const row = crossesByY.get(y);
		if (!row) return true;

		const crosses = row.findLastIndex((crossX) => x >= crossX) + 1;
		return crosses % 2 === 0;
	}

	let largest = 0;
	for (let i = 0; i < red.length; i++) {
		const point1 = red[i];
		for (let j = i + 1; j < red.length; j++) {
			const point2 = red[j];
			const width = Math.abs(point1[0] - point2[0]) + 1;
			const height = Math.abs(point1[1] - point2[1]) + 1;
			const area = width * height;

			if (area <= largest) continue;

			let isValidRectangle = true;

			const corners = [
				point1,
				point2,
				[point1[0], point2[1]],
				[point2[0], point1[1]],
			];

			for (let k = 0; k < corners.length && isValidRectangle; k++) {
				const [x1, y1] = corners[k];
				for (let l = k + 1; l < corners.length && isValidRectangle; l++) {
					const [x2, y2] = corners[l];
					if (x1 !== x2 && y1 !== y2) continue;

					if (x1 === x2) {
						const minY = Math.min(y1, y2);
						const maxY = Math.max(y1, y2);
						for (let y = minY + 1; y < maxY; y++) {
							if (perimeter.has(x1 * MILLION + y)) continue;
							if (isOutside(x1, y)) {
								isValidRectangle = false;
								break;
							}
						}
					} else {
						const minX = Math.min(x1, x2);
						const maxX = Math.max(x1, x2);
						for (let x = minX + 1; x < maxX; x++) {
							if (perimeter.has(x * MILLION + y1)) continue;
							if (isOutside(x, y1)) {
								isValidRectangle = false;
								break;
							}
						}
					}
				}
			}

			if (isValidRectangle) largest = area;
		}
	}

	console.log(largest);
});
