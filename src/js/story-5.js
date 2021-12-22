startStory5();

function startStory5() {
  // Define pseudo-constants
  let probabilityOfVisibilitySwitchOfTubeLight = 0.2;
  let intervalTimeoutOfTubeLight = 200;

  // Process the audio
  let audioSource = `audios/story-5.mp3`; // TODO: Separate the string for a better ambiguity!
  let scream = new Audio(audioSource);

  // Get the viewport height minus navbar height and viewport width
  let navbar = document.getElementById(`mn`);
  let vhMinusNavbarHeight = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0) - navbar.offsetHeight; // Taken from: https://stackoverflow.com/a/8876069
  let vw = Math.max(document.documentElement.clientWidth || 0,
      window.innerWidth || 0);

  // Get the document elements
  let ecenStyle = document.getElementById(`5-ecen`).style; // Style of the paragraph reading `এই ছিলো, এই নাই`
  let divOfScream = document.getElementById(`5-s`); // The div of scream
  let divOfPostScream = document.getElementById(`5-ps`); // The div after the scream
  let linkOfPostScream = document.getElementById(`5-jtps`); // Link to the post-scream section

  // Create the space for scream
  // TODO: Perhaps extending the div to the next section will feel better!
  divOfScream.style.minHeight = `${vhMinusNavbarHeight}px`;

  // Trigger the modal
  window.onload = function() {
    document.getElementById(`omt`).click();
  };

  // Listen to the scroll, and when the threshold reached, play audio
  document.addEventListener(`scroll`, scrollListener);

  // Set the interval for the tube-light effect
  setInterval(() => {
    let theRandom = Math.random();
    if (theRandom < probabilityOfVisibilitySwitchOfTubeLight) {
      switchVisibilityOfEcen();
    }
  }, intervalTimeoutOfTubeLight);

  // Function for switching the visibility of the desired paragraph
  function switchVisibilityOfEcen() {
    let currentVisibility = ecenStyle.visibility;
    ecenStyle.visibility = currentVisibility === `` ? `hidden` : ``;
  }

  // The scroll listener
  function scrollListener() {
    let topOfScreamDiv = divOfScream.getBoundingClientRect().top -
        navbar.offsetHeight;
    if (topOfScreamDiv < 0) { // FixMe: This may not reach 0 in some devices. Perhaps Checking bottom would work properly.
      document.removeEventListener(`scroll`, scrollListener);
      scream.play().then(() => {
        startAudioAnimation();
        // Wait for the audio to finish
        scream.addEventListener(`ended`, () => {
          // Set the current time to zero
          scream.currentTime = 0;
        });
      }).catch(error => {
        console.log(error);
      });
    }
  }

  // Animations for the audio
  function startAudioAnimation() {
    let footWidth = 80;
    let footWidthSquare = Math.pow(footWidth, 2);
    let footDiagonal = Math.sqrt(2 * footWidthSquare);
    let footGraphicsSafetyMarginInPixel = vw / 400;

    let leftFootLagTime = 350;
    let footDisappearanceTime = 1000;

    let timeCount = 0;

    // TODO: Move this function inside drawFeet()
    function createAFoot(typeOfFoot) {
      let foot = document.createElement(`img`);
      foot.src = `images/5-foot-` + typeOfFoot + `.svg`;
      foot.width = footWidth;
      foot.style.position = `absolute`;
      foot.style.marginTop = `-${footWidth}px`;
      foot.style.marginLeft = `-${footWidth}px`;
      return foot;
    }

    function drawFeet() {
      let footRight = createAFoot(`right`);
      let footLeft = createAFoot(`left`);
      divOfScream.appendChild(footRight);
      divOfScream.appendChild(footLeft);

      let randomTop = Math.random() * (vhMinusNavbarHeight - footDiagonal -
          footGraphicsSafetyMarginInPixel);
      let randomLeft = Math.random() *
          (vw - footDiagonal - footGraphicsSafetyMarginInPixel);
      let randomRotationDeviation = Math.random() * 60 *
          (Math.random() < 0.5 ? -1 : 1); // Deviation of random rotation will be from -60 to +60
      let randomRotationOfRight = Math.random() * 360;
      let randomRotationOfLeft = randomRotationOfRight +
          randomRotationDeviation;

      // Draw the right foot
      footRight.style.marginTop = `${randomTop}px`;
      footRight.style.marginLeft = `${randomLeft}px`;
      footRight.style.transform = `rotate(${randomRotationOfRight}deg)`;

      // Draw the left one a bit later
      setTimeout(() => {
        footLeft.style.marginTop = `${randomTop}px`;
        footLeft.style.marginLeft = `${randomLeft}px`;
        footLeft.style.transform = `rotate(${randomRotationOfLeft}deg)`;
      }, leftFootLagTime);
    }

    function writeLyrics(text) {
      let lyricsDiv = document.createElement(`div`);
      lyricsDiv.style.position = `absolute`;
      lyricsDiv.innerHTML = text;
      divOfScream.appendChild(lyricsDiv);
    }

    let intervalOfFootSet = setInterval(() => {

      timeCount += 1000;

      if (timeCount === 5000) {
        // Write `I've been mad for fucking years`
        writeLyrics(`I've been mad for fucking years`);
      }

      if (timeCount > 60e3) {
        clearInterval(intervalOfFootSet);
        // Make the next section visible
        divOfPostScream.classList.remove(`d-none`);
        linkOfPostScream.click();
      }

      drawFeet(); // TODO: Perhaps do this twice or more as the time increases

    }, 100);

  }
}
