startStory5();

function startStory5() {
  // Get the style of the paragraph reading `এই ছিলো, এই নাই`
  let ecenStyle = document.getElementById(`5-ecen`).style;

  setTimeout(() => {
    ecenStyle.visibility = `hidden`;
  }, 2000);

  setTimeout(() => {
    ecenStyle.visibility = ``;
  }, 3000);
}
