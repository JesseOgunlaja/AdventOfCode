const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	const [dataMap, outs] = data.split("\r\n").reduce(
		([dataMap, outs], line) => {
			const [input, output] = line.split(": ");
			dataMap.set(input, output.split(" "));
			if (output.includes("out")) {
				outs.push(input);
			}
			return [dataMap, outs];
		},
		[new Map(), []],
	);

	let total = 0;
	const queue = ["you"];

	while (queue.length > 0) {
		const outputs = dataMap.get(queue.shift());
		for (const output of outputs) {
			if (outs.includes(output)) {
				total++;
			} else {
				queue.push(output);
			}
		}
	}

	console.log(total);
});
