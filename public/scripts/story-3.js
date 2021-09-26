const line0 = [`চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `শূ`, `ন্য`, `তা`, `এ`, `বং`, `চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `লু`, `প্ত`, `তা`, `এ`, `বং`, `চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `এ`, `ক`, `ধ`, `র`, `নে`, `র`, `অ`, `বা`, `ধ্য`, `তা`];

const line1 = [`চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `মৌ`, `ন`, `তা`, `এ`, `বং`, `চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `বৈ`, `রি`, `তা`, `এ`, `বং`, `চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `এ`, `ক`, `ধ`, `র`, `নে`, `র`, `অ`, `বা`, `ধ্য`, `তা`];

const line2 = [`চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `স্ত`, `ব্ধ`, `তা`, `এ`, `বং`, `চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `ঊ`, `হ্য`, `তা`, `এ`, `বং`, `চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `এ`, `ক`, `ধ`, `র`, `নে`, `র`, `অ`, `বা`, `ধ্য`, `তা`];

const line3 = [`আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`];

const lines = [line0, line1, line2, line3];
const fontSizes = [1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5, 1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5, 1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5, 1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5, 1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5, 1.8, 2, 1.5, 1];
const fontSizesLength = fontSizes.length;

const waveText = document.getElementById(`3-wave-of-text`);

lines.forEach((line, indexLine) => {
	line.forEach((char, indexChar) => {
		let textSpan = document.createElement(`span`);
		textSpan.id = `${indexLine}-${indexChar}`;
		textSpan.style.transition = `font-size 500ms linear`;
		textSpan.style.fontSize = fontSizes[indexChar] * 1.2 + `vw`;
		textSpan.innerHTML += char;
		waveText.append(textSpan);

		let spaceSpan = document.createElement(`span`);
		spaceSpan.style.fontSize = `1vw`;
		spaceSpan.innerHTML += ` `;
		waveText.append(spaceSpan);
	});

	if (indexLine < lines.length - 1) {
		waveText.innerHTML += `<br>`;
	}
});

let iteration = 1;

setInterval(() => {
	console.log(iteration);
	lines.forEach((line, indexLine) => {
		line.forEach((char, indexChar) => {
			let theCharSpan = document.getElementById(`${indexLine}-${indexChar}`);
			theCharSpan.style.fontSize = fontSizes[(indexChar + iteration) % fontSizesLength] * 1.2 + `vw`;
		});
	});
	iteration++;
}, 500);
