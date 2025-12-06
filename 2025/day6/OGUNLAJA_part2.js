const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	let result = 0;
	const operators = data
		.split("\r\n")
		.at(-1)
		.split("")
		.filter((char) => char !== " ");
	const numberLines = data.split("\r\n").slice(0, -1);

	let operationIndex = operators.length - 1;
	let currNums = [];

	for (
		let i = Math.max(...numberLines.map((line) => line.length)) - 1;
		i >= 0;
		i--
	) {
		const vertLineChars = numberLines.map((line) => line[i]);
		if (vertLineChars.every((val) => val === " ") || i === 0) {
			if (i === 0) currNums.push(Number(vertLineChars.join("")));

			if (operators[operationIndex] === "+") {
				result += currNums.reduce((x, number) => {
					return x + number;
				}, 0);
			} else {
				result += currNums.reduce((x, number) => {
					return x * number;
				}, 1);
			}

			operationIndex--;
			currNums = [];
		} else {
			currNums.push(Number(vertLineChars.join("")));
		}
	}
	console.log(result);
});
