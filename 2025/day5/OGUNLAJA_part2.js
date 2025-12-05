const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	console.log(
		Array.from(new Set(data.split("\r\n")))
			.map((value) => {
				return value.split("-").map(Number).sort().join("-");
			})
			.reduce((list, value) => {
				if (value.includes("-")) {
					const [start, end] = value.split("-").map(Number);
					const clashes = list
						.map((clash, index) => [...clash, index])
						.filter(
							([low, high]) =>
								(start <= low + 1 && end >= low) ||
								(end >= high && start <= high + 1),
						);

					if (clashes.length > 0) {
						const newRange = [
							Math.min(...clashes.map((clash) => clash[0]), start),
							Math.max(...clashes.map((clash) => clash[1]), end),
						];
						clashes.reverse().forEach((clash) => {
							list.splice(clash[2], 1);
						});
						list.push(newRange);
					} else if (!list.some(([low, high]) => start >= low && end <= high)) {
						list.push(value.split("-").map(Number));
					}
				}
				return list;
			}, [])
			.reduce((total, [start, end]) => {
				return total + end - start + 1;
			}, 0),
	);
});
