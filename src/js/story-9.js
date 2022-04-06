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
  let largestSpacingInEm = 0.8;

  // Increase spacing in the last paragraphs
  lastParagraphs.forEach((para, index) => {
    let paraHtml = para.innerHTML;
    let spacing = largestSpacingInEm / (numberOfLastParagraphs - index);
    para.style.letterSpacing = `${spacing}em`;

    let spans = Array.from(para.getElementsByTagName(`span`));
    spans.forEach(item => {
      let randomRotation = Math.random() * 360;
      item.style.display = `inline-block`;
      item.style.transform = `rotate(${randomRotation}deg)`;
    });

  });
}
