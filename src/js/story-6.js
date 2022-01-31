startStory6();

function startStory6() {
  // Get document elements
  let firstParas = document.getElementById(`6-f`);
  let lastPara = document.getElementById(`6-l`);
  let mainPara = document.getElementById(`6-m`);

  // Process the main para
  let mainParaAsArray = mainPara.innerText.split(` `);
  let mainParaLength = mainParaAsArray.length;

  // Define pseudo-constants
  let maxFontWeight = 999;
  let minFontWeight = 200;

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

  // Add weight to the first paragraph
  firstParas.style.fontVariationSettings = `'wght' ${maxFontWeight}`;

  // Add weight to the last paragraph
  lastPara.style.fontVariationSettings = `'wght' ${minFontWeight}`;
}
