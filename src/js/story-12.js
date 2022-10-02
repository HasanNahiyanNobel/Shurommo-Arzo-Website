startStory12();

function startStory12() {
  // Define extensions as variable
  let mp3Extension = `.mp3`;

  // Get the document elements
  let spinner = document.getElementById(`ms`); // Main spinner from the base template
  let modalButton = document.getElementById(`12-y`);

  // Define pseudo-constants
  let audioSrc = `audios/`;
  let audioPrefix = `story-12-`;

  loadAudios();
  giveRandomMarginToTheSelectedParagraphs();

  function loadAudios() {
    let audio1Path = audioSrc + audioPrefix + `1` + mp3Extension;
    let audio2Path = audioSrc + audioPrefix + `2` + mp3Extension;
    let audio1 = new Audio(audio1Path);
    let audio2 = new Audio(audio2Path);

    // Show the spinner until the scream has been loaded.
    // However, the central JS for this website removes the spinner **after** the
    // execution of this script, so the following interval is needed.
    let forceSpinnerForAudio = setInterval(() => {
      if (spinner.classList.contains(`d-none`)) {
        spinner.classList.remove(`d-none`);
      }
    }, 100);

    audio1.addEventListener(`canplaythrough`, postAudio1LoadRoutine);

    function postAudio1LoadRoutine() {
      // Remove the listener first
      audio1.removeEventListener(`canplaythrough`, postAudio1LoadRoutine);

      // Check whether audio 2 is playable
      audio2.addEventListener(`canplaythrough`, postAudio2LoadRoutine);

      function postAudio2LoadRoutine() {
        //Remove the listener first
        audio2.removeEventListener(`canplaythrough`, postAudio2LoadRoutine);

        // Remove the spinner again!
        clearInterval(forceSpinnerForAudio); // Clear the scheduled interval
        spinner.classList.add(`d-none`);
      }
    }

    postAudioLoadRoutine();
  }

  function postAudioLoadRoutine() {
    // Trigger the modal which requests reader to use headphones
    setTimeout(() => {
      document.getElementById(`12-mt`).click();
    }, 150);

    // Add event listener for the modal button
    modalButton.addEventListener(`click`, readerIsOkay);
  }

  function readerIsOkay() {
    // Remove the event listener
    modalButton.removeEventListener(`click`, readerIsOkay);
  }

  function giveRandomMarginToTheSelectedParagraphs() {
    let randomMarginLeftParagraphs = Array.from(
        document.getElementsByClassName(`12-rmlp`));
    /**
     * The paragraphs having random margins are already inside a div of 7.5% margin.
     * So the if we want the largest margin to be x%, we have to set the variable
     * to x-7.5.
     */
    let largestRandomMargin = 30;

    randomMarginLeftParagraphs.forEach(para => {
      let randomLeftMargin = Math.random() * largestRandomMargin;
      para.style.marginLeft = `${randomLeftMargin}%`;
    });
  }
}
