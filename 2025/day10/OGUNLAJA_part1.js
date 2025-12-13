const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	const [machines, buttonsList] = data.split("\r\n").reduce(
		([machines, buttonsList], line) => {
			const firstSpaceIndex = line.indexOf(" ");
			const machine = line
				.slice(1, firstSpaceIndex - 1)
				.split("")
				.reduce((machine, char, index) => {
					if (char === "#") machine += Math.pow(2, index);
					return machine;
				}, 0);

			const buttons = line
				.slice(firstSpaceIndex + 1)
				.split(" ")
				.slice(0, -1)
				.map((button) => {
					const indices = button.slice(1, -1).split(",").map(Number);

					const mask = indices.reduce(
						(mask, index) => mask + Math.pow(2, index),
						0,
					);

					return mask;
				});

			machines.push(machine);
			buttonsList.push(buttons);
			return [machines, buttonsList];
		},
		[[], []],
	);

	let total = 0;

	for (let i = 0; i < machines.length; i++) {
		const machine = machines[i];
		const buttons = buttonsList[i];

		let shortest = Infinity;
		const queue = [[0, 0]];
		const visited = new Map();

		while (queue.length > 0) {
			const [state, presses] = queue.pop();
			visited.set(state, presses + 1);

			for (const button of buttons) {
				const nextState = state ^ button;

				if (
					(visited.has(nextState) && visited.get(nextState) < presses + 1) ||
					presses + 1 >= shortest
				) {
					continue;
				}
				if (nextState === machine) {
					shortest = Math.min(shortest, presses + 1);
				}
				queue.push([nextState, presses + 1]);
			}
		}
		total += shortest;
	}

	console.log(total);
});
