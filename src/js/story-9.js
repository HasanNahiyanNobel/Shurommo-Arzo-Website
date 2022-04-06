startStory9();

function startStory9() {
  // Trigger the modal of info
  setTimeout(() => {
    // document.getElementById(`9-mt`).click(); // TODO: Enable this modal click
  }, 150);

  // Get document elements
  let modalButton = document.getElementById(`9-y`);
  let starterQuote = document.getElementById(`9-sq`);
  let mainText = document.getElementById(`9-t`);
  let lastDiv = document.getElementById(`9-ld`);

  // Get the last paragraphs
  let lastParagraphs = Array.from(lastDiv.getElementsByTagName(`p`));
  let numberOfLastParagraphs = lastParagraphs.length;

  // Specify pseudo-constants
  let largestSpacingInEm = 0.8;
  let lastQuoteAppearsAfterMS = 5000;
  let colourLight = `#ffffff`;
  let colourDark = `#212529`; // Bootstrap dark colour
  let transitionTimeInMS = 2000;
  let transitionSpeedCurve = `linear`;

  // Add event listener for the modal button
  modalButton.addEventListener(`click`, readerIsOkay);

  readerIsOkay(); // TODO: Remove this debug line

  function readerIsOkay() {
    // Remove the event listener
    modalButton.removeEventListener(`click`, readerIsOkay);
    // Do the rest stuff
    fadeInStarterQuote();
    processTheLastParagraph();
  }

  // Fade in the starter quote
  function fadeInStarterQuote() {
    let starterLines = starterQuote.getElementsByClassName(`9-sql`);
    let numberOfStarterLines = starterLines.length;
    starterLines = Array.from(starterLines);
    starterLines.forEach((line, index) => {
      line.style.color = colourLight;
      line.style.transition = `color ${transitionTimeInMS}ms ${transitionSpeedCurve}`;
      console.log(line);
      let lineWillAppearAfterMS = lastQuoteAppearsAfterMS /
          numberOfStarterLines * (index + 1);
      console.log(lineWillAppearAfterMS);
      setTimeout(() => {
        console.log(`Changing colour of line ${index + 1}`);
        line.classList.remove(`d-none`);
        line.style.color = colourDark;
      }, lineWillAppearAfterMS);
    });
  }

  function makeTheMainTextVisible() {
    mainText.classList.remove(`d-none`);
  }

  // Increase spacing in the last paragraphs, and rotate the characters
  function processTheLastParagraph() {
    lastParagraphs.forEach((para, index) => {
      // Increase spacing
      let spacing = largestSpacingInEm / (numberOfLastParagraphs - index);
      para.style.letterSpacing = `${spacing}em`;

      // Rotate the characters
      let spans = Array.from(para.getElementsByTagName(`span`));
      spans.forEach(item => {
        let randomRotation = Math.random() * 360;
        item.style.display = `inline-block`;
        item.style.transform = `rotate(${randomRotation}deg)`;
      });

    });
  }
}
