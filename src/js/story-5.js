startStory5();

function startStory5() {
  // Define extensions as variable
  let mp3Extension = `.mp3`;
  let svgExtension = `.svg`;

  // Get viewport height and width
  let navbarHeight = document.getElementById(`mn`).offsetHeight;
  let vw = Math.max(document.documentElement.clientWidth || 0,
      window.innerWidth || 0); // Taken from: https://stackoverflow.com/a/8876069
  let vh = Math.max(document.documentElement.clientHeight || 0,
      window.innerHeight || 0); // Also from: https://stackoverflow.com/a/8876069
  let vhMinusNavbarHeight = vh - navbarHeight;

  // Define pseudo-constants
  let screamSrc = `audios/`;
  let imageSrc = `images/`;
  let footImagePrefix = `5-foot-`;
  let lyricsImagePrefix = `5-text-`;

  let probabilityOfVisibilitySwitchOfTubeLight = 0.2;
  let intervalTimeoutOfTubeLight = 200;

  let footWidth = 60; // In pixel; some other values are also derived from this value
  let footWidthSquare = Math.pow(footWidth, 2);
  let footDiagonal = Math.sqrt(2 * footWidthSquare);
  let footRotationDeviation = 60; // Measured in degree
  let footGraphicsSafetyMarginInPixel = vw / 400;

  let leftFootLagTime = 340;

  let lyricsWidth = footWidth * 7 < vw ? footWidth * 7 : vw * .75; // Width of lyrics will be a multiple of footWidth in larger screens and a factor of vw in smaller screens
  let transitionTimeOfLyricsOpacity = 2000;

  let startOfLyrics1Line1 = 26e3; // Reads `I've been mad for fucking years`
  let startOfLyrics2Line1 = 34e3; // Reads `I've always been mad`
  let startOfLyrics2Line2 = 35e3; // Reads `I know I've been mad`
  let startOfScreamPeak = 63e3;

  let suffixOfLyrics1Line1 = `1`;
  let suffixOfLyrics2Line1 = `2-1`;
  let suffixOfLyrics2Line2 = `2-2`;

  // Get the document elements
  let spinner = document.getElementById(`ms`); // Main spinner from the base template
  let divMain = document.getElementById(`md`); // Main div from the base template
  let divFirst = document.getElementById(`5-prs`); // The pre-scream div
  let ecenStyle = document.getElementById(`5-ecen`).style; // Style of the paragraph reading `এই ছিলো, এই নাই`
  let divOfScream = document.getElementById(`5-s`); // The div of scream
  let divOfPostScream = document.getElementById(`5-ps`); // The div after the scream
  let linkOfPostScream = document.getElementById(`5-jtps`); // Link to the post-scream section

  // Process the scream
  let screamPath = screamSrc + `story-5` + mp3Extension;
  let scream = new Audio(screamPath);

  // Show the spinner until the scream has been loaded.
  // However, the central JS for this website removes the spinner **after** the
  // execution of this script, so the following interval is needed.
  let forceSpinnerForAudio = setInterval(() => {
    if (spinner.classList.contains(`d-none`)) {
      spinner.classList.remove(`d-none`);
    }
  }, 100);

  // When the scream has been loaded upto a substantial amount, do the rest
  scream.addEventListener(`canplaythrough`, postScreamLoadRoutine);

  function postScreamLoadRoutine() {
    // Remove the event listener for scream loading
    scream.removeEventListener(`canplaythrough`, postScreamLoadRoutine);

    // Remove the spinner again!
    clearInterval(forceSpinnerForAudio); // Clear the scheduled interval
    spinner.classList.add(`d-none`);

    // Trigger the modal which requests reader to use headphones
    document.getElementById(`omt`).click();

    // Show the first section and the canvas div
    divFirst.classList.remove(`d-none`);
    divOfScream.classList.remove(`d-none`);

    // Create the space for scream. TODO: Perhaps extending the div to the next section will feel better!
    divOfScream.style.minHeight = `${vh}px`;
    divMain.classList.remove(`mb-4`); // To ensure that div of scream has no margin at the bottom when animating

    // Listen to the scroll, and when the div of scream reaches close to the top, play scream
    document.addEventListener(`scroll`, scrollListener);

    // Start the continuous tube-light effect for `এই ছিলো, এই নাই`
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
          navbarHeight;
      if (topOfScreamDiv < navbarHeight) {
        document.removeEventListener(`scroll`, scrollListener);
        scream.play().then(() => {
          startScreamAnimation();
        }).catch(error => {
          console.log(error);
        });
      }
    }

    // Animations for the scream
    function startScreamAnimation() {
      let timeCount = 0;

      function drawFeet() {
        let footRight = createAFoot(`right`);
        let footLeft = createAFoot(`left`);
        divOfScream.appendChild(footRight);
        divOfScream.appendChild(footLeft);

        let randomTop = Math.random() * document.body.scrollHeight;
        let randomLeft = Math.random() *
            (vw - footDiagonal - footGraphicsSafetyMarginInPixel);
        let randomRotationDeviation = Math.random() * footRotationDeviation *
            (Math.random() < 0.5 ? -1 : 1);
        let randomRotationOfRight = Math.random() * 360;
        let randomRotationOfLeft = randomRotationOfRight +
            randomRotationDeviation;

        // Draw the right foot
        footRight.style.top = `${randomTop}px`;
        footRight.style.marginLeft = `${randomLeft}px`;
        footRight.style.transform = `rotate(${randomRotationOfRight}deg)`;

        // Draw the left one a bit later
        setTimeout(() => {
          footLeft.style.top = `${randomTop}px`;
          footLeft.style.marginLeft = `${randomLeft}px`;
          footLeft.style.transform = `rotate(${randomRotationOfLeft}deg)`;
        }, leftFootLagTime);

        function createAFoot(typeOfFoot) {
          let foot = document.createElement(`img`);
          foot.src = imageSrc + footImagePrefix + typeOfFoot + svgExtension;
          foot.width = footWidth;
          foot.style.position = `absolute`;
          foot.style.marginTop = `-${footWidth}px`;
          foot.style.marginLeft = `-${footWidth}px`;
          return foot;
        }
      }

      function drawLyrics(src, ...pos) {
        // TODO: Add documentation for this function
        let lyricsAsSvg = new Image();
        lyricsAsSvg.src = src;
        lyricsAsSvg.width = lyricsWidth;
        lyricsAsSvg.style.position = `absolute`;
        lyricsAsSvg.style.opacity = `0`;
        lyricsAsSvg.style.transition = `opacity ${transitionTimeOfLyricsOpacity}ms`;
        divOfScream.appendChild(lyricsAsSvg);

        lyricsAsSvg.onload = function() {
          setHorizontalPos();
          setVerticalPos();
          lyricsAsSvg.style.opacity = `1`;
        };

        function setHorizontalPos() {
          if (pos[0] === undefined) { // When not given, `pos[0]` is `undefined`
            lyricsAsSvg.style.marginLeft = `0`;
          } else if (pos[0] >= 0) {
            lyricsAsSvg.style.left = `${pos[0]}vw`;
          } else {
            lyricsAsSvg.style.right = `${-pos[0]}vw`;
          }
        }

        function setVerticalPos() {
          if (pos[1] === undefined) { // When not given, `pos[1]` is `undefined`
            lyricsAsSvg.style.marginTop = `0`;
          } else if (pos[1] >= 0) {
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

        if (timeCount === startOfLyrics1Line1) {
          let pathOfImage = imageSrc + lyricsImagePrefix +
              suffixOfLyrics1Line1 +
              svgExtension;
          drawLyrics(pathOfImage, 0, 10);
        }

        if (timeCount === startOfLyrics2Line1) {
          let pathOfImage = imageSrc + lyricsImagePrefix +
              suffixOfLyrics2Line1 +
              svgExtension;
          drawLyrics(pathOfImage, -12, -10);
        }

        if (timeCount === startOfLyrics2Line2) {
          let pathOfImage = imageSrc + lyricsImagePrefix +
              suffixOfLyrics2Line2 +
              svgExtension;
          drawLyrics(pathOfImage, -2, -5);
        }

        if (timeCount === startOfScreamPeak) {
          // Clear the interval
          clearInterval(intervalOfFootSet);
          // Make the next section visible
          divOfPostScream.classList.remove(`d-none`);
          // Draw some more feet (equal to the number of feet drawn upto now), to have a few feet below the animation canvas
          for (let i = 0; i < timeCount / 1000; i++) drawFeet();
          // Jump to the next section
          linkOfPostScream.click();
          // And give the main div its margin again!
          divMain.classList.add(`mb-4`);
        }

        drawFeet();

      }, 1000);

    }
  }
}
