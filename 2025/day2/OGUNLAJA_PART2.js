const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "input.txt");

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		console.error("Error reading file:", err);
		return;
	}

	console.log(
		data.split(",").reduce((total, value) => {
			const [firstID, lastID] = value.split("-").map(Number);
			for (let id = firstID; id <= lastID; id++) {
				const stringID = String(id);
				let invalid_id = false;

				// if (stringID.length % 2 !== 0 && stringID.length < 9) continue;
				for (let j = 1; j < stringID.length; j++) {
					if (invalid_id) break;

					const string = removeTracingZeroes(stringID.slice(0, j));
					for (let k = j; k <= stringID.length; k += string.length) {
						if (stringID.slice(k, k + string.length) !== string) break;
						if (k + string.length == stringID.length) {
							invalid_id = true;
							break;
						}
					}
				}

				if (invalid_id) total += id;
			}

			return total;
		}, 0),
	);
});

function removeTracingZeroes(string) {
	return String(Number(string));
}
