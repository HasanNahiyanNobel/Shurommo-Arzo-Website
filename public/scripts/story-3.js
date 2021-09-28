const line0 = [`চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `শূ`, `ন্য`, `তা`, `এ`, `বং`, `চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `লু`, `প্ত`, `তা`, `এ`, `বং`, `চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `এ`, `ক`, `ধ`, `র`, `নে`, `র`, `অ`, `বা`, `ধ্য`, `তা`];

const line1 = [`চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `মৌ`, `ন`, `তা`, `এ`, `বং`, `চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `বৈ`, `রি`, `তা`, `এ`, `বং`, `চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `এ`, `ক`, `ধ`, `র`, `নে`, `র`, `অ`, `বা`, `ধ্য`, `তা`];

const line2 = [`চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `স্ত`, `ব্ধ`, `তা`, `এ`, `বং`, `চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `ঊ`, `হ্য`, `তা`, `এ`, `বং`, `চে`, `ত`, `না`, `ও`, `চে`, `ত`, `না`, `র`, `এ`, `ক`, `ধ`, `র`, `নে`, `র`, `অ`, `বা`, `ধ্য`, `তা`];

const line3 = [`আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`];

const lines = [line0, line1, line2, line3];
const fontSizes = [1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5, 1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5, 1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5, 1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5, 1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5, 1.8, 2, 1.5, 1.2];
const fontSizesLength = fontSizes.length;
const fontSizeFactor = 0.8;

const transitionTime = 625;

const waveText = document.getElementById(`3-wave-of-text`);

lines.forEach((line, indexOfLine) => {
	let row = document.createElement(`div`);
	row.className = `row`;
	row.id = `3-row-${indexOfLine}`;
	waveText.append(row);

	line.forEach((char, indexOfChar) => {
		let textCol = document.createElement(`div`);
		textCol.id = `3-${indexOfLine}-${indexOfChar}`;
		textCol.style.fontSize = fontSizes[indexOfChar] * fontSizeFactor + `vw`;
		textCol.className = `col44 s1 center`;
		textCol.style.transition = `font-size ${transitionTime}ms linear`;
		textCol.innerHTML += char;
		row.appendChild(textCol);

		/*let spaceSpan = document.createElement(`span`);
		spaceSpan.style.fontSize = `1vw`;*/
	});
});

let phase = 0;

setInterval(() => {
	lines.forEach((line, indexOfLine) => {
		line.forEach((char, indexOfChar) => {
			let currentChars = document.getElementById(`3-${indexOfLine}-${indexOfChar}`); // A plural "chars", as the kars and juktobornos are animated with the main borno (character).
			currentChars.style.fontSize = fontSizes[(indexOfChar + phase) % fontSizesLength] * fontSizeFactor + `vw`;
		});
	});
	phase++;
}, transitionTime);
