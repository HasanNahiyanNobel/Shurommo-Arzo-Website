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
    if (topOfScreamDiv < 0) {
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

    let footRight = createAFoot(`right`);
    let footLeft = createAFoot(`left`);

    let leftFootLagTime = 350;
    let footDisappearanceTime = 1000;

    let timeCount = 0;

    divOfScream.appendChild(footRight);
    divOfScream.appendChild(footLeft);

    function createAFoot(typeOfFoot) {
      let foot = document.createElement(`img`);
      foot.src = `images/5-foot-` + typeOfFoot + `.svg`;
      foot.width = footWidth;
      foot.style.position = `absolute`;
      foot.style.marginTop = `-${footWidth}px`;
      foot.style.marginLeft = `-${footWidth}px`;
      return foot;
    }

    let intervalOfFootSet = setInterval(() => {
      timeCount += 2; // In seconds!

      if (timeCount >= 60) {
        clearInterval(intervalOfFootSet);
        // Make the next section visible
        divOfPostScream.classList.remove(`d-none`);
        linkOfPostScream.click();
      }

      let randomTop = Math.random() * (vhMinusNavbarHeight - footWidth); // As the width is equal to height in this case
      let randomLeft = Math.random() * (vw - footWidth);
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

      // Clear the right foot
      setTimeout(() => {
        footRight.style.marginLeft = `-${footWidth * 2}px`;
      }, footDisappearanceTime);

      // And clear the left one!
      setTimeout(() => {
        footLeft.style.marginLeft = `-${footWidth * 2}px`;
      }, footDisappearanceTime + leftFootLagTime);

    }, 2000);
  }
}
