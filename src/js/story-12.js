startStory12();

function startStory12() {
  // Define extensions as variable
  // noinspection DuplicatedCode
  let mp3Extension = `.mp3`;

  // Get the document elements
  let navbar = document.getElementById(`mn`); // Main navbar
  let spinner = document.getElementById(`ms`); // Main spinner
  let mainDiv = document.getElementById(`12-md`); // Inner main div of story 12
  let modalButton = document.getElementById(`12-y`);
  let title = document.getElementsByTagName(`h1`)[0];
  let part1Div = document.getElementById(`12-p-1`);
  let part2Div = document.getElementById(`12-p-2`);
  let part2Paragraphs = Array.from(document.getElementsByClassName(`12-p-2-p`));
  let randomMarginLeftParagraphs = Array.from(
      document.getElementsByClassName(`12-rmlp`),
  );

  // Define pseudo-constants
  let forceSpinnerForAudio;
  let audio1;
  let audio2;
  let audioSrc = `audios/`;
  let audioPrefix = `story-12-`;
  let colourLight = `#ffffff`;
  let colourMuted = `#6c757d`; // Bootstrap muted colour
  let colourDark = `#212529`; // Bootstrap dark colour
  let largestRandomLeftMargin = 30; //The paragraphs having random margins are already inside a div of 7.5% margin. So the if we want the largest margin to be x%, we have to set the variable to x-7.5
  let transitionTimeOfTitle = 2e3; // Time in ms
  let transitionTimeOfPart1Div = 3e3; // Time in ms
  let transitionTimeOfPart2Paragraphs = 2e3; // Time in ms
  let transitionSpeedCurve = `linear`;
  let titleDisplayTimeout = 100; // Time in ms
  let part1DivDisplayTimeout = 10e3; // Time in ms
  let part2ParagraphDisplayTimeouts = [
    5.5e3,
    11e3,
    23.3e3,
    35.4e3,
    47.2e3,
    50.0e3,
  ];
  let part2ParagraphColours = [
    // All the colours are dark, except for the last one (music source)
    colourDark,
    colourDark,
    colourDark,
    colourDark,
    colourDark,
    colourMuted,
  ];

  colourDocumentDivsAndAddTransitions();
  addRandomMarginsToTheDesignatedParagraphs();
  loadAudios();

  function colourDocumentDivsAndAddTransitions() {
    // Initiate the colours with white
    mainDiv.style.color = colourLight;

    // Add transitions
    title.style.transition = `color ${transitionTimeOfTitle}ms ${transitionSpeedCurve}`;
    part1Div.style.transition = `color ${transitionTimeOfPart1Div}ms ${transitionSpeedCurve}`;
    part2Paragraphs.forEach(para => {
      para.style.transition = `color ${transitionTimeOfPart2Paragraphs}ms ${transitionSpeedCurve}`;
    });
  }

  function addRandomMarginsToTheDesignatedParagraphs() {
    randomMarginLeftParagraphs.forEach(para => {
      let randomLeftMargin = Math.random() * largestRandomLeftMargin;
      para.style.marginLeft = `${randomLeftMargin}%`;
    });
  }

  function loadAudios() {
    let audio1Path = audioSrc + audioPrefix + `1` + mp3Extension;
    let audio2Path = audioSrc + audioPrefix + `2` + mp3Extension;
    audio1 = new Audio(audio1Path);
    audio2 = new Audio(audio2Path);

    // Show the spinner until the scream has been loaded.
    // However, the central JS for this website removes the spinner **after** the
    // execution of this script, so the following interval is needed.
    forceSpinnerForAudio = setInterval(() => {
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

    // Play the first audio
    audio1.play().then(() => {
      {
        // FixMe: Sometimes the spinner is not removed properly. This delayed timeout ensures the removal, but we need to solve this bug.
        clearInterval(forceSpinnerForAudio); // Clear the scheduled interval
        spinner.classList.add(`d-none`);
      }

      // Remove d-none
      title.classList.remove(`d-none`);
      part1Div.classList.remove(`d-none`);

      // Display the title
      setTimeout(() => {
        title.style.color = colourDark;
      }, titleDisplayTimeout);

      // Display part 1 div, create space for part 2, and listen to scroll
      setTimeout(() => {
        // Display part 1
        part1Div.style.color = colourDark;
        // Create space for part 2
        part2Div.classList.remove(`d-none`);
        // Listen to the scroll, and when the div of space reaches close to the top, play the next audio
        document.addEventListener(`scroll`, scrollListener);
      }, part1DivDisplayTimeout);

    }).catch(error => {
      console.log(error);
    });
  }

  function scrollListener() {
    let hasBottomOfPageReached = (window.innerHeight + window.scrollY) >=
        document.body.offsetHeight - navbar.offsetHeight * 2; // Taken from: https://stackoverflow.com/a/9439807, and negated twice of navbar height for safety
    if (hasBottomOfPageReached) {
      document.removeEventListener(`scroll`, scrollListener);
      audio2.play().then(() => {
        // Set timeouts
        part2Paragraphs.forEach((part, index) => {
          setTimeout(() => {
            part.style.color = part2ParagraphColours[index];
          }, part2ParagraphDisplayTimeouts[index]);
        });

      }).catch(error => {
        console.log(error);
      });
    }
  }
}
