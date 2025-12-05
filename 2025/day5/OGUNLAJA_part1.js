const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	const validList = [];

	console.log(
		data.split("\r\n").reduce((fresh, value) => {
			if (value.includes("-")) {
				validList.push(value.split("-").map(Number));
			} else if (value !== "") {
				for (const [low, high] of validList) {
					const num = Number(value);
					if (num >= low && num <= high) {
						fresh++;
						break;
					}
				}
			}
			return fresh;
		}, 0),
	);
});
