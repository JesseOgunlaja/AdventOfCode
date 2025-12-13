const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	const dataMap = data.split("\r\n").reduce((dataMap, line) => {
		const [input, rawOutput] = line.split(": ");

		dataMap.set(input, rawOutput.split(" "));
		return dataMap;
	}, new Map());

	const cache = new Map();
	function getPathsFromPosition(current, state) {
		if (current === "dac") state |= 1;
		if (current === "fft") state |= 2;
		if (current === "out") return state === 3 ? 1 : 0;

		const key = `${current}:${state}`;
		if (cache.has(key)) return cache.get(key);

		const paths = dataMap
			.get(current)
			.reduce((total, next) => total + getPathsFromPosition(next, state), 0);

		cache.set(key, paths);
		return paths;
	}

	console.log(getPathsFromPosition("svr", 0));
});
