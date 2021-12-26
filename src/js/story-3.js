startStory3();

function startStory3() {
  // Define the variables
  let line0 = [
    `চে`, `ত`, `না`,
    `ও`,
    `চে`, `ত`, `না`, `র`, `শূ`, `ন্য`, `তা`,
    `এ`, `বং`,
    `চে`, `ত`, `না`,
    `ও`,
    `চে`, `ত`, `না`, `র`, `লু`, `প্ত`, `তা`,
    `এ`, `বং`,
    `চে`, `ত`, `না`,
    `ও`,
    `চে`, `ত`, `না`, `র`, `এ`, `ক`, `ধ`, `র`, `নে`, `র`, `অ`, `বা`, `ধ্য`, `তা`,
  ];
  let line1 = [
    `চে`, `ত`, `না`,
    `ও`,
    `চে`, `ত`, `না`, `র`, `মৌ`, `ন`, `তা`,
    `এ`, `বং`,
    `চে`, `ত`, `না`,
    `ও`,
    `চে`, `ত`, `না`, `র`, `বৈ`, `রি`, `তা`,
    `এ`, `বং`,
    `চে`, `ত`, `না`,
    `ও`,
    `চে`, `ত`, `না`, `র`, `এ`, `ক`, `ধ`, `র`, `নে`, `র`, `অ`, `বা`, `ধ্য`, `তা`,
  ];
  let line2 = [
    `চে`, `ত`, `না`,
    `ও`,
    `চে`, `ত`, `না`, `র`, `স্ত`, `ব্ধ`, `তা`,
    `এ`, `বং`,
    `চে`, `ত`, `না`,
    `ও`,
    `চে`, `ত`, `না`, `র`, `ঊ`, `হ্য`, `তা`,
    `এ`, `বং`,
    `চে`, `ত`, `না`,
    `ও`,
    `চে`, `ত`, `না`, `র`, `এ`, `ক`, `ধ`, `র`, `নে`, `র`, `অ`, `বা`, `ধ্য`, `তা`,
  ];
  let line3 = [
    `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`,
    `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`,
    `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`,
    `আ`, `সে`, `যা`, `য়`, `আ`, `সে`, `যা`, `য়`,
  ];
  let fontSizes = [
    1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5, 1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5,
    1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5, 1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5,
    1, 1.5, 2, 2.5, 3, 2.5, 2, 1.5, 1.8, 2, 1.5, 1.2,
  ];

  let lines = [line0, line1, line2, line3];
  let fontSizesLength = fontSizes.length;
  let largestFontSize = Math.max(...fontSizes);
  let fontSizeFactor = 0.8;
  let transitionTimeMs = 625;

  // Get document elements
  let waveOfText = document.getElementById(`3-wot`);

  // Disable scroll anchoring
  document.body.style.overflowAnchor = `none`;

  // Transform the font-sizes multiplied by fontSizeFactor
  fontSizes = fontSizes.map(
      item => Math.round(item * fontSizeFactor * 100) / 100,
  );

  // Set the initial layout
  lines.forEach((line, indexOfLine) => {
    let row = document.createElement(`div`);
    row.id = `3-row-${indexOfLine}`;
    row.className = `row`;
    row.style.height = `${largestFontSize}vw`;
    row.style.overflow = `hidden`; // Though the row is not supposed to overflow, I'm hiding overflow just in case any compatibility issue arises
    waveOfText.append(row);

    line.forEach((char, indexOfChar) => {
      let col = document.createElement(`div`);
      col.id = `3-${indexOfLine}-${indexOfChar}`;
      col.className = `col text-center`;
      col.style.padding = `0`;
      col.style.fontSize = fontSizes[fontSizesLength - indexOfChar] + `vw`;
      col.style.transition = `font-size ${transitionTimeMs}ms linear`;
      col.innerHTML += char;
      row.appendChild(col);
    });
  });

  // Start the interval of wave-effect
  let phase = 0;
  setInterval(() => {
    lines.forEach((line, indexOfLine) => {
      line.forEach((char, indexOfChar) => {
        let currentChars = document.getElementById(
            `3-${indexOfLine}-${indexOfChar}`,
        ); // A plural "chars", as the kars and juktobornos are animated with the main borno (character).
        currentChars.style.fontSize = fontSizes[
        (fontSizesLength - indexOfChar + phase) % fontSizesLength
            ] + `vw`; // Traversing in reverse order, to make the wave move in the reading direction.
      });
    });
    phase++;
  }, transitionTimeMs);
}
