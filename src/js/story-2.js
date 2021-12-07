startStory2();

function startStory2() {
  processPreDeathParagraphs();
  createPreAndPostDeathShunyota();
  processGraphics();

  function processPreDeathParagraphs() {
    // Get pre-death paragraphs and convert to an array
    let preDeathParagraphsRegular = Array.from(
        document.getElementById(`2-pdp-r`).children,
    );
    let preDeathParagraphsSpecial = Array.from(
        document.getElementById(`2-pdp-s`).children,
    );

    // Calculate how much should  the colour component be incremented in each iteration
    let numberOfPreDeathParagraphsRegular = preDeathParagraphsRegular.length;
    let numberOfPreDeathParagraphsSpecial = preDeathParagraphsSpecial.length;
    let numberOfPreDeathParagraphs = numberOfPreDeathParagraphsRegular +
        numberOfPreDeathParagraphsSpecial;
    let currentShade = 0; // R, G and B—each one gets the same shade component
    let highestShade = 245; // R, G and B—each one gets the same shade component
    let incrementOfShadeInEachIteration = highestShade /
        (numberOfPreDeathParagraphs - 1);

    // Modify the regular pre-death paragraphs
    preDeathParagraphsRegular.forEach((item, index) => {
      item.style.marginLeft = `${3 * index}%`;
      item.style.color = `rgb(${currentShade}, ${currentShade}, ${currentShade})`;
      currentShade += incrementOfShadeInEachIteration;
    });

    // Modify the special pre-death paragraphs
    preDeathParagraphsSpecial.forEach((item, index) => {
      switch (index) {
        case 0: // অমল আলো জ্বালবে না...
          item.style.marginLeft = `${3 *
          (index + numberOfPreDeathParagraphsRegular) - 19.5}%`;
          break;
        case 1: // অমল তার স্বপ্ন ও বাস্তবতার ঘোর নিয়ে...
          item.style.marginLeft = `${3 *
          (index + numberOfPreDeathParagraphsRegular) - 12.5}%`;
          break;
        case 2: // একটা অন্তহীন ঘুমে সে ডুবে ডুবে...
          item.style.transform = `rotate(180deg)`;
          break;
        default: // জিম মরিসনের মতো একটা ব্যাখ্যাতীত...
          item.style.marginLeft = `${3 *
          (index + numberOfPreDeathParagraphsRegular) - 8.5}%`;
          break;
      }
      item.style.color = `rgb(${currentShade}, ${currentShade}, ${currentShade})`;
      currentShade += incrementOfShadeInEachIteration;
    });
  }

  function createPreAndPostDeathShunyota() {
    // Get the pre-death div
    let preDeathShunyota = document.getElementById(`2-pds`);
    // Get the death div
    let deathDiv = document.getElementById(`2-dd`);
    // Get the viewport height minus navbar height
    let navbar = document.getElementById(`mn`);
    let vhMinusNavbarHeight = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0) - navbar.offsetHeight; // Taken from: https://stackoverflow.com/a/8876069

    // Create pre- and post-death shunyota
    preDeathShunyota.style.minHeight = `${vhMinusNavbarHeight * 3 / 2}px`;
    deathDiv.style.minHeight = `${vhMinusNavbarHeight / 2}px`;
  }

  function processGraphics() {
    // Get elements
    let preGraphicsDiv1 = document.getElementById(`2-prg-1`);
    let preGraphicsDiv2 = document.getElementById(`2-prg-2`);
    let graphicsDiv = document.getElementById(`2-g`);
    let postGraphicsDiv1 = document.getElementById(`2-psg-1`);
    let postGraphicsDiv2 = document.getElementById(`2-psg-2`);

    // Wait for the image to load, and after loaded, translate it
    let interval = setInterval(() => {
      if (graphicsDiv.offsetWidth > 0) {
        translateImageAndText();
        clearInterval(interval);
      }
    }, 100);

    window.addEventListener(`resize`, () => {
      // Implementing the easy and bound to work solution—with an assumption that people do not resize windows frequently, and if someone does, they deserve multiple reloads! 🐸
      window.location.reload();
    });

    function translateImageAndText() {
      // Calculate the necessary positions inside graphics
      let whatIWantToBeTheFirstTopOfGraphics = 180 / 1920 *
          graphicsDiv.offsetWidth; // 180 px from top is the position what I want to be the top. The image is 1920 px wide, so the factor will be 180/1920
      let whatIWantToBeTheSecondTopOfGraphics = 550 / 1920 *
          graphicsDiv.offsetWidth; // Same calculation as the previous one
      let whatIWantToBeTheVerticalMiddleOfGraphics = 0.5 *
          graphicsDiv.offsetHeight;
      let whatIWantToBeTheBottomOfGraphics = 1450 / 1920 *
          graphicsDiv.offsetHeight;

      // Get bounding rectangles
      let preGraphicsDiv1Top = preGraphicsDiv1.getBoundingClientRect().top;
      let preGraphicsDiv2Top = preGraphicsDiv2.getBoundingClientRect().top;
      let graphicsDivTop = graphicsDiv.getBoundingClientRect().top;
      let graphicsDivFirstTop = graphicsDivTop +
          whatIWantToBeTheFirstTopOfGraphics;
      let postGraphicsDiv1Top = postGraphicsDiv1.getBoundingClientRect().top;
      let postGraphicsDiv2Top = postGraphicsDiv2.getBoundingClientRect().top;

      // Calculate the translation distance of graphics, in pixel
      let translationOfGraphics = graphicsDivFirstTop - preGraphicsDiv1Top;

      // And calculate the translation distances of others, also in pixel
      let graphicsDivSecondTop = graphicsDivTop +
          whatIWantToBeTheSecondTopOfGraphics;
      let translationOfPreDiv2 = preGraphicsDiv2Top - graphicsDivSecondTop +
          translationOfGraphics;
      let graphicsDivVerticalMiddle = graphicsDivTop +
          whatIWantToBeTheVerticalMiddleOfGraphics;
      let translationOfPostDiv1 = postGraphicsDiv1Top -
          graphicsDivVerticalMiddle + translationOfGraphics;
      let graphicsDivBottom = graphicsDivTop + whatIWantToBeTheBottomOfGraphics;
      let translationOfPostDiv2 = postGraphicsDiv2Top - graphicsDivBottom +
          translationOfGraphics;

      // And do the translations!
      graphicsDiv.style.transform = `translate(0,${-translationOfGraphics}px)`;
      preGraphicsDiv2.style.transform = `translate(0,${-translationOfPreDiv2}px)`;
      postGraphicsDiv1.style.transform = `translate(0,${-translationOfPostDiv1}px)`;
      postGraphicsDiv2.style.transform = `translate(0,${-translationOfPostDiv2}px)`;

      // Translate E-Lo-Me-Lo
      translateElomelo();
    }

    function translateElomelo() {
      let elomeloDiv = Array.from(
          document.getElementById(`2-elo`).children,
      );
      let e__ = elomeloDiv[0];
      let lo1 = elomeloDiv[1];
      let me_ = elomeloDiv[2];
      let lo2 = elomeloDiv[3];

      e__.style.transform = `translate(00%,00vw)`;
      lo1.style.transform = `translate(25%,05vw)`;
      me_.style.transform = `translate(50%,40vw)`;
      lo2.style.transform = `translate(80%,80vw)`;
    }
  }
}
