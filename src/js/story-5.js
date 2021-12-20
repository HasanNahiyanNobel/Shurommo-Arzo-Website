startStory5();

function startStory5() {
  // Get the style of the paragraph reading `এই ছিলো, এই নাই`
  let ecenStyle = document.getElementById(`5-ecen`).style;
  let probabilityOfVisibilitySwitch = 0.2;
  let intervalTimeOut = 200;

  // Set the interval for tube-light effect
  setInterval(() => {
    let theRandom = Math.random();
    if (theRandom < probabilityOfVisibilitySwitch) {
      switchVisibilityOfEcen();
    }
  }, intervalTimeOut);

  // Function for switching the visibility of the desired paragraph
  function switchVisibilityOfEcen() {
    let currentVisibility = ecenStyle.visibility;
    ecenStyle.visibility = currentVisibility === `` ? `hidden` : ``;
  }
}
