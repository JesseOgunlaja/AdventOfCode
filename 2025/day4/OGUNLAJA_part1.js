const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	const adjacents = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
		[-1, -1],
		[-1, 1],
		[1, -1],
		[1, 1],
	];

	const dataMap = data.split("\r\n").map((row) => row.split(""));
	console.log(
		dataMap.reduce((total, row, y) => {
			row.forEach((val, x) => {
				if (val !== "@") return;

				let adjacent_roles = 0;
				for (let i = 0; i < 8; i++) {
					if (adjacent_roles === 4) break;

					const adjacentRow = dataMap[y + adjacents[i][1]];
					if (adjacentRow && adjacentRow[x + adjacents[i][0]] === "@") {
						adjacent_roles += 1;
					}
				}

				if (adjacent_roles < 4) total += 1;
			});

			return total;
		}, 0),
	);
});
