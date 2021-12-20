startStory5();

function startStory5() {
  // Get the style of the paragraph reading `এই ছিলো, এই নাই`
  let ecenStyle = document.getElementById(`5-ecen`).style;

  setTimeout(() => {
    switchVisibilityOfEcen();
  }, 2000);

  setTimeout(() => {
    switchVisibilityOfEcen();
  }, 3100);

  function switchVisibilityOfEcen() {
    let currentVisibility = ecenStyle.visibility;
    ecenStyle.visibility = currentVisibility === `` ? `hidden` : ``;
  }
}
