startStory9();

function startStory9() {
  // Trigger the modal of info
  setTimeout(() => {
    document.getElementById(`9-mt`).click();
  }, 150);

  // Get document elements
  let modalButton = document.getElementById(`9-y`);
  let starterQuote = document.getElementById(`9-sq`);
  let mainText = document.getElementById(`9-t`);
  let lastDiv = document.getElementById(`9-ld`);
  let starterLines = Array.from(starterQuote.getElementsByClassName(`9-sql`));
  let lastParagraphs = Array.from(lastDiv.getElementsByTagName(`p`));
  let numberOfStarterLines = starterLines.length;
  let numberOfLastParagraphs = lastParagraphs.length;

  // Specify pseudo-constants
  let largestSpacingInEm = 0.8;
  let lastQuoteAppearsAfterMS = 10000;
  let mainTextDelayInMSAfterLastQuote = 2000;
  let colourLight = `#ffffff`;
  let colourDark = `#212529`; // Bootstrap dark colour
  let transitionTimeInMS = 2000;
  let transitionSpeedCurve = `linear`;

  // Add event listener for the modal button
  modalButton.addEventListener(`click`, readerIsOkay);

  // Make the starter quote invisible and add transitions
  starterLines.forEach(line => {
    line.style.color = colourLight;
    line.style.transition = `color ${transitionTimeInMS}ms ${transitionSpeedCurve}`;
  });
  mainText.style.transition = `color ${transitionTimeInMS}ms ${transitionSpeedCurve}`;

  // When reader presses okay in the modal, show them the story
  function readerIsOkay() {
    // Remove the event listener
    modalButton.removeEventListener(`click`, readerIsOkay);
    // Do the rest stuff
    fadeInStarterQuote();
    setTimeout(() => {
      makeTheMainTextVisible();
      processTheLastParagraph();
    }, lastQuoteAppearsAfterMS + mainTextDelayInMSAfterLastQuote);
  }

  // Fade in the starter quote
  function fadeInStarterQuote() {
    starterLines.forEach((line, index) => {
      let lineWillAppearAfterMS = lastQuoteAppearsAfterMS /
          numberOfStarterLines * (index + 1);
      setTimeout(() => {
        line.style.color = colourDark;
      }, lineWillAppearAfterMS);
    });
  }

  // Add transition and make the main text visible
  function makeTheMainTextVisible() {
    mainText.style.color = colourDark;
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
