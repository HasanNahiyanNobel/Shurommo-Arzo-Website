startStory5();

function startStory5() {
  // Define pseudo-constants
  let probabilityOfVisibilitySwitch = 0.2;
  let intervalTimeout = 200;

  // Process the audio
  let audioSource = `audios/story-5.mp3`;
  let scream = new Audio(audioSource);

  // Get the viewport height minus navbar height
  let navbar = document.getElementById(`mn`);
  let vhMinusNavbarHeight = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0) - navbar.offsetHeight; // Taken from: https://stackoverflow.com/a/8876069

  // Get the document elements
  let ecenStyle = document.getElementById(`5-ecen`).style; // Style of the paragraph reading `এই ছিলো, এই নাই`
  let divOfScream = document.getElementById(`5-s`); // The div of scream
  let divOfPostScream = document.getElementById(`5-ps`); // The div after the scream

  // Create the space for scream
  divOfScream.style.minHeight = `${vhMinusNavbarHeight}px`;
  divOfScream.style.backgroundColor = `#ffdc92`;

  // Trigger the modal
  window.onload = function() {
    document.getElementById(`omt`).click();
  };

  // Listen to the scroll, and play audio
  document.addEventListener(`scroll`, scrollListener);

  // Set the interval for tube-light effect
  setInterval(() => {
    let theRandom = Math.random();
    if (theRandom < probabilityOfVisibilitySwitch) {
      switchVisibilityOfEcen();
    }
  }, intervalTimeout);

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
      removeEventListener(`scroll`, scrollListener); // FixMe: Remove multiple listening
      scream.play().then(() => {
        // Wait for the audio to finish
        scream.addEventListener(`ended`, () => {
          console.log(`Completed!`); // TODO: Remove this console log
          // Set the current time to zero
          scream.currentTime = 0;
          // Make the next section visible and scroll there
          divOfPostScream.classList.remove(`d-none`);
        });
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
