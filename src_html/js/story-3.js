startStory3();

function startStory3() {
  // Define the variables
  let line0 = [
    `চে`,
    `ত`,
    `না`,
    `ও`,
    `চে`,
    `ত`,
    `না`,
    `র`,
    `শূ`,
    `ন্য`,
    `তা`,
    `এ`,
    `বং`,
    `চে`,
    `ত`,
    `না`,
    `ও`,
    `চে`,
    `ত`,
    `না`,
    `র`,
    `লু`,
    `প্ত`,
    `তা`,
    `এ`,
    `বং`,
    `চে`,
    `ত`,
    `না`,
    `ও`,
    `চে`,
    `ত`,
    `না`,
    `র`,
    `এ`,
    `ক`,
    `ধ`,
    `র`,
    `নে`,
    `র`,
    `অ`,
    `বা`,
    `ধ্য`,
    `তা`];
  let line1 = [
    `চে`,
    `ত`,
    `না`,
    `ও`,
    `চে`,
    `ত`,
    `না`,
    `র`,
    `মৌ`,
    `ন`,
    `তা`,
    `এ`,
    `বং`,
    `চে`,
    `ত`,
    `না`,
    `ও`,
    `চে`,
    `ত`,
    `না`,
    `র`,
    `বৈ`,
    `রি`,
    `তা`,
    `এ`,
    `বং`,
    `চে`,
    `ত`,
    `না`,
    `ও`,
    `চে`,
    `ত`,
    `না`,
    `র`,
    `এ`,
    `ক`,
    `ধ`,
    `র`,
    `নে`,
    `র`,
    `অ`,
    `বা`,
    `ধ্য`,
    `তা`];
  let line2 = [
    `চে`,
    `ত`,
    `না`,
    `ও`,
    `চে`,
    `ত`,
    `না`,
    `র`,
    `স্ত`,
    `ব্ধ`,
    `তা`,
    `এ`,
    `বং`,
    `চে`,
    `ত`,
    `না`,
    `ও`,
    `চে`,
    `ত`,
    `না`,
    `র`,
    `ঊ`,
    `হ্য`,
    `তা`,
    `এ`,
    `বং`,
    `চে`,
    `ত`,
    `না`,
    `ও`,
    `চে`,
    `ত`,
    `না`,
    `র`,
    `এ`,
    `ক`,
    `ধ`,
    `র`,
    `নে`,
    `র`,
    `অ`,
    `বা`,
    `ধ্য`,
    `তা`];
  let line3 = [
    `আ`,
    `সে`,
    `যা`,
    `য়`,
    `আ`,
    `সে`,
    `যা`,
    `য়`,
    `আ`,
    `সে`,
    `যা`,
    `য়`,
    `আ`,
    `সে`,
    `যা`,
    `য়`,
    `আ`,
    `সে`,
    `যা`,
    `য়`,
    `আ`,
    `সে`,
    `যা`,
    `য়`,
    `আ`,
    `সে`,
    `যা`,
    `য়`,
    `আ`,
    `সে`,
    `যা`,
    `য়`,
    `আ`,
    `সে`,
    `যা`,
    `য়`,
    `আ`,
    `সে`,
    `যা`,
    `য়`,
    `আ`,
    `সে`,
    `যা`,
    `য়`];
  let lines = [line0, line1, line2, line3];

  let fontSizes = [
    1,
    1.5,
    2,
    2.5,
    3,
    2.5,
    2,
    1.5,
    1,
    1.5,
    2,
    2.5,
    3,
    2.5,
    2,
    1.5,
    1,
    1.5,
    2,
    2.5,
    3,
    2.5,
    2,
    1.5,
    1,
    1.5,
    2,
    2.5,
    3,
    2.5,
    2,
    1.5,
    1,
    1.5,
    2,
    2.5,
    3,
    2.5,
    2,
    1.5,
    1.8,
    2,
    1.5,
    1.2];
  let fontSizesLength = fontSizes.length;
  let fontSizeFactor = 0.8;

  let transitionTimeMs = 625;

  let waveText = document.getElementById(`3-wave-of-text`);

// Create the initial layout
  lines.forEach((line, indexOfLine) => {
    let row = document.createElement(`div`);
    row.className = `row`;
    row.id = `3-row-${indexOfLine}`;
    waveText.append(row);

    line.forEach((char, indexOfChar) => {
      let textCol = document.createElement(`div`);
      textCol.id = `3-${indexOfLine}-${indexOfChar}`;
      textCol.className = `col44 s1`;
      textCol.style.fontSize = fontSizes[fontSizesLength - indexOfChar] *
          fontSizeFactor + `vw`;
      textCol.style.transition = `font-size ${transitionTimeMs}ms linear`;
      textCol.innerHTML += char;
      row.appendChild(textCol);
    });
  });

// Add the wave effect with regular time interval
  let phase = 0;
  setInterval(() => {
    // TODO: Figure out why this makes the window shake.
    lines.forEach((line, indexOfLine) => {
      line.forEach((char, indexOfChar) => {
        let currentChars = document.getElementById(
            `3-${indexOfLine}-${indexOfChar}`); // A plural "chars", as the kars and juktobornos are animated with the main borno (character).
        currentChars.style.fontSize = fontSizes[(fontSizesLength - indexOfChar +
            phase) % fontSizesLength] * fontSizeFactor + `vw`; // Traversing in reverse order, to make the wave move in the reading direction.
      });
    });
    phase++;
  }, transitionTimeMs);

}
