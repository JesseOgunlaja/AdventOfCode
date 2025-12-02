const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	let password = 0;
	data.split("\r\n").reduce((position, element) => {
		const letter = element[0];
		const amount = Number(element.slice(1));

		const newPosition = letter === "L" ? position - amount : position + amount;

		if (letter === "R") {
			password += Math.floor(newPosition / 100) - Math.floor(position / 100);
		} else {
			password += Math.floor((position - 1) / 100) - Math.floor((newPosition - 1) / 100);
		}

		return newPosition;
	}, 50);

	console.log(password);
});
