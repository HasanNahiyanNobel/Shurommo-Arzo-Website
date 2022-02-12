startStory7();

function startStory7() {

  // Trigger the modal of info
  setTimeout(() => {
    // document.getElementById(`7-mt`).click(); // TODO: Uncomment this
  }, 150);

  // Define pseudo-constants
  let bgColourLight = `#ffffff`;
  let bgColourDark = `#e8e0d2`;
  let transitionTime = `1500ms`;
  let transitionSpeedCurve = `linear`; // `ease` by default
  let isBGColoured = false;
  let probabilityOfColourChange = 0.75;

  // Get document elements
  let body = document.body;
  let hiddenSpan = document.getElementById(`8-ht`);

  // Ensure that the background and hidden text has the same colours
  body.style.backgroundColor = bgColourLight;
  hiddenSpan.style.color = bgColourLight;

  // Add transitions
  body.style.transition = `background-color ${transitionTime} ${transitionSpeedCurve}`;
  hiddenSpan.style.transition = `color ${transitionTime} ${transitionSpeedCurve}`;

  // Change the colours
  setInterval(() => {
    if (Math.random() < probabilityOfColourChange) {
      switchColours();
    }
  }, 10000);

  // Function to switch the colours
  function switchColours() {
    if (isBGColoured) {
      body.style.backgroundColor = bgColourLight;
      hiddenSpan.style.color = bgColourLight;
    } else {
      body.style.backgroundColor = bgColourDark;
      hiddenSpan.style.color = bgColourDark;
    }
    isBGColoured = !isBGColoured;
  }

}
