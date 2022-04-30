startStory10();

// TODO: Show the document after the audio has been loaded
function startStory10() {
  // Trigger the modal of info
  // noinspection DuplicatedCode
  setTimeout(() => {
    // document.getElementById(`10-mt`).click(); // TODO: Activate this
  }, 150);

  // Get document elements
  let modalButton = document.getElementById(`10-y`);
  let fadeInLines = Array.from(document.getElementsByClassName(`10-fil`));
  let fadeInGraphicsOfSolo = Array.from(
      document.getElementsByClassName(`10-gos`));
  let line1 = document.getElementById(`10-l-1`);
  let line2 = document.getElementById(`10-l-2`);
  let divOfSoloAndGraphics = document.getElementById(`10-sag`);

  // Specify pseudo-constants
  let colourLight = `#ffffff`;
  let colourDark = `#212529`; // Bootstrap dark colour
  let transitionTimeInMS = 500; // TODO: Make this 2000
  let transitionSpeedCurve = `linear`;
  let appearanceTimeOfLine1 = 500;
  let appearanceTimeOfLine2 = appearanceTimeOfLine1 + transitionTimeInMS;
  let startOfSoloAndGraphics = appearanceTimeOfLine2 + transitionTimeInMS;

  // Process the fade-in lines
  fadeInLines.forEach(line => {
    line.style.color = colourLight;
    line.style.transition = `color ${transitionTimeInMS}ms ${transitionSpeedCurve}`;
  });

  // Process the images
  fadeInGraphicsOfSolo.forEach(graphic => {
    graphic.style.opacity = `0`;
    graphic.style.transition = `opacity ${transitionTimeInMS}ms ${transitionSpeedCurve}`;
  });

  // Add event listener for the modal button
  modalButton.addEventListener(`click`, readerIsOkay);
  modalButton.click(); // TODO: Remove this debug click

  // When reader presses okay in the modal, show them the story
  function readerIsOkay() {
    // Remove the event listener
    modalButton.removeEventListener(`click`, readerIsOkay);

    // Fade in the first two lines
    setTimeout(() => {
      line1.style.color = colourDark;
    }, appearanceTimeOfLine1);
    setTimeout(() => {
      line2.style.color = colourDark;
    }, appearanceTimeOfLine2);

    // Start the solo and show graphics
    setTimeout(() => {
      playSoloAndShowGraphics();
    }, startOfSoloAndGraphics);
  }

  function playSoloAndShowGraphics() {
    // Show the images
    fadeInGraphicsOfSolo.forEach(graphic => {
      graphic.style.opacity = `1`;
    });
  }
}
