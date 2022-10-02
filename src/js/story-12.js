startStory12();

function startStory12() {
  // Define extensions as variable
  let mp3Extension = `.mp3`;

  // Get the document elements
  let spinner = document.getElementById(`ms`); // Main spinner from the base template
  let modalButton = document.getElementById(`12-y`);
  let title = document.getElementsByTagName(`h1`)[0];
  let part1Div = document.getElementById(`12-p-1`);
  let part2Div = document.getElementById(`12-p-2`);
  let documentDivs = [
    title,
    part1Div,
    part2Div,
  ];

  // Define pseudo-constants
  let audioSrc = `audios/`;
  let audioPrefix = `story-12-`;
  let audio1;
  let audio2;
  let colourLight = `#ffffff`;
  let colourDark = `#212529`; // Bootstrap dark colour
  let transitionTimeInMSForTitle = 2000;
  let transitionTimeInMSForPart1Div = 3000;
  let transitionSpeedCurve = `linear`;
  let titleDisplayTimeout = 100; // The element is displayed this ms after the audio is played
  let part1DivDisplayTimeout = 10e3;

  processDocumentDivs();
  loadAudios();
  giveRandomMarginToTheSelectedParagraphs();

  function processDocumentDivs() {
    documentDivs.forEach(div => {
      div.style.color = colourLight;
    });
    title.style.transition = `color ${transitionTimeInMSForTitle}ms ${transitionSpeedCurve}`;
    part1Div.style.transition = `color ${transitionTimeInMSForPart1Div}ms ${transitionSpeedCurve}`;
  }

  function loadAudios() {
    let audio1Path = audioSrc + audioPrefix + `1` + mp3Extension;
    let audio2Path = audioSrc + audioPrefix + `2` + mp3Extension;
    audio1 = new Audio(audio1Path);
    audio2 = new Audio(audio2Path);

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
        {
          // Sometimes the spinner is still visible. Adding this classes as a quick fix
          // TODO: Find out the root of this problem and debug this.
          spinner.classList.add(`d-none`);
          spinner.classList.add(`d-none`);
        }
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

    // Play the first audio
    audio1.play().then(() => {
      title.classList.remove(`d-none`);
      part1Div.classList.remove(`d-none`);

      // Display the title
      setTimeout(() => {
        title.style.color = colourDark;
      }, titleDisplayTimeout);

      // Display part 1 div
      setTimeout(() => {
        part1Div.style.color = colourDark;
      }, part1DivDisplayTimeout);
    });
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
