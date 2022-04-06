startStory9();

function startStory9() {
  // Trigger the modal of info
  setTimeout(() => {
    // document.getElementById(`9-mt`).click(); // TODO: Enable this modal click
  }, 150);

  // Get the last div
  let lastDiv = document.getElementById(`9-ld`);

  // Get the last paragraphs
  let lastParagraphs = Array.from(lastDiv.getElementsByTagName(`p`));
  let numberOfLastParagraphs = lastParagraphs.length;

  // Specify largest spacing
  let largestSpacingInEm = 1.5;

  // Increase spacing in the last paragraphs
  lastParagraphs.forEach((para, index) => {
    let spacing = largestSpacingInEm / (numberOfLastParagraphs - index + 1);
    para.style.letterSpacing = `${spacing}em`;
    console.log(para); // TODO: Remove this debug print
  });
}
