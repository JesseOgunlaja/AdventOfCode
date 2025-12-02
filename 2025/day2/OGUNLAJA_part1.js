const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	console.log(
		data.split(",").reduce((total, value) => {
			const [firstID, lastID] = value.split("-").map(Number);
			for (let i = firstID; i <= lastID; i++) {
				const stringI = String(i);
				if (stringI.length % 2 !== 0) continue;
				if (
					stringI.slice(0, stringI.length / 2) ===
					stringI.slice(stringI.length / 2)
				) {
					total += i;
				}
			}

			return total;
		}, 0),
	);
});
