startStory6();

function startStory6() {
  // Trigger the modal of info
  setTimeout(() => {
    document.getElementById(`6-mt`).click();
  }, 150);

  // Get document elements
  let lastPara = document.getElementById(`6-l`);
  let mainPara = document.getElementById(`6-m`);
  let lastWords = document.getElementById(`6-mki`);

  // Process the main para
  let mainParaAsArray = mainPara.innerText.split(` `);
  let mainParaLength = mainParaAsArray.length;

  // Define pseudo-constants
  let maxFontWeight = 999;
  let minFontWeight = 300;
  let lastFontWeight = 200;

  // Calculate the decrement of font weight
  let fontWeightDecrement = (maxFontWeight - minFontWeight) /
      (mainParaLength - 1);

  // Add weights to the words of the main paragraph
  mainParaAsArray = mainParaAsArray.map((item, index) => {
    let fontWeight = maxFontWeight - fontWeightDecrement * index;
    return `<span style="font-variation-settings: 'wght' ${fontWeight}">` +
        item + `</span>`;
  });

  // Set the weight-added array as the inner HTML of the main paragraph
  mainPara.innerHTML = mainParaAsArray.join(` `);

  // Add weight to the last paragraph
  lastPara.style.fontVariationSettings = `'wght' ${lastFontWeight}`;

  // Strike-through random words (mrrito or iddho) of the last para
  let lastWordsAsArray = lastWords.innerHTML.split(`, `);
  let mrrito = lastWordsAsArray[0];
  let kingba = lastWordsAsArray[1];
  let iddho = lastWordsAsArray[2];
  let comma = `,`;
  let noBreakSpace = `&NoBreak;&nbsp;&NoBreak;`;
  let strikeThroughStart = `<span class="text-decoration-line-through">`;
  let strikeThroughEnd = `</span>`;
  let isIddho = Math.random() < 0.5; // Ideally this should be less than 0.5, not otherwise! This stackoverflow answer gives us the reason: https://stackoverflow.com/a/36756480

  lastWords.innerHTML =
      (isIddho ? strikeThroughStart : ``) +
      mrrito + comma +
      noBreakSpace +
      (!isIddho ? strikeThroughStart : ``) +
      kingba +
      (isIddho ? strikeThroughEnd : ``) +
      comma +
      noBreakSpace +
      iddho +
      (!isIddho ? strikeThroughEnd : ``);
}
