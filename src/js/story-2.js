startStory2();

function startStory2() {
  processPreDeathParagraphs();
  createPreAndPostDeathShunyota();

  function processPreDeathParagraphs() {
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
