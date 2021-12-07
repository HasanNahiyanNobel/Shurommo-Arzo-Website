startStory2();

function startStory2() {
  processPreDeathParagraphs();
  createPreAndPostDeathShunyota();

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
    //Get the death div
    let deathDiv = document.getElementById(`2-dd`);
    // Get the viewport height
    let vh = Math.max(document.documentElement.clientHeight || 0,
        window.innerHeight || 0); // Taken from: https://stackoverflow.com/a/8876069

    // Create pre- and post-death shunyota
    preDeathShunyota.style.minHeight = `${vh * 3 / 2}px`;
    deathDiv.style.minHeight = `${vh / 2.5}px`;
  }
}
