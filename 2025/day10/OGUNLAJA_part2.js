const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	const [buttonsList, joltageRequirementsList] = data.split("\r\n").reduce(
		([buttonsList, joltageRequirementsList], line) => {
			const firstSpaceIndex = line.indexOf(" ");

			const buttons = line
				.slice(firstSpaceIndex + 1)
				.split(" ")
				.slice(0, -1)
				.map((button) => button.slice(1, -1).split(",").map(Number));

			const joltageRequirements = line
				.slice(firstSpaceIndex + 1)
				.split(" ")
				.slice(-1)
				.map((s) => s.slice(1, -1).split(",").map(Number));

			buttonsList.push(buttons);
			joltageRequirementsList.push(...joltageRequirements);
			return [buttonsList, joltageRequirementsList];
		},
		[[], []],
	);

	let total = 0;
	console.time("part2");

	for (let i = 0; i < buttonsList.length; i++) {
		const buttons = buttonsList[i];
		const target = joltageRequirementsList[i];

		const affectsList = Array.from({ length: target.length }, () => []);

		for (let j = 0; j < buttons.length; j++) {
			const button = buttons[j];
			for (const index of button) {
				affectsList[index].push(j);
			}
		}

		const activeButtons = new Uint8Array(buttons.length);
		activeButtons.fill(1);

		total += minPresses(target, activeButtons);

		function minPresses(joltage, activeButtons) {
			if (joltage.every((v) => v === 0)) return 0;

			let lowestButtonsAffecting = Infinity;
			let highestJoltage = -Infinity;
			let mostConstrainingIndex = -1;

			for (let i = 0; i < joltage.length; i++) {
				if (joltage[i] === 0) continue;

				let buttonsAffecting = 0;
				for (const index of affectsList[i]) {
					if (activeButtons[index]) buttonsAffecting++;
				}

				if (
					buttonsAffecting < lowestButtonsAffecting ||
					(buttonsAffecting === lowestButtonsAffecting &&
						joltage[i] > highestJoltage)
				) {
					lowestButtonsAffecting = buttonsAffecting;
					highestJoltage = joltage[i];
					mostConstrainingIndex = i;
				}
			}

			if (mostConstrainingIndex === -1) return Infinity;

			const buttonsInUse = [];
			for (const index of affectsList[mostConstrainingIndex]) {
				if (activeButtons[index]) buttonsInUse.push(index);
			}

			const required = joltage[mostConstrainingIndex];

			const pressCounts = new Array(buttonsInUse.length).fill(0);
			pressCounts[pressCounts.length - 1] = required;

			const nextActiveButtons = new Uint8Array(activeButtons);
			for (const index of buttonsInUse) {
				nextActiveButtons[index] = 0;
			}

			let shortest = Infinity;
			do {
				let valid = true;
				let pressesUsed = 0;
				const nextJoltage = joltage.slice();

				for (let i = 0; i < buttonsInUse.length; i++) {
					const presses = pressCounts[i];
					if (presses === 0) continue;

					pressesUsed += presses;
					const button = buttons[buttonsInUse[i]];

					for (const index of button) {
						if (nextJoltage[index] < presses) {
							valid = false;
							break;
						}
						nextJoltage[index] -= presses;
					}
					if (!valid) break;
				}

				if (valid) {
					const remaining = minPresses(nextJoltage, nextActiveButtons);
					if (remaining + pressesUsed < shortest) {
						shortest = remaining + pressesUsed;
					}
				}
			} while (nextCombination(pressCounts, required));

			return shortest;
		}
	}

	console.log(total);
	console.timeEnd("part2");
});

function nextCombination(counts, required) {
	const k = counts.length;
	if (k < 2) return false;

	for (let i = k - 2; i >= 0; i--) {
		let prefix = 0;
		for (let p = 0; p < i; p++) prefix += counts[p];

		const maxForI = required - prefix;

		if (counts[i] < maxForI) {
			counts[i]++;

			for (let j = i + 1; j <= k - 2; j++) counts[j] = 0;

			let sumFirst = 0;
			for (let j = 0; j <= k - 2; j++) sumFirst += counts[j];
			counts[k - 1] = required - sumFirst;

			return true;
		}
	}
	return false;
}
