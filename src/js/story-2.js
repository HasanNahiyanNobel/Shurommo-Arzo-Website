startStory2();

function startStory2() {
  // Get pre-death paragraphs and convert to an array
  let preDeathParagraphs = Array.from(
      document.getElementById(`2-pdp`).children,
  );
  let numberOfPreDeathParagraphs = preDeathParagraphs.length;

  // Calculate how much should  the colour component be incremented in each iteration
  let currentShade = 0; // R, G and B—each one gets the same shade component
  let highestShade = 245; // R, G and B—each one gets the same shade component
  let incrementOfShadeInEachIteration = highestShade /
      (numberOfPreDeathParagraphs - 1);

  // Modify the pre-death paragraphs
  preDeathParagraphs.forEach((item, index) => {
    item.style.marginLeft = `${3 * index}%`;
    item.style.color = `rgb(${currentShade}, ${currentShade}, ${currentShade})`;
    currentShade += incrementOfShadeInEachIteration;
  });
}
