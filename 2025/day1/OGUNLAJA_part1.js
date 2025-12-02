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

		let newPosition = letter === "L" ? position - amount : position + amount;
		while (newPosition > 99) newPosition -= 100;
		while (newPosition < 0) newPosition += 100;

		if (newPosition === 0) password += 1;
		return newPosition;
	}, 50),
		console.log(password);
});
