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
    console.log(para); // TODO: Remove this debug print
    for (let i = 0; i < paraHtml.length; i++) {
      console.log(para.innerHTML.charAt(i)); // TODO: Remove this debug print
      console.log(isBanglaAccent(paraHtml.charAt(i))); // TODO: Remove this debug print
      if (i + 1 < paraHtml.length && isBanglaAccent(paraHtml.charAt(i + 1))) {
        // console.log(`${paraHtml.charAt(i)}${paraHtml.charAt(i+1)}`);
      }
    }
  });

  function isBanglaAccent(char) {
    let unicodeNumber = char.charCodeAt(0);
    if (unicodeNumber >= 2433 && unicodeNumber <= 2435) {
      // Char is ঁ, ং, or ঃ
      return true;
    }
    if (unicodeNumber >= 2492 && unicodeNumber <= 2519) {
      // Char is between ় and ৗ
      return true;
    }
    return false;
  }
}
