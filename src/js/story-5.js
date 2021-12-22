startStory5();

function startStory5() {
  // Define extensions as variable
  let mp3Extension = `.mp3`;
  let svgExtension = `.svg`;

  // Define pseudo-constants
  let probabilityOfVisibilitySwitchOfTubeLight = 0.2;
  let intervalTimeoutOfTubeLight = 200;
  let imageSrc = `images/`;
  let lyricsImagePrefix = `5-text-`;

  // Process the audio
  let audioSource = `audios/story-5.mp3`; // TODO: Separate the string for a better ambiguity!
  let scream = new Audio(audioSource);

  // Get viewport height and width
  let navbar = document.getElementById(`mn`);
  let vw = Math.max(document.documentElement.clientWidth || 0,
      window.innerWidth || 0); // Taken from: https://stackoverflow.com/a/8876069
  let vh = Math.max(document.documentElement.clientHeight || 0,
      window.innerHeight || 0); // Also from: https://stackoverflow.com/a/8876069
  let vhMinusNavbarHeight = vh - navbar.offsetHeight;

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
    document.getElementById(`omt`).click(); // TODO: Uncomment this
    // startAudioAnimation(); // TODO: Remove this debug line
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
        startAudioAnimation(); // TODO: Uncomment this
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
    let footWidth = 80; // TODO: A number of dimensions are derived from this value, so think about it in detail
    let footWidthSquare = Math.pow(footWidth, 2);
    let footDiagonal = Math.sqrt(2 * footWidthSquare);
    let footGraphicsSafetyMarginInPixel = vw / 400;

    let leftFootLagTime = 340;

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

    function drawLyrics(src, ...pos) {
      let lyricsWidth = footWidth * 5;
      if (lyricsWidth > vw) {
        lyricsWidth = vw * .8;
      }

      // let lyricsAsSvg = document.createElement(`img`);
      let lyricsAsSvg = new Image();
      lyricsAsSvg.src = src;
      lyricsAsSvg.width = lyricsWidth;
      lyricsAsSvg.style.position = `absolute`;
      lyricsAsSvg.style.opacity = `0`;
      lyricsAsSvg.style.transition = `opacity 2000ms`;
      divOfScream.appendChild(lyricsAsSvg);

      lyricsAsSvg.onload = function() {
        setHorizontalPos();
        setVerticalPos();
        lyricsAsSvg.style.opacity = `1`;
      };

      function setHorizontalPos() {
        if (pos[0] === undefined) { // When not given, `pos[0]` is `undefined`
          lyricsAsSvg.style.marginLeft = `0`;
        } else if (pos[0] > 0) {
          lyricsAsSvg.style.left = `${pos[0]}vw`;
        } else {
          lyricsAsSvg.style.right = `${-pos[0]}vw`;
        }
      }

      function setVerticalPos() {
        if (pos[1] === undefined) { // When not given, `pos[1]` is `undefined`
          lyricsAsSvg.style.marginTop = `0`;
        } else if (pos[1] > 0) {
          lyricsAsSvg.style.marginTop = `${pos[1]}vh`;
        } else {
          let lyricsHeight = lyricsAsSvg.naturalHeight /
              lyricsAsSvg.naturalWidth * lyricsAsSvg.width;
          let marginTop = (divOfScream.offsetHeight - lyricsHeight) / vh *
              100 + pos[1];
          lyricsAsSvg.style.marginTop = `${marginTop}vh`;
        }
      }
    }

    let intervalOfFootSet = setInterval(() => {

      timeCount += 1000;

      if (timeCount === 26e3) {
        let pathOfImage = imageSrc + lyricsImagePrefix + 1 + svgExtension;
        drawLyrics(pathOfImage);
      }

      if (timeCount === 34e3) {
        let pathOfImage = imageSrc + lyricsImagePrefix + `2-1` + svgExtension;
        drawLyrics(pathOfImage, -12, -10);
      }

      if (timeCount === 35e3) {
        let pathOfImage = imageSrc + lyricsImagePrefix + `2-2` + svgExtension;
        drawLyrics(pathOfImage, -2, -5);
      }

      if (timeCount === 63e3) {
        clearInterval(intervalOfFootSet);
        // Make the next section visible
        divOfPostScream.classList.remove(`d-none`);
        linkOfPostScream.click(); // TODO: Uncomment this
      }

      drawFeet(); // TODO: Perhaps do this twice or more as the time increases

    }, 1000);

  }
}
