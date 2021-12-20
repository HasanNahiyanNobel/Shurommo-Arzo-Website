startStory5();

function startStory5() {
  // Define constants
  let AUDIO_SOURCE = `audios/for-you-blue.mp3`;
  let PROBABILITY_OF_VISIBILITY_SWITCH = 0.2;
  let INTERVAL_TIMEOUT = 200;

  // Get the style of the paragraph reading `এই ছিলো, এই নাই`
  let ecenStyle = document.getElementById(`5-ecen`).style;

  // Start the audio (beta)
  let audio = new Audio(AUDIO_SOURCE);
  audio.play().then(() => {

  }).catch(error => {
    console.log(error);
  });

  // Set the interval for tube-light effect
  setInterval(() => {
    let theRandom = Math.random();
    if (theRandom < PROBABILITY_OF_VISIBILITY_SWITCH) {
      switchVisibilityOfEcen();
    }
  }, INTERVAL_TIMEOUT);

  // Function for switching the visibility of the desired paragraph
  function switchVisibilityOfEcen() {
    let currentVisibility = ecenStyle.visibility;
    ecenStyle.visibility = currentVisibility === `` ? `hidden` : ``;
  }
}
