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
  let fontSizeFactor = 0.8;
  let largestFontSize = Math.max(...fontSizes);

  let transitionTimeMs = 625;

  let postWave = document.getElementById(`3-psw`);
  let waveOfText = document.getElementById(`3-wot`);
  let waveOfTextTop;
  /**
   * For some reason which I could not figure out yet, the div of wave loads
   * a little later, and until that time, it has a top of 0. This is why we
   * need this interval.
   * @type {NodeJS.Timeout}
   */
  let getWaveTextTopInterval = setInterval(() => {
    waveOfTextTop = waveOfText.getBoundingClientRect().top;
    if (waveOfTextTop > 0) {
      clearInterval(getWaveTextTopInterval);
      createInitialLayout();
      setTheTopOfPostWave();
    }
  }, 100);

  let vw = Math.max(document.documentElement.clientWidth || 0,
      window.innerWidth || 0); // Taken from: https://stackoverflow.com/a/8876069

// Function to create the initial layout
  function createInitialLayout() {
    lines.forEach((line, indexOfLine) => {
      let row = document.createElement(`div`);
      row.id = `3-row-${indexOfLine}`;
      row.style.overflow = `hidden`; // Though the row is not supposed to overflow, I'm hiding overflow just in case any compatibility issue arises
      waveOfText.append(row);

      line.forEach((char, indexOfChar) => {
        let col = document.createElement(`div`);
        col.id = `3-${indexOfLine}-${indexOfChar}`;
        col.className = `text-center`;
        col.style.position = `absolute`;
        col.style.top = `${
            waveOfTextTop + indexOfLine * largestFontSize * vw / 100
        }px`;
        col.style.left = `${(vw * .99) / fontSizesLength * indexOfChar}px`; // Using the full width of vw somehow causes an overflow, so I multiplied it by a factor
        col.style.width = `${vw / fontSizesLength}px`;
        col.style.padding = `0`;
        col.style.fontSize = fontSizes[fontSizesLength - indexOfChar] *
            fontSizeFactor + `vw`;
        col.style.transition = `font-size ${transitionTimeMs}ms linear`;
        col.innerHTML += char;
        row.appendChild(col);
      });
    });
  }

  function setTheTopOfPostWave() {
    postWave.style.position = `absolute`;
    postWave.style.top = `${
        waveOfTextTop + lines.length * largestFontSize * vw / 100
    }px`;
  }

// Add the wave effect with regular time interval
  let phase = 0;
  setInterval(() => {
    // TODO: Figure out why this makes the window shake.
    lines.forEach((line, indexOfLine) => {
      line.forEach((char, indexOfChar) => {
        let currentChars = document.getElementById(
            `3-${indexOfLine}-${indexOfChar}`,
        ); // A plural "chars", as the kars and juktobornos are animated with the main borno (character).
        currentChars.style.fontSize = fontSizes[
        (fontSizesLength - indexOfChar + phase) % fontSizesLength
            ] * fontSizeFactor + `vw`; // Traversing in reverse order, to make the wave move in the reading direction.
      });
    });
    phase++;
  }, transitionTimeMs);

}
