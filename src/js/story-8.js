startStory8();

function startStory8() {
  // Trigger the modal of info
  setTimeout(() => {
    // document.getElementById(`8-mt`).click(); // TODO: Activate this later
  }, 150);

  // Define variables
  let japaneseTextTransitionTimeInMs = 500;
  let frequencyOfOpacityChangeInMs = japaneseTextTransitionTimeInMs;
  let iterationOfOpacityChange = 0;
  let timeToReachMaxOpacityInMs = 5e3; // TODO: Make this 50e3
  let timeToFixOpacityInMs = 6e3; // TODO: Make this 60e3
  let maxNumberOfOpacityChanges = timeToReachMaxOpacityInMs /
      japaneseTextTransitionTimeInMs;

  // Get document elements
  let body = document.body;
  let image1 = document.getElementById(`8-i-1`);
  let image2 = document.getElementById(`8-i-2`);
  let image3 = document.getElementById(`8-i-3`);
  let image4 = document.getElementById(`8-i-4`);
  let images = [image1, image2, image3, image4];

  // Make the bg dark and text light
  body.classList.add(`bg-dark`);
  body.classList.add(`text-light`);

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

}
