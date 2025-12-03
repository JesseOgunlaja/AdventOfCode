const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	console.log(
		data.split("\r\n").reduce((total, bank) => {
			if (bank === "") return total;
			const numbers = bank.split("").map(Number);
			const first_digit = Math.max(...numbers.slice(0, -1));
			const second_digit = Math.max(
				...numbers.slice(numbers.indexOf(first_digit) + 1),
			);

			return total + Number(first_digit.toString() + second_digit.toString());
		}, 0),
	);
});
