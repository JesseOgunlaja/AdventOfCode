const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	const numbersList = [];
	const lines = data.split("\r\n").slice(0, -1);
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		line
			.split(" ")
			.map(Number)
			.filter((val) => val !== 0)
			.forEach((number, index) => {
				if (numbersList[index]) numbersList[index].push(number);
				else numbersList[index] = [number];
			});
	}

	const operators = data
		.split("\r\n")
		.at(-1)
		.split("")
		.filter((char) => char !== " ");

	console.log(
		numbersList.reduce((total, numbers, index) => {
			const operator = operators[index];
			if (operator === "+") {
				return (
					total +
					numbers.reduce((x, number) => {
						return x + number;
					}, 0)
				);
			} else {
				return (
					total +
					numbers.reduce((x, number) => {
						return x * number;
					}, 1)
				);
			}
		}, 0),
	);
});
