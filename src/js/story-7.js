startStory7();

function startStory7() {

  // Trigger the modal of info
  setTimeout(() => {
    document.getElementById(`7-mt`).click();
  }, 150);

  // Define pseudo-constants
  let imageExtension = `.png`;
  let mp3Extension = `.mp3`;
  let bgImageSize = `192px`;
  let bgColourLight = `#ffffff`;
  let bgColourDark = `#e8e0d2`;
  let bgColourFinal = `#fff9c4`; // Same as Shahorik
  let navColourFinal = `#fbc02d`; // Same as Shahorik
  let isBGColoured = false;
  let transitionTimeInMS = 1500;
  let transitionSpeedCurve = `linear`; // `ease` by default
  let probabilityOfColourChange = 0.75;
  let firstWordOfHiddenParagraph = `আলো`;
  let secondWordOfHiddenParagraph = `ভেবে`;
  let firstPartOfHiddenParagraph = `আলো ভেবে চোখ চেয়ে`;
  let lastPartOfHiddenParagraph = `অন্ধ কবি আমি এক`;
  let imagesSrc = `images/`;
  let audioSrc = `audios/`;

  // Get document elements
  let body = document.body;
  let navbar = document.getElementById(`mn`);
  let hiddenSpan = document.getElementById(`8-ht`);
  let musicInfo = document.getElementById(`8-hmi`);

  // Ensure that the background and hidden text has the same colours
  musicInfo.style.color = bgColourLight;
  hiddenSpan.style.color = bgColourLight;
  body.style.backgroundColor = bgColourLight;

  // Add transitions
  musicInfo.style.transition = `color ${transitionTimeInMS}ms ${transitionSpeedCurve}`;
  hiddenSpan.style.transition = `color ${transitionTimeInMS}ms ${transitionSpeedCurve}`;
  body.style.transition = `background-color ${transitionTimeInMS}ms ${transitionSpeedCurve}`;
  navbar.style.transition = `background-color ${transitionTimeInMS}ms ${transitionSpeedCurve}`;

  // Set the background image
  body.style.backgroundImage = `url(${imagesSrc}7-bg${imageExtension})`;
  body.style.backgroundBlendMode = `screen`;
  body.style.backgroundSize = `${bgImageSize} ${bgImageSize}`;

  // Change the colours
  let changeColourInterval = setInterval(() => {
    if (Math.random() < probabilityOfColourChange) {
      switchColours();
    }
  }, 10000);

  // Function to switch the colours
  function switchColours() {
    if (isBGColoured) {
      musicInfo.style.color = bgColourLight;
      hiddenSpan.style.color = bgColourLight;
      body.style.backgroundColor = `rgb(255, 255, 255, 1)`;
    } else {
      musicInfo.style.color = bgColourDark;
      hiddenSpan.style.color = bgColourDark;
      body.style.backgroundColor = `rgb(255, 255, 255, 0)`;
    }
    isBGColoured = !isBGColoured;
  }

  // Preprocess the song
  let audioTomakePath = audioSrc + `story-7` + mp3Extension;
  let audioTomake = new Audio(audioTomakePath);

  // Listen to text selection!
  window.addEventListener(`click`, processSelection);
  window.addEventListener(`touchend`, processSelection);
  window.addEventListener(`keydown`, processKeyPress);

  function processSelection() {
    let selection = window.getSelection();
    let selectedString = selection.toString();

    if (selectedString !== ``) {

      let anchorNode = selection.anchorNode;
      let paragraph = anchorNode[`wholeText`]; // Get the paragraph from the object
      let paraArray = paragraph.split(` `); // Split to an array

      if (selectedString !== ` `) { // A visible character's been selected
        // Check whether this is the hidden paragraph
        if (paraArray[0] === firstWordOfHiddenParagraph &&
            paraArray[1] === secondWordOfHiddenParagraph) {
          // Reader found the hidden paragraph selecting from itself
          postDiscoverRoutine();
        }
        // Check whether this contains the hidden paragraph
        else if (selectedString.includes(firstPartOfHiddenParagraph) ||
            selectedString.includes(lastPartOfHiddenParagraph)) {
          // Reader found the hidden paragraph selecting from the visible ones
          postDiscoverRoutine();
        }
      }
    }
  }

  // Just in case someone tries ctrl+A
  function processKeyPress(e) {
    if (e.code === `KeyA` && e.ctrlKey) {
      // Reader found the hidden paragraph by pressing ctrl+A
      postDiscoverRoutine();
    }
  }

  // After the hidden-paragraph is discovered, this routine is followed
  function postDiscoverRoutine() {
    // Remove the event listeners
    window.removeEventListener(`click`, processSelection);
    window.removeEventListener(`touchend`, processSelection);
    // Do the rest
    playTomake();
    fixColours();
    makeMusicInfoSelectable();
  }

  // Hit the song `Tomake`
  function playTomake() {
    audioTomake.play().then(() => {
    }).catch(error => {
      console.log(error);
    });
  }

  // Give the page a brighter, and permanent colour
  function fixColours() {
    // Clear the interval first
    clearInterval(changeColourInterval);
    // Make the bg white again
    if (isBGColoured) switchColours();
    // Wait for the transition, then change the colours
    setTimeout(() => {
      // Remove bg-dark class from navbar
      navbar.classList.remove(`bg-dark`);
      // And change the colours
      musicInfo.classList.add(`text-dark`);
      navbar.style.backgroundColor = navColourFinal;
      hiddenSpan.style.color = bgColourFinal;
      body.style.backgroundColor = `rgb(0, 0, 0, 0)`;
      body.style.backgroundImage = `url(${imagesSrc}7-bg-terminal${imageExtension})`;
    }, transitionTimeInMS);
  }

  // Make music info selectable
  function makeMusicInfoSelectable() {
    musicInfo.classList.remove(`noselect`);
  }

}
