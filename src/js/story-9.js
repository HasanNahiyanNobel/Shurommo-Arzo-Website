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
    let spacing = largestSpacingInEm / (numberOfLastParagraphs - index);
    para.style.letterSpacing = `${spacing}em`;
    console.log(para); // TODO: Remove this debug print
    for (let i = 0; i < para.innerHTML.length; i++) {
      console.log(para.innerHTML.charAt(i)); // TODO: Remove this debug print
      console.log(isBanglaAccent(para.innerHTML.charAt(i))); // TODO: Remove this debug print
    }
  });

  function isBanglaAccent(char) {
    let unicodeNumber = char.charCodeAt(0);
    if (unicodeNumber > 2433 && unicodeNumber < 2435) {
      // Char is ঁ, ং, or ঃ
      return true;
    }
    if (unicodeNumber > 2492 && unicodeNumber < 2519) {
      // Char is between ় and ৗ
      return true;
    }
    return false;
  }
}
