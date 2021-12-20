startStory5();

function startStory5() {
  // Define pseudo-constants
  let probabilityOfVisibilitySwitch = 0.2;
  let intervalTimeout = 200;

  // Process the audio
  let audioSource = `audios/for-you-blue.mp3`;
  let scream = new Audio(audioSource);

  // Get the viewport height minus navbar height
  let navbar = document.getElementById(`mn`);
  let vhMinusNavbarHeight = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0) - navbar.offsetHeight; // Taken from: https://stackoverflow.com/a/8876069

  // Get the document elements
  let ecenStyle = document.getElementById(`5-ecen`).style; // Style of the paragraph reading `এই ছিলো, এই নাই`
  let divOfScream = document.getElementById(`5-s`); // The div of scream
  let buttonToTriggerTheModal = document.getElementById(`5-mt`);

  // Create the space for scream
  divOfScream.style.minHeight = `${vhMinusNavbarHeight}px`;
  divOfScream.style.backgroundColor = `#ffdc92`;

  // Trigger the modal
  window.onload = function() {
    buttonToTriggerTheModal.click();
  }

  // Listen for scroll, and play audio
  document.addEventListener(`scroll`, () => {
    let topOfScreamDiv = divOfScream.getBoundingClientRect().top -
        navbar.offsetHeight;
    console.log(Math.round(topOfScreamDiv));
    if (topOfScreamDiv < 0) {
      scream.play().then(() => {
        // Scroll to the next section
      }).catch(error => {
        console.log(error);
      });
    }
  });

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
}
