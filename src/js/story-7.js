startStory7();

function startStory7() {

  // Trigger the modal of info
  setTimeout(() => {
    document.getElementById(`7-mt`).click();
  }, 150);

  // Define pseudo-constants
  let mp3Extension = `.mp3`;
  let bgColourLight = `#ffffff`;
  let bgColourDark = `#e8e0d2`;
  let bgColourFinal = `#fff9c4`; // Same as Shahorik
  let navColourFinal = `#fbc02d`; // Same as Shahorik
  let isBGColoured = false;
  let transitionTime = `1500ms`;
  let transitionSpeedCurve = `linear`; // `ease` by default
  let probabilityOfColourChange = 0.75;
  let firstWordOfHiddenParagraph = `আলো`;
  let secondWordOfHiddenParagraph = `ভেবে`;
  let firstPartOfHiddenParagraph = `আলো ভেবে চোখ চেয়ে থেকেছি আঁধারে`;
  let lastPartOfHiddenParagraph = `অন্ধ কবি আমি এক`;
  let audioSrc = `audios/`;

  // Get document elements
  let body = document.body;
  let navbar = document.getElementById(`mn`);
  let hiddenSpan = document.getElementById(`8-ht`);

  // Ensure that the background and hidden text has the same colours
  hiddenSpan.style.color = bgColourLight;
  body.style.backgroundColor = bgColourLight;

  // Add transitions
  hiddenSpan.style.transition = `color ${transitionTime} ${transitionSpeedCurve}`;
  body.style.transition = `background-color ${transitionTime} ${transitionSpeedCurve}`;
  navbar.style.transition = `background-color ${transitionTime} ${transitionSpeedCurve}`;

  // Change the colours
  let changeColourInterval = setInterval(() => {
    if (Math.random() < probabilityOfColourChange) {
      switchColours();
    }
  }, 10000);

  // Function to switch the colours
  function switchColours() {
    if (isBGColoured) {
      hiddenSpan.style.color = bgColourLight;
      body.style.backgroundColor = bgColourLight;
    } else {
      hiddenSpan.style.color = bgColourDark;
      body.style.backgroundColor = bgColourDark;
    }
    isBGColoured = !isBGColoured;
  }

  // Preprocess the song
  let audioTomakePath = audioSrc + `story-7` + mp3Extension;
  let audioTomake = new Audio(audioTomakePath);

  // Listen for text selection!
  window.addEventListener(`click`, processSelection);

  function processSelection() {
    let selectedString = window.getSelection().toString();
    let anchorNode = window.getSelection().anchorNode;
    let paragraph = anchorNode[`wholeText`]; // Get the paragraph from the object
    let paraArray = paragraph.split(` `); // Split to an array

    if (selectedString !== `` && selectedString !== ` `) { // A visible character's been selected
      // Check whether this is the hidden paragraph
      console.log(selectedString);
      if (paraArray[0] === firstWordOfHiddenParagraph &&
          paraArray[1] === secondWordOfHiddenParagraph) {
        // Reader found the hidden paragraph!
        postDiscoverRoutine();
      }

      // Check whether this contains the hidden paragraph
      if (selectedString.includes(firstPartOfHiddenParagraph) ||
          selectedString.includes(lastPartOfHiddenParagraph)) {
        // Reader found the hidden paragraph!
        postDiscoverRoutine();
      }
    }
  }

  // After the hidden-paragraph is discovered, this routine is followed
  function postDiscoverRoutine() {
    playTomake();
    fixColours();
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
    // Remove bg-dark class from navbar
    navbar.classList.remove(`bg-dark`);
    // And change the colours
    hiddenSpan.style.color = bgColourFinal;
    body.style.backgroundColor = bgColourFinal;
    navbar.style.backgroundColor = navColourFinal;
  }

}
