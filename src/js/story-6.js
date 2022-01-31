startStory6();

function startStory6() {
  let mainPara = document.getElementById(`6-m`);
  let mainParaAsArray = mainPara.innerText.split(` `);
  let mainParaLength = mainParaAsArray.length;

  let maxFontWeight = 999;
  let minFontWeight = 300;

  let fontWeightIncrement = (maxFontWeight - minFontWeight) /
      (mainParaLength - 1);

  mainParaAsArray = mainParaAsArray.map((item, index) => {
    let fontWeight = minFontWeight + fontWeightIncrement *
        (mainParaLength - index - 1);
    console.log(fontWeight);
    return `<span style="font-weight: ${fontWeight}">` + item + `</span>`;
  });

  mainPara.innerHTML = mainParaAsArray.join(` `);
}
