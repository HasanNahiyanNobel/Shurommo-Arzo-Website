startStory8();

function startStory8() {
  // Trigger the modal of info
  setTimeout(() => {
    document.getElementById(`8-mt`).click();
  }, 150);

  // Make the bg dark and text light
  document.body.classList.add(`bg-dark`);
  document.body.classList.add(`text-light`);

  // Make the main div invisible and add transition
  let mainDivOfStory8 = document.getElementById(`8-md`);
  mainDivOfStory8.style.opacity = `0`;
  mainDivOfStory8.style.transition = `opacity 5s`;

  // Get modal buttons
  let yesButton = document.getElementById(`8-y`);
  let noButton = document.getElementById(`8-n`);

  // Add event listeners for the modal buttons
  yesButton.addEventListener(`click`, readerIsCalm);
  noButton.addEventListener(`click`, readerIsFreakingOut);

  // If the reader is not calm, close the window!
  function readerIsFreakingOut() {
    window.close();
  }

  // When reader is calm, start the main tasks
  function readerIsCalm() {
    // Clear the event listener of modal buttons
    yesButton.removeEventListener(`click`, readerIsCalm);
    noButton.removeEventListener(`click`, readerIsFreakingOut);

    // Make the text visible
    mainDivOfStory8.style.opacity = `1`;

    // Define variables
    let japaneseTextTransitionTimeInMs = 500;
    let frequencyOfOpacityChangeInMs = japaneseTextTransitionTimeInMs;
    let iterationOfOpacityChange = 0;
    let timeToReachMaxOpacityInMs = 5e3; // TODO: Make this 50e3
    let timeToFixOpacityInMs = 6e3; // TODO: Make this 60e3
    let maxNumberOfOpacityChanges = timeToReachMaxOpacityInMs /
        japaneseTextTransitionTimeInMs;

    // Get document elements
    let image1 = document.getElementById(`8-i-1`);
    let image2 = document.getElementById(`8-i-2`);
    let image3 = document.getElementById(`8-i-3`);
    let image4 = document.getElementById(`8-i-4`);
    let images = [image1, image2, image3, image4];
    let postTextsAndImage = document.getElementsByClassName(`8-pti`);
    let linkOfPostText = document.getElementById(`8-jtpts`);

    // Add transitions
    images.forEach(image => {
      image.style.transition = `opacity ${japaneseTextTransitionTimeInMs}ms`;
    });

    // Start changing the opacity of Japanese text
    let textOpacityChangeInterval = setInterval(changeOpacity,
        frequencyOfOpacityChangeInMs);

    // Change the opacity of Japanese text
    function changeOpacity() {
      if (iterationOfOpacityChange * frequencyOfOpacityChangeInMs ===
          timeToFixOpacityInMs) {
        clearInterval(textOpacityChangeInterval);
        // Somehow, one interval is still scheduled. Setting a timeout solves the problem.
        setTimeout(fixOpacity, frequencyOfOpacityChangeInMs);
        // Make the post-text visible
        makePostTextsAndImageVisible();
      }

      images.forEach(image => {
        let opacity = Math.random() /
            (maxNumberOfOpacityChanges - iterationOfOpacityChange);
        // When threshold passed, the range of opacity will be 0 to 1
        if (opacity < 0) opacity = Math.random();
        image.style.opacity = `${opacity}`;
      });

      iterationOfOpacityChange++;
    }

    // Fix opacity of Japanese text to 1
    function fixOpacity() {
      images.forEach(image => {
        image.style.opacity = `1`;
      });
    }

    // Make the post-text visible
    function makePostTextsAndImageVisible() {
      for (let item of postTextsAndImage) {
        item.classList.remove(`d-none`);
      }
      // And jump to post-text!
      linkOfPostText.click();
    }
  }

}
