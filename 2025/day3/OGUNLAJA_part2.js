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

			const digits = [];
			let i = 0;
			while (digits.length < 12) {
				const sliced = numbers.slice(i, numbers.length - 11 + digits.length);
				const next_digit = Math.max(...sliced);
				digits.push(next_digit);
				i += sliced.indexOf(next_digit) + 1;
			}

			return total + Number(digits.join(""));
		}, 0),
	);
});
